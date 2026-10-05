"use client";

import { audio, useSoundStatus } from "../animations/useAudio";
import { SoundIcon } from "./SoundIcon";

/** Appears once the sound is on, so it can always be muted. */
export default function SoundToggle() {
  const status = useSoundStatus();
  if (status === "off") return null;
  const muted = status === "muted";

  return (
    <button
      type="button"
      onClick={() => audio.toggle()}
      aria-label={muted ? "Unmute sound" : "Mute sound"}
      className="tease-in fixed bottom-[max(0.5rem,env(safe-area-inset-bottom))] right-[max(0.5rem,env(safe-area-inset-right))] z-[55] grid h-12 w-12 place-items-center text-cream/60 transition-colors hover:text-cream focus-visible:text-cream focus-visible:outline-none"
    >
      <SoundIcon size={22} slash={muted} />
    </button>
  );
}
