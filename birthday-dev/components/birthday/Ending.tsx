"use client";

import { useRef } from "react";
import { gsap } from "@/lib/gsap";
import { usePinnedScene, sequenceBlocks } from "../animations/useScrollAnimation";
import { birthday } from "@/data/birthday";
import { Lines } from "./Lines";

export default function Ending({ onReplay }: { onReplay: () => void }) {
  const ref = useRef<HTMLElement>(null);
  const c = birthday.ending;

  usePinnedScene(ref, { mobile: 260, desktop: 260 }, (tl, m, el) => {
    const q = gsap.utils.selector(el);
    sequenceBlocks(tl, q("[data-block]"), { start: 4, span: 42, keepLast: true, rise: m.d(14) });
    tl.fromTo(q("[data-replay]"), { autoAlpha: 0 }, { autoAlpha: 1, duration: 10 }, 84);
  });

  return (
    <section ref={ref} className="relative h-svh w-full overflow-hidden">
      <div data-block className="absolute inset-0 flex items-center justify-center px-8 text-center">
        <Lines lines={c.first} className="statement md:text-[4.4rem]" />
      </div>
      <div data-block className="absolute inset-0 flex items-center justify-center px-8 text-center">
        <Lines lines={c.second} className="statement md:text-[4.4rem]" />
      </div>

      <button
        data-replay
        type="button"
        onClick={onReplay}
        className="label absolute bottom-[max(1.5rem,env(safe-area-inset-bottom))] left-1/2 -translate-x-1/2 px-6 py-4 transition-colors hover:text-cream focus-visible:text-cream focus-visible:outline-none"
      >
        ↻&nbsp;&nbsp;{c.replay}
      </button>
    </section>
  );
}
