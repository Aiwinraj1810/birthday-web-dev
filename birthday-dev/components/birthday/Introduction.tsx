"use client";

import { useRef } from "react";
import { usePinnedScene, sequenceBlocks } from "../animations/useScrollAnimation";
import { gsap } from "@/lib/gsap";
import { birthday, photos } from "@/data/birthday";
import { Lines } from "./Lines";
import { Photo } from "./Photo";

export default function Introduction() {
  const ref = useRef<HTMLElement>(null);
  const c = birthday.introduction;

  usePinnedScene(ref, { mobile: 230, desktop: 260 }, (tl, m, el) => {
    const q = gsap.utils.selector(el);
    sequenceBlocks(tl, q("[data-block]"), { start: 3, span: 47, keepLast: true });

    const photo = q("[data-photo]")[0];
    const inner = q("[data-photo] [data-inner]")[0];
    if (m.reduced) {
      tl.fromTo(photo, { opacity: 0 }, { opacity: 1, duration: 30 }, 55);
    } else {
      // The photograph slowly emerges, like a print coming up in a developing tray.
      tl.fromTo(
        photo,
        { clipPath: "inset(100% 0% 0% 0%)" },
        { clipPath: "inset(0% 0% 0% 0%)", duration: 38, ease: "power2.inOut" },
        54,
      );
      tl.fromTo(inner, { scale: 1.35 }, { scale: 1, duration: 46 }, 54);
      tl.fromTo(photo, { y: 40 }, { y: -10, duration: 46 }, 54);
    }
  });

  return (
    <section ref={ref} className="relative h-svh w-full overflow-hidden">
      <div className="absolute inset-x-0 top-[17svh] z-10 px-7 md:left-[8vw] md:top-[26svh] md:max-w-[46vw] md:px-0">
        <div data-block>
          <p data-line className="label mb-8">
            {c.label}
          </p>
          <Lines lines={c.lines} className="whisper md:text-[2.8rem]" />
        </div>
        <div data-block className="absolute inset-x-7 top-0 md:inset-x-0">
          <Lines lines={c.punch} className="statement md:text-[5rem]" />
        </div>
      </div>

      <Photo
        data-photo
        src={photos.introduction.src}
        alt={photos.introduction.alt}
        tilt={3}
        sizes="(max-width: 768px) 64vw, 28vw"
        className="absolute bottom-[-3svh] right-[-4vw] aspect-[3/4] w-[62vw] md:bottom-auto md:right-[10vw] md:top-[13svh] md:w-[26vw]"
      />
    </section>
  );
}
