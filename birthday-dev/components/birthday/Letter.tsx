"use client";

import { useRef } from "react";
import { gsap } from "@/lib/gsap";
import { useResponsiveAnimation } from "../animations/useResponsiveAnimation";
import { birthday, photos } from "@/data/birthday";
import { Photo } from "./Photo";
import { TypedText } from "./TypedText";

/**
 * The letter pins to the top of the screen and the page scrolls *through* it,
 * so a message of any length stays readable. Short letters simply pin briefly.
 */
export default function Letter() {
  const ref = useRef<HTMLElement>(null);
  const c = birthday.letter;

  useResponsiveAnimation(ref, (m, el) => {
    const q = gsap.utils.selector(el);
    const sheet = q("[data-sheet]")[0] as HTMLElement;
    const dist = () => Math.max(0, sheet.offsetHeight - window.innerHeight);

    // The paper arrives as the section scrolls into view...
    gsap.fromTo(
      q("[data-paper]"),
      { y: m.d(110), opacity: 0 },
      {
        y: 0,
        opacity: 1,
        ease: "none",
        scrollTrigger: { trigger: el, start: "top 85%", end: "top 20%", scrub: 1 },
      },
    );
    gsap.fromTo(
      q("[data-pin]"),
      { y: m.d(40), opacity: 0 },
      {
        y: 0,
        opacity: 1,
        ease: "none",
        scrollTrigger: { trigger: el, start: "top 50%", end: "top top", scrub: 1 },
      },
    );

    // ...then it locks to the top and the text travels upward through the viewport.
    gsap.to(sheet, {
      y: () => -dist(),
      ease: "none",
      scrollTrigger: {
        trigger: el,
        start: "top top",
        end: () => `+=${Math.max(dist(), window.innerHeight * 0.4)}`,
        pin: true,
        scrub: 1,
        anticipatePin: 1,
        invalidateOnRefresh: true,
      },
    });

    // The message writes itself out, then the sign-off appears.
    const chars = q("[data-char]");
    const sign = q("[data-sign]");
    if (m.reduced) {
      gsap.set([...chars, ...sign], { opacity: 1 });
      return;
    }
    const each = Math.min(0.04, 16 / chars.length); // never longer than ~16s
    gsap
      .timeline({ scrollTrigger: { trigger: el, start: "top 35%", once: true } })
      .to(chars, { opacity: 1, duration: 0.05, ease: "none", stagger: { each } })
      .fromTo(sign, { opacity: 0 }, { opacity: 1, duration: 1.2 }, ">0.2");
  });

  return (
    <section ref={ref} className="relative h-svh w-full overflow-hidden">
      <div data-sheet className="px-5 pb-[14svh] pt-[16svh] will-change-transform md:pt-[14svh]">
        <div
          data-paper
          className="paper relative mx-auto max-w-[30rem] -rotate-1 px-7 pb-14 pt-16 md:max-w-[36rem] md:px-16 md:pb-20 md:pt-20"
        >
          <Photo
            data-pin
            src={photos.letter.src}
            alt={photos.letter.alt}
            tilt={6}
            sizes="(max-width: 768px) 32vw, 12vw"
            className="absolute -right-[7vw] -top-[8vw] aspect-[4/5] w-[30vw] md:-right-16 md:-top-14 md:w-[9.5rem]"
          />

          <p className="label !text-[rgb(43_37_31/0.55)]">{c.label}</p>
          <p className="mt-10 text-[2.3rem] font-normal italic leading-tight md:text-[2.8rem]">
            <TypedText text={c.greeting} />
          </p>

          <div className="mt-8 space-y-6 text-[1.4rem] leading-[1.6] md:text-[1.6rem]">
            {c.paragraphs.map((p, i) => (
              <p key={i} className={i === c.paragraphs.length - 1 ? "italic" : ""}>
                <TypedText text={p} />
              </p>
            ))}
          </div>

          <div data-sign className="mt-12 flex items-end gap-5 opacity-0">
            <span className="h-px w-14 bg-[rgb(43_37_31/0.4)]" />
            <span className="script !text-[1.7rem] !text-gold -rotate-2">{c.note}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
