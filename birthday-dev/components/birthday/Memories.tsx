"use client";

import { useRef } from "react";
import { usePinnedScene } from "../animations/useScrollAnimation";
import { gsap } from "@/lib/gsap";
import { birthday, photos } from "@/data/birthday";
import { Rich } from "./Lines";
import { Photo } from "./Photo";

// Where each photograph starts its journey toward the centre (percent of its own size).
const from = [
  { x: 55, y: 45 },
  { x: -55, y: 40 },
  { x: 40, y: -50 },
];
const shape = [
  "aspect-[4/5] w-[74vw] md:w-[26vw]",
  "aspect-square w-[78vw] md:w-[30vw]",
  "aspect-[4/3] w-[84vw] md:w-[36vw]",
];

export default function Memories() {
  const ref = useRef<HTMLElement>(null);
  const c = birthday.memories;
  const mem = photos.memories;

  usePinnedScene(ref, { mobile: 400, desktop: 420 }, (tl, m, el) => {
    const q = gsap.utils.selector(el);
    const pics = q("[data-photo]");
    const caps = q("[data-caption]");
    const slot = 100 / pics.length;

    pics.forEach((pic, i) => {
      const t = i * slot;
      const last = i === pics.length - 1;
      // The photograph drifts in from the side, small and out of focus, and settles at the centre.
      tl.fromTo(
        pic,
        { opacity: 0, scale: m.reduced ? 1 : 0.55, xPercent: m.d(from[i].x), yPercent: m.d(from[i].y) },
        { opacity: 0.6, scale: 1, xPercent: 0, yPercent: 0, duration: slot * 0.5, ease: "power2.out" },
        t,
      );
      // ...then keeps zooming slowly while its sentence is read.
      tl.to(pic, { scale: m.reduced ? 1 : 1.18, duration: slot * 0.5, ease: "none" }, t + slot * 0.5);
      if (!last) tl.to(pic, { opacity: 0, duration: slot * 0.14, ease: "power1.in" }, t + slot * 0.86);

      tl.fromTo(
        caps[i],
        { opacity: 0, y: m.d(14) },
        { opacity: 1, y: 0, duration: slot * 0.22, ease: "power2.out" },
        t + slot * 0.2,
      );
      if (!last) tl.to(caps[i], { opacity: 0, duration: slot * 0.12, ease: "power1.in" }, t + slot * 0.82);
    });
  });

  return (
    <section ref={ref} className="relative h-svh w-full overflow-hidden">
      {mem.map((p, i) => (
        <Photo
          key={p.src}
          data-photo
          src={p.src}
          alt={p.alt}
          tilt={[-3, 3, -2][i]}
          sizes="(max-width: 768px) 84vw, 36vw"
          className={`photo-blur absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 ${shape[i]}`}
        />
      ))}

      <p className="label absolute inset-x-0 top-[9svh] z-10 text-center">{c.label}</p>

      <div className="absolute inset-0 z-10 flex items-center justify-center px-8">
        {c.captions.map((cap, i) => (
          <div key={i} data-caption className="absolute max-w-[22rem] text-center md:max-w-[34rem]">
            <p className="label mb-4">{cap.label}</p>
            <p className="whisper md:text-[2.4rem]">
              <Rich text={cap.text} />
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
