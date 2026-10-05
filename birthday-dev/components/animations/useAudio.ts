"use client";

import { useSyncExternalStore } from "react";
import { birthday } from "@/data/birthday";

/**
 * Two looping tracks: the main theme, and a second one the film switches to at a chosen scene.
 * Both go through a Web Audio GainNode because iOS Safari ignores `audio.volume`.
 */

type Status = "off" | "on" | "muted";
type TrackName = "main" | "second";
type Track = { el: HTMLAudioElement; gain: GainNode };

const level = birthday.audio.volume;
const sources: Record<TrackName, string> = {
  main: birthday.audio.src,
  second: birthday.audio.reveal.src,
};

let ctx: AudioContext | null = null;
const tracks: Partial<Record<TrackName, Track>> = {};
let enabled = false;
let muted = false;
let active: TrackName = "main";
let status: Status = "off";
const listeners = new Set<() => void>();

function emit() {
  status = !enabled ? "off" : muted ? "muted" : "on";
  listeners.forEach((l) => l());
}

/** Fades each track to its target: the active one to `level`, the other to silence. */
function apply(seconds: number) {
  if (!ctx) return;
  (Object.keys(tracks) as TrackName[]).forEach((name) => {
    const g = tracks[name]!.gain.gain;
    g.cancelScheduledValues(ctx!.currentTime);
    g.setTargetAtTime(muted || name !== active ? 0 : level, ctx!.currentTime, Math.max(0.05, seconds / 3));
  });
}

if (typeof document !== "undefined") {
  document.addEventListener("visibilitychange", () => {
    if (!ctx || !enabled) return;
    if (document.hidden) ctx.suspend();
    else ctx.resume();
  });
}

let pauseTimer: ReturnType<typeof setTimeout> | undefined;

export const audio = {
  get enabled() {
    return enabled;
  },

  /** Must be called from a tap/click handler. Resolves false if the browser or file refuses. */
  async enable(): Promise<boolean> {
    if (enabled) return true;
    try {
      const Ctx: typeof AudioContext =
        window.AudioContext ?? (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      ctx = new Ctx();
      (Object.keys(sources) as TrackName[]).forEach((name) => {
        const el = new Audio(sources[name]);
        el.loop = true;
        el.preload = name === "main" ? "auto" : "metadata";
        const gain = ctx!.createGain();
        gain.gain.value = 0;
        ctx!.createMediaElementSource(el).connect(gain).connect(ctx!.destination);
        tracks[name] = { el, gain };
      });
      const main = tracks.main!.el.play(); // start inside the gesture, before any await
      // iOS only lets an element play later if it was started during a tap, so "unlock" the second one now.
      tracks.second!.el.play().then(() => tracks.second!.el.pause()).catch(() => {});
      await ctx.resume();
      await main;
      enabled = true;
      active = "main";
      apply(2.5); // slow fade-in
      emit();
      return true;
    } catch {
      return false;
    }
  },

  /** Crossfades to another track. Safe to call before sound is enabled (it just remembers). */
  async switchTo(name: TrackName, seconds = 3) {
    if (name === active) return;
    const prev = active;
    if (!enabled) {
      active = name;
      return;
    }
    const next = tracks[name]!.el;
    if (name === "second") next.currentTime = 0; // the second track always begins from its start
    try {
      await next.play();
    } catch {
      return; // file missing or refused: keep the current track going
    }
    active = name;
    apply(seconds);
    clearTimeout(pauseTimer);
    pauseTimer = setTimeout(() => {
      if (active !== prev) tracks[prev]!.el.pause();
    }, seconds * 1000 + 500);
  },

  toggle() {
    if (!enabled) return;
    muted = !muted;
    apply(0.6);
    emit();
  },
};

const subscribe = (cb: () => void) => {
  listeners.add(cb);
  return () => listeners.delete(cb);
};

export function useSoundStatus(): Status {
  return useSyncExternalStore(subscribe, () => status, () => "off");
}
