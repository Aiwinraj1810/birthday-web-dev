"use client";

import { useRef } from "react";
import { gsap } from "@/lib/gsap";
import { usePinnedScene } from "../animations/useScrollAnimation";
import { birthday, photos } from "@/data/birthday";
import { Lines } from "./Lines";
import { Label } from "./Label";
import { Photo } from "./Photo";

export default function Intro() {
  const ref = useRef<HTMLElement>(null);
  const c = birthday.intro;
  const [p1, p2, p3] = photos.intro;

  usePinnedScene(ref, { mobile: 120, desktop: 150 }, (tl, m, el) => {
    const q = gsap.utils.selector(el);

    // Opening: plays once, the moment the scene comes into view (the preface is first now).
    const open = gsap.timeline({
      scrollTrigger: { trigger: el, start: "top 65%", once: true },
    });
    open.from(q("[data-line]"), {
      yPercent: m.reduced ? 0 : 110,
      opacity: m.reduced ? 0 : 1,
      duration: 1.8,
      ease: "power3.out",
      stagger: 0.18,
    }, 0.1);
    open.from(q("[data-inner]"), { opacity: 0, duration: 2.6, ease: "power2.out", stagger: 0.35 }, 0.6);
    open.from(q("[data-label], [data-cue]"), { opacity: 0, duration: 1.6 }, 1);

    // Scroll: type drifts up and dissolves, photographs drift at their own speeds.
    tl.to(q("[data-headline]"), { y: m.d(m.mobile ? -50 : -90), duration: 100 }, 0);
    tl.to(q("[data-headline]"), { opacity: 0, duration: 40, ease: "power1.in" }, 45);
    tl.to(q("[data-cue]"), { opacity: 0, duration: 8 }, 0);
    q("[data-photo]").forEach((p, i) => {
      tl.to(p, { y: m.d(-(m.mobile ? 40 : 80) * (1 + i * 0.7)), duration: 100 }, 0);
      tl.to(p, { opacity: 0, duration: 30, ease: "power1.in" }, 62 + i * 6);
    });
  });

  return (
    <section ref={ref} className="relative h-svh w-full overflow-hidden">
      <div
        data-headline
        className="absolute inset-0 z-10 px-6 pt-[19svh] md:px-[8vw] md:pt-[20svh]"
      >
        <div data-label>
          <Label>{c.label}</Label>
        </div>
        <Lines lines={c.lines} as="h1" mask className="display mt-7 md:mt-10" />
      </div>

      <Photo
        data-photo
        src={p1.src}
        alt={p1.alt}
        tilt={5}
        priority
        sizes="(max-width: 768px) 40vw, 18vw"
        className="absolute right-[-5vw] top-[8svh] aspect-[4/5] w-[36vw] md:right-[9vw] md:top-[11svh] md:w-[15vw]"
      />
      <Photo
        data-photo
        src={p2.src}
        alt={p2.alt}
        tilt={-5}
        priority
        sizes="(max-width: 768px) 46vw, 20vw"
        className="absolute bottom-[19svh] left-[7vw] aspect-[3/4] w-[44vw] md:bottom-[9svh] md:left-[48vw] md:w-[17vw]"
      />
      <Photo
        data-photo
        src={p3.src}
        alt={p3.alt}
        tilt={3}
        sizes="(max-width: 768px) 38vw, 22vw"
        className="absolute bottom-[8svh] right-[8vw] aspect-[1/1] w-[34vw] md:bottom-[18svh] md:right-[7vw] md:w-[19vw]"
      />

      <div
        data-cue
        className="absolute inset-x-0 bottom-[max(2.2rem,env(safe-area-inset-bottom))] z-10 flex flex-col items-center gap-3"
      >
        <span className="label">{c.scroll}</span>
        <span className="h-10 w-px bg-cream/70 scroll-cue" />
      </div>
    </section>
  );
}
