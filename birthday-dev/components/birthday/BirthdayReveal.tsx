"use client";

import { useRef } from "react";
import Image from "next/image";
import { gsap } from "@/lib/gsap";
import { usePinnedScene } from "../animations/useScrollAnimation";
import { birthday, photos } from "@/data/birthday";
import { Lines } from "./Lines";
import { Photo } from "./Photo";

// Where the scattered photographs land (mobile first, then desktop), tilt, and the
// scroll moment each one surfaces — deliberately out of order so it feels random.
const scatter = [
  { cls: "left-[5vw] top-[7svh] w-[30vw] aspect-[4/5] md:left-[6vw] md:top-[9svh] md:w-[13vw]", tilt: -6, at: 30, from: { x: -30, y: 40 } },
  { cls: "left-[60vw] top-[12svh] w-[28vw] aspect-[1/1] md:left-[76vw] md:top-[8svh] md:w-[12vw]", tilt: 5, at: 22, from: { x: 30, y: 40 } },
  { cls: "left-[78vw] top-[44svh] w-[26vw] aspect-[3/4] md:left-[84vw] md:top-[40svh] md:w-[12vw]", tilt: 7, at: 46, from: { x: 40, y: 20 } },
  { cls: "left-[6vw] top-[69svh] w-[34vw] aspect-[4/5] md:left-[10vw] md:top-[62svh] md:w-[14vw]", tilt: 4, at: 38, from: { x: -30, y: 50 } },
  { cls: "left-[56vw] top-[72svh] w-[32vw] aspect-[1/1] md:left-[70vw] md:top-[66svh] md:w-[13vw]", tilt: -5, at: 52, from: { x: 30, y: 50 } },
  { cls: "left-[-6vw] top-[42svh] w-[24vw] aspect-[3/4] md:left-[1vw] md:top-[36svh] md:w-[11vw]", tilt: -4, at: 58, from: { x: -40, y: 20 } },
];

// This scattered photograph is the one that grows to fill the screen and becomes slide one.
const ZOOM = 3;

// Deterministic "dust" so server and client render the same markup.
const dust = Array.from({ length: 22 }, (_, i) => ({
  left: (i * 47 + 13) % 100,
  top: 35 + ((i * 29) % 60),
  size: 2 + (i % 3),
  rise: 120 + (i % 5) * 60,
}));

/**
 * One continuous pinned scene: the reveal, then — without a seam — one of the
 * scattered photographs zooms to full screen and the rest follow, each wiping
 * upward over the one before.
 */
