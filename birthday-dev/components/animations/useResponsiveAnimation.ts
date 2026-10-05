"use client";

import type { RefObject } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

export type Motion = {
  /** < 768px — phones get their own choreography, not a scaled-down desktop one. */
  mobile: boolean;
  /** prefers-reduced-motion: movement collapses to 0, opacity changes remain. */
  reduced: boolean;
  /** Scales a travel distance: returns 0 when reduced motion is on. */
  d: (n: number) => number;
};

/**
 * Runs `build` inside gsap.matchMedia so every tween / ScrollTrigger is
 * created per breakpoint and reverted automatically when it changes or unmounts.
 */
export function useResponsiveAnimation(
  scope: RefObject<HTMLElement | null>,
  build: (m: Motion, el: HTMLElement) => void,
) {
  useGSAP(
    () => {
      const el = scope.current;
      if (!el) return;
      const mm = gsap.matchMedia();
      mm.add(
        {
          mobile: "(max-width: 767px)",
          reduced: "(prefers-reduced-motion: reduce)",
        },
        (ctx) => {
          const { mobile, reduced } = ctx.conditions as {
            mobile: boolean;
            reduced: boolean;
          };
          build({ mobile, reduced, d: (n) => (reduced ? 0 : n) }, el);
        },
      );
      return () => mm.revert();
    },
    { scope },
  );
}
