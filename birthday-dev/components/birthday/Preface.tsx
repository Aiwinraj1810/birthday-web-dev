"use client";

import { useRef } from "react";
import { gsap } from "@/lib/gsap";
import { usePinnedScene } from "../animations/useScrollAnimation";
import { birthday } from "@/data/birthday";

/** Splits "a *b c* d" into words, remembering which ones are italic. */
function toWords(text: string) {
  let italic = false;
  return text.split(/\s+/).map((raw) => {
    const starts = raw.startsWith("*");
    const ends = raw.endsWith("*");
    if (starts) italic = true;
    const word = { text: raw.replace(/\*/g, ""), italic };
    if (ends) italic = false;
    return word;
  });
}

/** The very first scene: a paragraph that fills with light as you scroll. */
export default function Preface() {
  const ref = useRef<HTMLElement>(null);
  const c = birthday.preface;
  const words = toWords(c.text);

  usePinnedScene(ref, { mobile: 170, desktop: 190 }, (tl, m, el) => {
    const q = gsap.utils.selector(el);
    const w = q("[data-word]");
    const step = 82 / w.length;

    tl.from(q("[data-cue]"), { opacity: 0, duration: 1 }, 0);
    tl.to(q("[data-cue]"), { opacity: 0, duration: 8 }, 6);
    w.forEach((word, i) => {
      tl.fromTo(word, { opacity: 0.14 }, { opacity: 1, duration: step * 2.4, ease: "none" }, 4 + i * step);
    });
  });

  return (
    <section ref={ref} className="relative h-svh w-full overflow-hidden">
      <div className="absolute inset-0 flex flex-col justify-center px-7 md:mx-auto md:max-w-[52rem] md:px-0">
        <p className="label mb-8">{c.label}</p>
        <p className="text-[clamp(1.95rem,8.2vw,3.8rem)] font-light leading-[1.18] tracking-[-0.01em]">
          {words.map((word, i) => (
            <span key={i} data-word className={`inline-block opacity-[0.14] ${word.italic ? "italic" : ""}`}>
              {word.text}&nbsp;
            </span>
          ))}
        </p>
      </div>

      <div
        data-cue
        className="absolute inset-x-0 bottom-[max(2.2rem,env(safe-area-inset-bottom))] flex flex-col items-center gap-3"
      >
        <span className="label">{c.scroll}</span>
        <span className="scroll-cue h-10 w-px bg-cream/70" />
      </div>
    </section>
  );
}
