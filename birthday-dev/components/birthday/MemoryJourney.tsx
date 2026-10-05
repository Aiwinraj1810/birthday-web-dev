"use client";

import { useRef } from "react";
import { gsap } from "@/lib/gsap";
import { useResponsiveAnimation } from "../animations/useResponsiveAnimation";
import { birthday } from "@/data/birthday";
import { Rich } from "./Lines";
import { Photo } from "./Photo";

export default function MemoryJourney() {
  const ref = useRef<HTMLElement>(null);
  const memories = birthday.journey;

  useResponsiveAnimation(ref, (m, el) => {
    const q = gsap.utils.selector(el);
    const track = q("[data-track]")[0] as HTMLElement;
    const dist = () => track.scrollWidth - window.innerWidth;

    // One long vertical scroll drives one long horizontal camera move.
    const travel = gsap.to(track, {
      x: () => -dist(),
      ease: "none",
      scrollTrigger: {
        trigger: el,
        start: "top top",
        end: () => `+=${dist() * (m.reduced ? 0.7 : 1.15)}`,
        pin: true,
        scrub: 1.2,
        anticipatePin: 1,
        invalidateOnRefresh: true,
      },
    });

    if (m.reduced) return;

    // Photographs and words slide at slightly different speeds inside each panel.
    q("[data-panel]").forEach((panel) => {
      const st = {
        trigger: panel,
        containerAnimation: travel,
        start: "left right",
        end: "right left",
        scrub: true,
      };
      const depth = m.mobile ? 50 : 110;
      gsap.fromTo(panel.querySelector("[data-photo]"), { x: depth }, { x: -depth, ease: "none", scrollTrigger: st });
      gsap.fromTo(panel.querySelector("[data-copy]"), { x: depth * 0.35 }, { x: -depth * 0.35, ease: "none", scrollTrigger: st });
    });
  });

  return (
    <section ref={ref} className="relative h-svh w-full overflow-hidden">
      <div data-track className="flex h-full w-max will-change-transform">
        {memories.map((mem, i) => (
          <article
            key={mem.n}
            data-panel
            className="relative flex h-svh w-screen shrink-0 flex-col justify-center px-7 md:w-[85vw] md:flex-row md:items-center md:gap-[7vw] md:px-[9vw]"
          >
            <Photo
              data-photo
              src={mem.photo.src}
              alt={mem.photo.alt}
              tilt={mem.tilt}
              sizes="(max-width: 768px) 66vw, 26vw"
              className={`aspect-[4/5] w-[64vw] shrink-0 md:w-[24vw] ${
                i % 2 ? "self-end mr-1" : "self-start ml-1"
              } md:self-auto md:m-0`}
            />
            <div data-copy className="relative mt-9 md:mt-0 md:max-w-[22rem]">
              <div className="flex items-baseline gap-4">
                <span className="text-[clamp(3.6rem,15vw,6.5rem)] font-light italic leading-none text-cream/90">
                  {mem.n}
                </span>
                <span className="label">{mem.date}</span>
              </div>
              <p className="whisper mt-4">
                <Rich text={mem.text} />
              </p>
              <p className="script mt-4 -rotate-3">{mem.note}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
