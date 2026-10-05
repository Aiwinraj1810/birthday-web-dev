"use client";

import { useRef } from "react";
import { gsap } from "@/lib/gsap";
import { usePinnedScene } from "../animations/useScrollAnimation";
import { birthday } from "@/data/birthday";
import { Lines, Rich } from "./Lines";

export default function LittleThings() {
  const ref = useRef<HTMLElement>(null);
  const c = birthday.littleThings;

  usePinnedScene(ref, { mobile: 520, desktop: 560 }, (tl, m, el) => {
    const q = gsap.utils.selector(el);
    const items = q("[data-item]");
    const step = 15;

    tl.fromTo(q("[data-label]"), { opacity: 0 }, { opacity: 1, duration: 8 }, 0);

    items.forEach((item, i) => {
      const side = c.items[i].align === "left" ? -1 : 1;
      const t = 4 + i * step;
      tl.fromTo(
        item,
        { opacity: 0, y: m.d(34), x: m.d(side * -18) },
        { opacity: 1, y: 0, x: 0, duration: 12, ease: "power2.out" },
        t,
      );
      // Earlier statements recede a little as each new one arrives.
      if (i > 0) tl.to(items[i - 1], { opacity: 0.3, duration: 10 }, t);
    });

    // Everything lets go, and one phrase remains.
    const endItems = 4 + items.length * step + 2;
    tl.to([...items, ...q("[data-label]")], { opacity: 0, duration: 10, ease: "power1.in" }, endItems);
    tl.fromTo(
      q("[data-final]"),
      { opacity: 0, scale: m.reduced ? 1 : 0.95 },
      { opacity: 1, scale: m.reduced ? 1 : 1.04, duration: 18, ease: "power2.out" },
      endItems + 8,
    );
    tl.to(q("[data-final]"), { opacity: 0, duration: 10, ease: "power1.in" }, 92);
  });

  return (
    <section ref={ref} className="relative h-svh w-full overflow-hidden">
      <p data-label className="label absolute inset-x-0 top-[9svh] text-center">
        {c.label}
      </p>

      {c.items.map((item) => {
        const left = item.align === "left";
        return (
          <p
            key={item.text}
            data-item
            style={{ top: `${item.y}%` }}
            className={`absolute text-[clamp(1.9rem,8.4vw,3.7rem)] font-normal leading-[1.12] ${
              left
                ? "left-7 right-[20%] text-left md:left-[12vw] md:right-[50vw]"
                : "left-[20%] right-7 text-right md:left-[50vw] md:right-[12vw]"
            }`}
          >
            <Rich text={item.text} />
          </p>
        );
      })}

      <div data-final className="absolute inset-0 flex flex-col items-center justify-center px-7 text-center">
        <Lines lines={c.final} className="text-[clamp(3rem,15vw,8rem)] font-normal leading-[1.02] tracking-[-0.02em] [&>span:first-child]:text-[0.34em] [&>span:first-child]:italic [&>span:first-child]:text-cream/70" />
      </div>
    </section>
  );
}
