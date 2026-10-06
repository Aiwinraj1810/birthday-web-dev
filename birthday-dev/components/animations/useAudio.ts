"use client";

import { useSyncExternalStore } from "react";
import { birthday } from "@/data/birthday";

/**
 * One looping theme track, played through a Web Audio GainNode
 * because iOS Safari ignores `audio.volume`.
 */

type Status = "off" | "on" | "muted";

const level = birthday.audio.volume;

let ctx: AudioContext | null = null;
let gain: GainNode | null = null;
let enabled = false;
let muted = false;
let status: Status = "off";
const listeners = new Set<() => void>();

function emit() {
  status = !enabled ? "off" : muted ? "muted" : "on";
  listeners.forEach((l) => l());
}

/** Fades the track to `level` (or silence when muted). */
function apply(seconds: number) {
  if (!ctx || !gain) return;
  gain.gain.cancelScheduledValues(ctx.currentTime);
  gain.gain.setTargetAtTime(muted ? 0 : level, ctx.currentTime, Math.max(0.05, seconds / 3));
}

if (typeof document !== "undefined") {
  document.addEventListener("visibilitychange", () => {
    if (!ctx || !enabled) return;
    if (document.hidden) ctx.suspend();
    else ctx.resume();
  });
}

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
      const el = new Audio(birthday.audio.src);
      el.loop = true;
      el.preload = "auto";
      gain = ctx.createGain();
      gain.gain.value = 0;
      ctx.createMediaElementSource(el).connect(gain).connect(ctx.destination);
      const playing = el.play(); // start inside the gesture, before any await
      await ctx.resume();
      await playing;
      enabled = true;
      apply(2.5); // slow fade-in
      emit();
      return true;
    } catch {
      return false;
    }
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
