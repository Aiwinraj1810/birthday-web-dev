"use client";

import { useRef } from "react";
import { gsap } from "@/lib/gsap";
import { usePinnedScene, sequenceBlocks } from "../animations/useScrollAnimation";
import { birthday } from "@/data/birthday";
import { Lines } from "./Lines";

/** A breath between the sound gate and the film proper. */
export default function LetsStart() {
  const ref = useRef<HTMLElement>(null);

  usePinnedScene(ref, { mobile: 130, desktop: 150 }, (tl, m, el) => {
    const q = gsap.utils.selector(el);
    sequenceBlocks(tl, q("[data-block]"), { start: 4, span: 90, rise: m.d(20), lineGap: 0.4 });
  });

  return (
    <section ref={ref} className="relative h-svh w-full overflow-hidden">
      <div data-block className="absolute inset-0 flex items-center justify-center px-8 text-center">
        <Lines lines={birthday.letsStart.lines} className="display" />
      </div>
    </section>
  );
}
