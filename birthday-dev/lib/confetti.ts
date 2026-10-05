"use client";

import { gsap } from "./gsap";

// Warm, restrained: the site's coral and a few soft companions.
const colors = ["#cf5a3e", "#e9a23b", "#f2b8a8", "#9cc3a1", "#fbd9a8"];

/** A short burst of paper pieces from (x, y) that rise, then drift down and fade. */
export function celebrate(x: number, y: number) {
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const layer = document.createElement("div");
  layer.setAttribute("aria-hidden", "true");
  layer.style.cssText = "position:fixed;inset:0;pointer-events:none;z-index:58;overflow:hidden";
  document.body.appendChild(layer);

  const count = reduce ? 20 : 72;
  for (let i = 0; i < count; i++) {
    const w = 6 + Math.random() * 6;
    const piece = document.createElement("div");
    piece.style.cssText = `position:absolute;left:${x}px;top:${y}px;width:${w}px;height:${w * (0.8 + Math.random() * 1.2)}px;background:${colors[i % colors.length]};border-radius:${["1px", "50%", "2px 60%"][i % 3]};opacity:0;will-change:transform,opacity`;
    layer.appendChild(piece);

    if (reduce) {
      // No travel: pieces simply appear around the tap and fade.
      gsap.set(piece, { x: (Math.random() - 0.5) * 240, y: (Math.random() - 0.5) * 160 });
      gsap.to(piece, { opacity: 0.9, duration: 0.6, yoyo: true, repeat: 1 });
      continue;
    }

    const angle = -Math.PI / 2 + (Math.random() - 0.5) * 2;
    const speed = 150 + Math.random() * 260;
    const dx = Math.cos(angle) * speed;
    const dy = Math.sin(angle) * speed;
    gsap.set(piece, { rotation: Math.random() * 360, opacity: 1 });
    gsap
      .timeline()
      .to(piece, { x: dx, y: dy, rotation: `+=${(Math.random() - 0.5) * 360}`, duration: 0.8 + Math.random() * 0.4, ease: "power2.out" })
      .to(piece, {
        x: dx + (Math.random() - 0.5) * 140,
        y: dy + window.innerHeight * (0.6 + Math.random() * 0.4),
        rotation: `+=${(Math.random() - 0.5) * 720}`,
        opacity: 0,
        duration: 2.2 + Math.random() * 1.2,
        ease: "power1.in",
      });
  }
  gsap.delayedCall(4.5, () => layer.remove());
}
