"use client";

import { useRef, useState } from "react";
import { gsap } from "@/lib/gsap";
import { useResponsiveAnimation } from "../animations/useResponsiveAnimation";
import { birthday } from "@/data/birthday";

/** The last screen: a small envelope. Opening it reveals one more message. */
export default function Surprise({ onReplay }: { onReplay: () => void }) {
  const ref = useRef<HTMLElement>(null);
  const [open, setOpen] = useState(false);
  const c = birthday.surprise;
  const replay = birthday.ending.replay;

  useResponsiveAnimation(ref, (m, el) => {
    gsap.fromTo(
      el.querySelectorAll("[data-arrive]"),
      { opacity: 0, y: m.d(30) },
      {
        opacity: 1,
        y: 0,
        ease: "none",
        stagger: 0.1,
        scrollTrigger: { trigger: el, start: "top 80%", end: "top 25%", scrub: 1 },
      },
    );
  });

  const openIt = () => {
    if (open) return;
    const el = ref.current!;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setOpen(true);
    gsap.to(el.querySelectorAll("[data-envelope]"), {
      opacity: 0,
      scale: reduce ? 1 : 0.9,
      y: reduce ? 0 : -20,
      duration: 0.7,
      ease: "power2.in",
      pointerEvents: "none",
    });
    gsap.fromTo(
      el.querySelectorAll("[data-note]"),
      { opacity: 0, y: reduce ? 0 : 40 },
      { opacity: 1, y: 0, duration: 1.2, delay: 0.55, ease: "power3.out", stagger: 0.12 },
    );
  };

  return (
    <section ref={ref} className="relative flex min-h-svh w-full flex-col items-center justify-center overflow-hidden px-6 py-[12svh]">
      <p data-arrive className="label mb-10">
        {c.label}
      </p>

      <div data-arrive className="relative grid w-full max-w-[30rem] place-items-center">
        <button
          data-envelope
          type="button"
          onClick={openIt}
          aria-label={c.hint}
          className={`group grid place-items-center gap-6 p-4 outline-none ${open ? "absolute" : ""}`}
        >
          <svg viewBox="0 0 160 108" width="176" fill="none" stroke="currentColor" strokeWidth="1" strokeLinejoin="round" className="text-cream/80 transition-transform duration-700 group-hover:-translate-y-1 group-focus-visible:-translate-y-1">
            <rect x="2" y="2" width="156" height="104" />
            <path d="M2 2l78 58 78-58" />
            <path d="M2 106l56-48M158 106l-56-48" opacity="0.55" />
            <circle cx="80" cy="60" r="7" className="fill-gold stroke-none" />
          </svg>
          <span className="label">{c.hint}</span>
        </button>

        <div
          aria-live="polite"
          className={`paper -rotate-1 px-7 pb-12 pt-14 text-[1.4rem] leading-[1.6] md:px-14 md:text-[1.6rem] ${open ? "relative w-full" : "pointer-events-none absolute inset-x-0 top-0"}`}
          style={{ opacity: 0 }}
          data-note
        >
          <div className="space-y-5">
            {c.message.map((line, i) => (
              <p key={i}>{line}</p>
            ))}
          </div>
          <p className="script mt-8 -rotate-2 !text-[1.7rem]">{c.note}</p>
        </div>
      </div>

      <button
        data-arrive
        type="button"
        onClick={onReplay}
        className="label mt-16 px-6 py-4 transition-colors hover:text-cream focus-visible:text-cream focus-visible:outline-none"
      >
        ↻&nbsp;&nbsp;{replay}
      </button>
    </section>
  );
}
