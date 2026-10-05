"use client";

import { useRef } from "react";
import { gsap } from "@/lib/gsap";
import { usePinnedScene, sequenceBlocks } from "../animations/useScrollAnimation";
import { birthday } from "@/data/birthday";
import { Lines } from "./Lines";

/** The quietest scene: almost nothing on screen, and the slowest scroll in the film. */
export default function EmotionalPause() {
  const ref = useRef<HTMLElement>(null);
  const { blocks } = birthday.pause;

  usePinnedScene(ref, { mobile: 900, desktop: 900 }, (tl, m, el) => {
    const q = gsap.utils.selector(el);
    sequenceBlocks(tl, q("[data-block]"), {
      start: 2,
      span: 24,
      keepLast: true,
      rise: m.d(10),
      lineGap: 0.3,
    });
  });

  return (
    <section ref={ref} className="relative h-svh w-full overflow-hidden">
      {blocks.map((lines, i) => (
        <div
          key={i}
          data-block
          className="absolute inset-0 flex items-center justify-center px-8 text-center"
        >
          <Lines lines={lines} className="statement md:text-[3.6rem]" />
        </div>
      ))}
    </section>
  );
}
