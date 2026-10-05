"use client";

import { useRef } from "react";
import { gsap } from "@/lib/gsap";
import { usePinnedScene } from "../animations/useScrollAnimation";
import { birthday } from "@/data/birthday";

/** Not a timer: each number only exists while the scroll is holding it. */
export default function Countdown() {
  const ref = useRef<HTMLElement>(null);
  const numbers = birthday.countdown;

  usePinnedScene(ref, { mobile: 720, desktop: 720 }, (tl, m, el) => {
    const q = gsap.utils.selector(el);
    const nums = q("[data-num]");

    nums.forEach((n, i) => {
      const t = 2 + i * 26;
      tl.fromTo(
        n,
        { opacity: 0, scale: m.reduced ? 1 : 0.86 },
        { opacity: 1, scale: 1, duration: 9, ease: "power2.out" },
        t,
      );
      tl.to(n, { opacity: 0, scale: m.reduced ? 1 : 1.14, duration: 10, ease: "power2.in" }, t + 15);
    });

    // After the last number, a warmth rises from the dark.
    tl.fromTo(q("[data-glow]"), { opacity: 0 }, { opacity: 1, duration: 28, ease: "power2.in" }, 72);
  });

  return (
    <section ref={ref} className="relative h-svh w-full overflow-hidden">
      <div
        data-glow
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(60% 45% at 50% 55%, rgb(244 150 105 / 0.5), rgb(244 150 105 / 0.12) 55%, transparent 80%)",
        }}
      />
      {numbers.map((n) => (
        <div key={n} data-num className="absolute inset-0 flex items-center justify-center">
          <span className="text-[clamp(10rem,56vw,28rem)] font-normal italic leading-none tracking-[-0.04em]">
            {n}
          </span>
        </div>
      ))}
    </section>
  );
}
