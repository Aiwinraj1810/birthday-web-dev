// All personal content lives here. Swap the text and the photo paths —
// the animation system never needs to change.
// Wrap a phrase in *asterisks* to set it in italic.

export type Photo = { src: string; alt: string };

export const photos = {
  // Drop real images in /public/photos and update these paths (jpg / webp / avif).
  intro: [
    { src: "https://res.cloudinary.com/dur23cis9/image/upload/v1791309308/Sanu/WhatsApp_Image_2026-10-06_at_23.21.11_2_huoqm7.jpg", alt: "" },
    { src: "https://res.cloudinary.com/dur23cis9/image/upload/v1791306907/Sanu/WhatsApp_Image_2026-10-06_at_22.14.48_1_ejwqys.jpg", alt: "" },
    { src: "https://res.cloudinary.com/dur23cis9/image/upload/v1791306907/Sanu/WhatsApp_Image_2026-10-06_at_22.14.48_qjx4s8.jpg", alt: "" },
  ],
  introduction: { src: "https://res.cloudinary.com/dur23cis9/image/upload/v1791309307/Sanu/WhatsApp_Image_2026-10-06_at_23.21.10_dkv6mg.jpg", alt: "" },
  memories: [
    { src: "https://res.cloudinary.com/dur23cis9/image/upload/v1791309308/Sanu/WhatsApp_Image_2026-10-06_at_23.21.12_xkagrp.jpg", alt: "" },
    { src: "https://res.cloudinary.com/dur23cis9/image/upload/v1791306928/Sanu/WhatsApp_Image_2026-10-06_at_22.38.41_xylq9a.jpg", alt: "" },
    { src: "https://res.cloudinary.com/dur23cis9/image/upload/v1791306937/Sanu/WhatsApp_Image_2026-10-06_at_22.37.58_qci418.jpg", alt: "" },
  ],
  reveal: { src: "https://res.cloudinary.com/dur23cis9/image/upload/v1791306938/Sanu/WhatsApp_Image_2026-10-06_at_22.38.11_rkpmhj.jpg", alt: "" },
  // Full-screen slides after the reveal, shown one after another (any number).
  slides: [
    { src: "https://res.cloudinary.com/dur23cis9/image/upload/v1791306934/Sanu/WhatsApp_Image_2026-10-06_at_22.38.48_a5fvby.jpg", alt: "" },
    { src: "https://res.cloudinary.com/dur23cis9/image/upload/v1791306936/Sanu/WhatsApp_Image_2026-10-06_at_22.37.56_z5u9lb.jpg", alt: "" },
    { src: "https://res.cloudinary.com/dur23cis9/image/upload/v1791306937/Sanu/WhatsApp_Image_2026-10-06_at_22.38.04_msbn7q.jpg", alt: "" },
    { src: "https://res.cloudinary.com/dur23cis9/image/upload/v1791306938/Sanu/WhatsApp_Image_2026-10-06_at_22.38.06_uzfbmk.jpg", alt: "" },
    { src: "https://res.cloudinary.com/dur23cis9/image/upload/v1791306938/Sanu/WhatsApp_Image_2026-10-06_at_22.38.11_rkpmhj.jpg", alt: "" },
    { src: "https://res.cloudinary.com/dur23cis9/image/upload/v1791309310/Sanu/WhatsApp_Image_2026-10-06_at_23.21.06_1_xyinre.jpg", alt: "" },
    { src: "https://res.cloudinary.com/dur23cis9/image/upload/v1791306936/Sanu/WhatsApp_Image_2026-10-06_at_22.37.35_b9abnr.jpg", alt: "" },
    { src: "https://res.cloudinary.com/dur23cis9/image/upload/v1791306906/Sanu/WhatsApp_Image_2026-10-06_at_22.14.53_1_hrffgo.jpg", alt: "" },
  ],
  // Photographs that surface at random around the birthday text (6 slots).
  revealScatter: [
    { src: "https://res.cloudinary.com/dur23cis9/image/upload/v1791306908/Sanu/WhatsApp_Image_2026-10-06_at_22.14.49_wqharz.jpg", alt: "" },
    { src: "https://res.cloudinary.com/dur23cis9/image/upload/v1791306936/Sanu/WhatsApp_Image_2026-10-06_at_22.37.56_z5u9lb.jpg", alt: "" },
    { src: "https://res.cloudinary.com/dur23cis9/image/upload/v1791306937/Sanu/WhatsApp_Image_2026-10-06_at_22.38.04_msbn7q.jpg", alt: "" },
    { src: "https://res.cloudinary.com/dur23cis9/image/upload/v1791306938/Sanu/WhatsApp_Image_2026-10-06_at_22.38.06_uzfbmk.jpg", alt: "" },
    { src: "https://res.cloudinary.com/dur23cis9/image/upload/v1791306908/Sanu/WhatsApp_Image_2026-10-06_at_22.14.51_kgo09c.jpg", alt: "" },
    { src: "https://res.cloudinary.com/dur23cis9/image/upload/v1791309310/Sanu/WhatsApp_Image_2026-10-06_at_23.21.06_1_xyinre.jpg", alt: "" },
  ],
  letter: { src: "https://res.cloudinary.com/dur23cis9/image/upload/v1791306906/Sanu/WhatsApp_Image_2026-10-06_at_22.14.53_1_hrffgo.jpg", alt: "" },
} satisfies Record<string, Photo | Photo[]>;

type JourneyItem = {
  n: string;
  date?: string;
  text: string;
  note: string;
  photo: { src: string; alt: string };
  tilt: number;
};

