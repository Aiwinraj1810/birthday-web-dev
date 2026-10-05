"use client";

import { useRef } from "react";
import { gsap } from "@/lib/gsap";
import { celebrate } from "@/lib/confetti";
import { usePinnedScene, sequenceBlocks } from "../animations/useScrollAnimation";
import { birthday } from "@/data/birthday";
import { Lines } from "./Lines";

export default function Ending() {
  const ref = useRef<HTMLElement>(null);
  const c = birthday.ending;

  usePinnedScene(ref, { mobile: 260, desktop: 260 }, (tl, m, el) => {
    const q = gsap.utils.selector(el);
    sequenceBlocks(tl, q("[data-block]"), { start: 4, span: 42, keepLast: true, rise: m.d(14) });
    tl.fromTo(q("[data-celebrate]"), { autoAlpha: 0 }, { autoAlpha: 1, duration: 10 }, 70);
  });

  return (
    <section ref={ref} className="relative h-svh w-full overflow-hidden">
      <div data-block className="absolute inset-0 flex items-center justify-center px-8 text-center">
        <Lines lines={c.first} className="statement md:text-[4.4rem]" />
      </div>
      <div data-block className="absolute inset-0 flex flex-col items-center justify-center px-8 text-center">
        <Lines lines={c.second} className="statement md:text-[4.4rem]" />
        <button
          data-celebrate
          type="button"
          onClick={(e) => {
            const r = e.currentTarget.getBoundingClientRect();
            celebrate(r.left + r.width / 2, r.top + r.height / 2);
          }}
          className="label mt-10 border-b border-gold/60 px-3 py-3 text-gold transition-colors hover:text-cream focus-visible:text-cream focus-visible:outline-none"
        >
          {c.celebrate}
        </button>
      </div>
    </section>
  );
}
