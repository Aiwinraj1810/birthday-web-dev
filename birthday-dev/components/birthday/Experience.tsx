"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { audio } from "../animations/useAudio";
import { birthday } from "@/data/birthday";
import Preface from "./Preface";
import SoundGate from "./SoundGate";
import SoundToggle from "./SoundToggle";
import LetsStart from "./LetsStart";
import Intro from "./Intro";
import Introduction from "./Introduction";
import Memories from "./Memories";
import MemoryJourney from "./MemoryJourney";
import LittleThings from "./LittleThings";
import EmotionalPause from "./EmotionalPause";
import Countdown from "./Countdown";
import BirthdayReveal from "./BirthdayReveal";
import Letter from "./Letter";
import Ending from "./Ending";
import Surprise from "./Surprise";

export default function Experience() {
  const curtain = useRef<HTMLDivElement>(null);
  const revealScene = useRef<HTMLDivElement>(null);

  // Always begin at the beginning, even on reload.
  useEffect(() => {
    const prev = history.scrollRestoration;
    history.scrollRestoration = "manual";
    window.scrollTo(0, 0);
    return () => {
      history.scrollRestoration = prev;
    };
  }, []);

  // Track change: crossfade to the second track when the countdown begins (and back if she scrolls up past it).
  useGSAP(() => {
    const fade = birthday.audio.reveal.crossfadeSeconds;
    ScrollTrigger.create({
      trigger: revealScene.current,
      start: "top 80%",
      onEnter: () => audio.switchTo("second", fade),
      onLeaveBack: () => audio.switchTo("main", fade),
    });
  });

  const replay = () => {
    const el = curtain.current;
    if (!el) return;
    gsap
      .timeline()
      .to(el, { autoAlpha: 1, duration: 1.4, ease: "power2.inOut" })
      .call(() => {
        window.scrollTo(0, 0);
        ScrollTrigger.update();
      })
      .to(el, { autoAlpha: 0, duration: 1.8, ease: "power2.inOut", delay: 0.4 });
  };

  return (
    <main>
      <Preface />
      <SoundGate />
      <LetsStart />
      <Intro />
      <Introduction />
      <Memories />
      <MemoryJourney />
      <LittleThings />
      <EmotionalPause />
      <div ref={revealScene}>
        <Countdown />
      </div>
      <BirthdayReveal />
      <Letter />
      <Ending />
      <Surprise onReplay={replay} />
      <SoundToggle />
      <div
        ref={curtain}
        aria-hidden
        className="pointer-events-none fixed inset-0 z-[60] bg-ink opacity-0 invisible"
      />
    </main>
  );
}