export default function BirthdayReveal() {
  const ref = useRef<HTMLElement>(null);
  const c = birthday.reveal;
  const slides = photos.slides;
  const n = slides.length;

  const revealLen = { mobile: 380, desktop: 400 };
  const slidesLen = { mobile: n * 130, desktop: n * 140 };

  usePinnedScene(
    ref,
    {
      mobile: revealLen.mobile + slidesLen.mobile,
      desktop: revealLen.desktop + slidesLen.desktop,
    },
    (tl, m, el) => {
      const q = gsap.utils.selector(el);
      const key = m.mobile ? "mobile" : "desktop";
      // Share of the whole scroll given to the reveal itself.
      const share = (revealLen[key] / (revealLen[key] + slidesLen[key])) * 100;

      // ---------- Part 1: the reveal (built on its own 0–100 clock, then squeezed into `share`) ----------
      const rev = gsap.timeline({ defaults: { ease: "none" } });
      const scatterEls = q("[data-scatter]");
      const zoomEl = scatterEls[ZOOM] as HTMLElement;

      rev.fromTo(q("[data-glow]"), { opacity: 1 }, { opacity: 0, duration: 25, ease: "power1.out" }, 0);
      rev.fromTo(q("[data-bg]"), { opacity: 0 }, { opacity: 0.55, duration: 55, ease: "power1.inOut" }, 4);
      rev.fromTo(q("[data-bg-inner]"), { scale: m.reduced ? 1 : 1.28 }, { scale: 1.04, duration: 100 }, 0);

      q("[data-line]").forEach((line, i) => {
        rev.fromTo(
          line,
          { yPercent: m.reduced ? 0 : 110, opacity: m.reduced ? 0 : 1 },
          { yPercent: 0, opacity: 1, duration: 22, ease: "power3.out" },
          14 + i * 12,
        );
      });

      q("[data-dust]").forEach((d, i) => {
        const rise = (d as HTMLElement).dataset.rise ?? "150";
        rev.fromTo(d, { y: 0, opacity: 0 }, { y: m.d(-Number(rise)), opacity: 0.8, duration: 40, ease: "power1.out" }, 18 + (i % 8) * 3);
        rev.to(d, { opacity: 0, duration: 25 }, 70 + (i % 5) * 2);
      });

      // Photographs surface at scattered moments, each settling with a slow drift.
      scatterEls.forEach((p, i) => {
        const { at, from } = scatter[i];
        rev.fromTo(
          p,
          { opacity: 0, scale: m.reduced ? 1 : 0.85, x: m.d(from.x), y: m.d(from.y) },
          { opacity: 1, scale: 1, x: 0, y: 0, duration: 16, ease: "power2.out" },
          at,
        );
      });

      // Everything lets go except the one photograph that is about to take over.
      const letGo = [
        ...q("[data-text]"),
        ...q("[data-dust]"),
        ...scatterEls.filter((_, i) => i !== ZOOM),
      ];
      rev.to(letGo, { opacity: 0, duration: 12, ease: "power1.in" }, 88);
      rev.set({}, {}, 100);
      rev.duration(share);
      tl.add(rev, 0);

      // ---------- Part 2: the photographs, one after another ----------
      const frames = q("[data-slide]");
      const inners = q("[data-slide-img]");
      const start = share + 1;
      const slot = (88 - start) / n; // the last 12% is a slow fade to black

      frames.forEach((frame, i) => {
        const t = start + i * slot;
        if (i === 0) {
          // Grows out of the small photograph's exact position into the full screen.
          const fromRect = () => {
            const W = el.clientWidth;
            const H = el.clientHeight;
            const l = zoomEl.offsetLeft;
            const tp = zoomEl.offsetTop;
            const w = zoomEl.offsetWidth;
            const h = zoomEl.offsetHeight;
            return `inset(${tp}px ${W - l - w}px ${H - tp - h}px ${l}px)`;
          };
          tl.fromTo(frame, { opacity: 0 }, { opacity: 1, duration: 1.5 }, t);
          tl.fromTo(
            frame,
            { clipPath: fromRect },
            { clipPath: "inset(0px 0px 0px 0px)", duration: slot * 0.8, ease: "power3.inOut" },
            t,
          );
        } else if (m.reduced) {
          tl.fromTo(frame, { opacity: 0 }, { opacity: 1, duration: slot * 0.3 }, t);
        } else {
          // Wipe from the bottom edge up, erasing the photograph underneath.
          tl.fromTo(
            frame,
            { clipPath: "inset(100% 0% 0% 0%)" },
            { clipPath: "inset(0% 0% 0% 0%)", duration: slot * 0.5, ease: "power2.inOut" },
            t,
          );
        }
        tl.fromTo(
          inners[i],
          { scale: m.reduced ? 1 : 1.3, yPercent: m.d(i === 0 ? 0 : 8) },
          { scale: 1, yPercent: 0, duration: slot * 1.1, ease: "none" },
          t,
        );
      });

      tl.to([...frames, ...q("[data-bg]"), zoomEl], { opacity: 0, duration: 12, ease: "power1.in" }, 88);
    },
  );

  return (
    <section ref={ref} className="relative h-svh w-full overflow-hidden bg-ink">
      <div data-bg className="absolute inset-0">
        <div data-bg-inner className="absolute inset-0 will-change-transform">
          <Image
            src={photos.reveal.src}
            alt={photos.reveal.alt}
            fill
            sizes="100vw"
            className="object-cover [filter:saturate(1)_contrast(1.02)_sepia(0.05)]"
          />
        </div>
        <div className="absolute inset-0 bg-[radial-gradient(90%_70%_at_50%_45%,transparent_30%,rgb(251_239_225/0.92))]" />
      </div>
      <div
        data-glow
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(60% 45% at 50% 55%, rgb(244 150 105 / 0.5), rgb(244 150 105 / 0.12) 55%, transparent 80%)",
        }}
      />

      <div data-content className="absolute inset-0">
        {dust.map((d, i) => (
          <span
            key={i}
            data-dust
            data-rise={d.rise}
            className="absolute rounded-full bg-gold"
            style={{ left: `${d.left}%`, top: `${d.top}%`, width: d.size, height: d.size, opacity: 0 }}
          />
        ))}

        {photos.revealScatter.map((p, i) => (
          <Photo
            key={i}
            data-scatter
            // The zooming one shows slide one's photograph, so the hand-off is seamless.
            src={i === ZOOM ? slides[0].src : p.src}
            alt={p.alt}
            tilt={scatter[i].tilt}
            sizes="(max-width: 768px) 34vw, 14vw"
            className={`absolute opacity-0 ${scatter[i].cls}`}
          />
        ))}

        <div data-text className="absolute inset-0 flex flex-col items-center justify-center px-4 text-center">
          <Lines
            lines={c.lines}
            as="h2"
            mask
            className="text-[clamp(3rem,14.4vw,10rem)] font-normal leading-[0.98] tracking-[0.01em]"
          />
          <Lines
            lines={[`*${c.name}*`]}
            mask
            className="mt-4 text-[clamp(2.6rem,12vw,7rem)] font-normal leading-none text-gold md:mt-6"
          />
        </div>
      </div>

      {slides.map((p, i) => (
        <div key={i} data-slide className="absolute inset-0 overflow-hidden bg-ink">
          <div data-slide-img className="absolute inset-0 will-change-transform">
            <Image
              src={p.src}
              alt={p.alt}
              fill
              sizes="100vw"
              className="object-cover [filter:saturate(1)_contrast(1.02)_sepia(0.05)]"
            />
          </div>
          <div className="absolute inset-0 bg-[radial-gradient(110%_85%_at_50%_45%,transparent_55%,rgb(251_239_225/0.4))]" />
        </div>
      ))}
    </section>
  );
}
