"use client";

import type { RefObject } from "react";
import { gsap } from "@/lib/gsap";
import { useResponsiveAnimation, type Motion } from "./useResponsiveAnimation";

type Length = { mobile: number; desktop: number };

/**
 * Pins a scene to the viewport and scrubs a timeline across `length` (% of
 * viewport height of extra scroll). The timeline is normalised to 0–100, so
 * every scene can be choreographed in the same "percent of the scene" units.
 */
export function usePinnedScene(
  ref: RefObject<HTMLElement | null>,
  length: Length,
  build: (tl: gsap.core.Timeline, m: Motion, el: HTMLElement) => void,
) {
  useResponsiveAnimation(ref, (m, el) => {
    const len = (m.mobile ? length.mobile : length.desktop) * (m.reduced ? 0.6 : 1);
    const tl = gsap.timeline({
      defaults: { ease: "none" },
      scrollTrigger: {
        trigger: el,
        start: "top top",
        end: `+=${len}%`,
        pin: true,
        scrub: 1.2,
        anticipatePin: 1,
        invalidateOnRefresh: true,
      },
    });
    build(tl, m, el);
    tl.set({}, {}, 100); // fix total duration at 100
  });
}

/**
 * Shows blocks of lines one after another. Each block's lines fade up in
 * sequence, hold, then dissolve — the last block can stay.
 */
export function sequenceBlocks(
  tl: gsap.core.Timeline,
  blocks: Element[],
  { start, span, keepLast = false, rise = 18, lineGap = 0.22 }: {
    start: number;
    span: number;
    keepLast?: boolean;
    rise?: number;
    lineGap?: number;
  },
) {
  blocks.forEach((block, i) => {
    const t0 = start + i * span;
    const lines = block.querySelectorAll("[data-line]");
    const inLen = span * 0.55;
    const step = lines.length > 1 ? (inLen * lineGap * 2) / (lines.length - 1) : 0;
    lines.forEach((line, j) => {
      tl.fromTo(
        line,
        { opacity: 0, y: rise },
        { opacity: 1, y: 0, duration: inLen * 0.5, ease: "power2.out" },
        t0 + j * step,
      );
    });
    if (!(keepLast && i === blocks.length - 1)) {
      tl.to(block, { opacity: 0, duration: span * 0.18, ease: "power1.in" }, t0 + span * 0.8);
    }
  });
}