export const birthday = {
  name: "Sanvika",

  preface: {
    label: "Before you begin",
    text: "I know everytime I make a video for your birthday, But this time, I wanted to do something different. So I made this website for you. I hope you like it.",
    scroll: "Scroll",
  },

  // Drop your track at public/audio/theme.mp3 (loop-friendly, ideally under 3 MB).
  audio: {
    src: "/audio/theme.mp3",
    // One steady volume (0–1) for the whole film; it only fades in when the sound is turned on.
    volume: 0.5,
  },

  soundGate: {
    label: "One small thing",
    line: "This is better with sound. Wear your headphones, and tap the circle to turn it on. Sound ke bina ye neeche nahi jayega. Try kar lo if you can.",
    button: "Turn on sound",
    on: "Sound on",
    // One appears each time someone tries to scroll past without tapping. The last one repeats.
    teases: [
      "Nahi Jayega, he he he",
      "Meine setting waisa kiya hei",
      "It really is better with sound. Trust me.",
      "I'll wait. try again.",
      "Still here. Still waiting.",
      "Okay, last chance. Abhi toh try kar lo.",
    ],
  },

  letsStart: {
    lines: ["Okay,", "*let's start.*"],
  },

  intro: {
    label: "To my dearest Sanvika",
    lines: ["I made", "something", "*for you.*"],
    scroll: "Scroll",
  },

  introduction: {
    label: "Hey Birthday Girl",
    lines: [
      "You are such a precious gem baby,",
      "This day is a very special day for you,",
      "I would want to celebrate this day with you,",
      "I am so lucky to have you in my life,",
    ],
    punch: ["You mean the", "*world to me*"],
  },

  memories: {
    label: "My dear Sanvika,",
    captions: [
      { label: "First meeting", text: "We didn't know yet *how much* it would matter." },
      { label: "Your smile", text: "It lights up my *whole* world." },
      { label: "Your elegance", text: "It adds a touch of grace to everything." },
      // { label: "Your laugh", text: "It's the sound that makes my day complete." },
    ],
  },

  journey: [
    {
      n: "01",
      // date: "12 May 2025",
      text: "Your cuteness",
      note: "It always makes me smile",
      photo: { src: "https://res.cloudinary.com/dur23cis9/image/upload/v1791306906/Sanu/WhatsApp_Image_2026-10-06_at_22.14.42_udldqc.jpg", alt: "" },
      tilt: -3,
    },
    {
      n: "02",
      // date: "03 August 2025",
      text: "It was a hot day but you were *hotter*.",
      note: "Married couple vibes",
      photo: { src: "https://res.cloudinary.com/dur23cis9/image/upload/v1791306927/Sanu/WhatsApp_Image_2026-10-06_at_22.38.40_xih57s.jpg", alt: "" },
      tilt: 2.5,
    },
    {
      n: "03",
      // date: "19 October 2025",
      text: "We the *Bhukkad people*.",
      note: "The best food date",
      photo: { src: "https://res.cloudinary.com/dur23cis9/image/upload/v1791306910/Sanu/WhatsApp_Image_2026-10-06_at_22.14.52_tnqlvt.jpg", alt: "" },
      tilt: -2,
    },
    {
      n: "04",
      // date: "Last winter",
      text: "The *best and brightest*",
      note: "Antique Mardol",
      photo: { src: "https://res.cloudinary.com/dur23cis9/image/upload/v1791306906/Sanu/WhatsApp_Image_2026-10-06_at_22.14.53_ajp3k1.jpg", alt: "" },
      tilt: 3,
    },
  ] as JourneyItem[],

  littleThings: {
    label: "The little things",
    // y = vertical position (%), align = which side the phrase leans toward
    items: [
      { text: "the way you get excited", y: 16, align: "left" },
      { text: "your best examples you give out", y: 34, align: "right" },
      { text: "the little things you don't realize *I notice*", y: 52, align: "left" },
      { text: "your smile", y: 72, align: "right" },
    ],
    final: ["especially", "*your smile.*"],
  },

  pause: {
    blocks: [
      ["If I could keep", "one thing from all", "these moments..."],
      ["I'd keep", "*the feeling*", "they gave me."],
      ["And today..."],
      ["I just want you to know", "how *special* you are", "to me."],
    ],
  },

  countdown: ["03", "02", "01"],

  reveal: {
    lines: ["HAPPY", "BIRTHDAY,"],
    name: "Sanvika.",
  },

  letter: {
    label: "A letter",
    greeting: "Dear Sanvika,",
    paragraphs: [
      "I hope this year brings you everything you're wishing for.",
      "May it be filled with happiness, new adventures and beautiful moments.",
      "Happy Birthday.",
    ],
    note: "with love",
  },

  ending: {
    first: ["I'm really glad", "*I'm a part of your story.*"],
    second: ["Happy Birthday,", "*Sanvika.*"],
    celebrate: "Tap to celebrate",
    replay: "Experience again",
  },

  // The very last screen: a small envelope that opens on tap. Write your message here.
  surprise: {
    label: "One more thing",
    hint: "Tap to open",
    message: [
      "Sometimes you may not realize how much you mean to me, but I want you to know that you are *truly special* to me. I have cherished every moment we've spent together, and I look forward to many more memories with you. You bring so much joy and love into my life, and I am grateful for your presence every single day.",
      "I have put this in an envelope because I want you to keep it close to your heart. Whenever you read this, remember that you are loved and appreciated more than words can express. Happy Birthday, my dear Sanvika.",
    ],
    note: "You and I are perfect for each other, Never believe anything else. I love you.",
  },

  // Link preview (WhatsApp, iMessage…). The image is generated in app/opengraph-image.tsx.
  meta: {
    title: "For Sanvika",
    description: "I made something for you.",
  },
};
