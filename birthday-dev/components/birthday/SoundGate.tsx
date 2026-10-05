"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { useResponsiveAnimation } from "../animations/useResponsiveAnimation";
import { audio, useSoundStatus } from "../animations/useAudio";
import { birthday } from "@/data/birthday";
import { SoundIcon } from "./SoundIcon";

/**
 * Browsers only let sound start from a tap, so the film waits here.
 * Scrolling past is blocked until the button is pressed; every attempt earns a tease.
 */
export default function SoundGate() {
  const ref = useRef<HTMLElement>(null);
  const c = birthday.soundGate;
  const status = useSoundStatus();
  const on = status !== "off";
  const [tease, setTease] = useState(-1);
  const trig = useRef<ScrollTrigger | null>(null);
  const unlocked = useRef(false);

  // The gate arrives like any other scene.
  useResponsiveAnimation(ref, (m, el) => {
    gsap.fromTo(
      el.querySelectorAll("[data-gate]"),
      { opacity: 0, y: m.d(40) },
      {
        opacity: 1,
        y: 0,
        ease: "none",
        stagger: 0.08,
        scrollTrigger: { trigger: el, start: "top 85%", end: "top 30%", scrub: 1 },
      },
    );
  });

  // The lock.
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const st = ScrollTrigger.create({ trigger: el, start: "top top", end: "bottom top", invalidateOnRefresh: true });
    trig.current = st;

    let last = 0;
    const free = () => unlocked.current || audio.enabled;
    const atGate = () => !free() && window.scrollY >= st.start - 2;
    const attempt = () => {
      const now = Date.now();
      if (now - last < 900) return;
      last = now;
      setTease((i) => Math.min(i + 1, c.teases.length - 1));
    };

    const onWheel = (e: WheelEvent) => {
      if (atGate() && e.deltaY > 0) {
        e.preventDefault();
        attempt();
      }
    };
    let startY = 0;
    const onTouchStart = (e: TouchEvent) => {
      startY = e.touches[0].clientY;
    };
    const onTouchMove = (e: TouchEvent) => {
      if (atGate() && e.touches[0].clientY < startY) {
        e.preventDefault();
        attempt();
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (!atGate()) return;
      const onButton = e.target instanceof HTMLButtonElement;
      const forward = ["ArrowDown", "PageDown", "End"].includes(e.key) || (e.key === " " && !onButton);
      if (forward) {
        e.preventDefault();
        attempt();
      }
    };
    // Catches scrollbar drags and momentum that slip past the handlers above.
    const onScroll = () => {
      if (!free() && window.scrollY > st.start + 1) {
        window.scrollTo(0, st.start);
        attempt();
      }
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: false });
    window.addEventListener("keydown", onKey);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      st.kill();
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("scroll", onScroll);
    };
  }, [c.teases.length]);

  const tap = async () => {
    await audio.enable();
    unlocked.current = true; // even if the file failed to load, never trap anyone
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const st = trig.current;
    if (!reduce && st) {
      gsap.delayedCall(1.1, () => gsap.to(window, { scrollTo: st.end, duration: 1.7, ease: "power2.inOut" }));
    }
  };

  return (
    <section ref={ref} className="relative flex h-svh w-full flex-col items-center justify-center overflow-hidden px-8 text-center">
      <p data-gate className="label mb-8">
        {c.label}
      </p>
      <p data-gate className="statement mb-14 max-w-[18ch] md:max-w-none">
        {c.line}
      </p>

      <div data-gate className="flex flex-col items-center">
        <button
          type="button"
          onClick={tap}
          aria-label={on ? c.on : c.button}
          data-on={on}
          className="sound-button group relative grid h-[5.5rem] w-[5.5rem] place-items-center rounded-full border border-cream/45 text-cream outline-none transition-[background-color,border-color,color] duration-700 focus-visible:border-cream data-[on=true]:border-gold data-[on=true]:bg-gold data-[on=true]:text-ink"
        >
          {!on && (
            <>
              <span aria-hidden className="sound-ring absolute inset-0 rounded-full border border-gold/60" />
              <span aria-hidden className="sound-ring absolute inset-0 rounded-full border border-gold/40 [animation-delay:1.6s]" />
            </>
          )}
          <SoundIcon size={30} className={on ? "sound-playing" : ""} />
        </button>
        <span className="label mt-6">{on ? c.on : c.button}</span>
      </div>

      <p
        key={tease}
        aria-live="polite"
        className={`mt-12 min-h-[4.5rem] max-w-[20rem] text-[1.45rem] font-normal italic leading-snug text-cream/75 ${tease >= 0 ? "tease-in" : "opacity-0"}`}
      >
        {tease >= 0 && !on ? c.teases[tease] : ""}
      </p>
    </section>
  );
}
