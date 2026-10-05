// All personal content lives here. Swap the text and the photo paths —
// the animation system never needs to change.
// Wrap a phrase in *asterisks* to set it in italic.

export type Photo = { src: string; alt: string };

export const photos = {
  // Drop real images in /public/photos and update these paths (jpg / webp / avif).
  intro: [
    { src: "/photos/1.svg", alt: "" },
    { src: "/photos/2.svg", alt: "" },
    { src: "/photos/3.svg", alt: "" },
  ],
  introduction: { src: "/photos/4.svg", alt: "" },
  memories: [
    { src: "/photos/6.svg", alt: "" },
    { src: "/photos/5.svg", alt: "" },
    { src: "/photos/7.svg", alt: "" },
  ],
  reveal: { src: "/photos/3.svg", alt: "" },
  // Full-screen slides after the reveal, shown one after another (any number).
  slides: [
    { src: "/photos/3.svg", alt: "" },
    { src: "/photos/2.svg", alt: "" },
    { src: "/photos/5.svg", alt: "" },
    { src: "/photos/6.svg", alt: "" },
    { src: "/photos/9.svg", alt: "" },
    { src: "/photos/7.svg", alt: "" },
  ],
  // Photographs that surface at random around the birthday text (6 slots).
  revealScatter: [
    { src: "/photos/2.svg", alt: "" },
    { src: "/photos/5.svg", alt: "" },
    { src: "/photos/6.svg", alt: "" },
    { src: "/photos/9.svg", alt: "" },
    { src: "/photos/4.svg", alt: "" },
    { src: "/photos/7.svg", alt: "" },
  ],
  letter: { src: "/photos/8.svg", alt: "" },
} satisfies Record<string, Photo | Photo[]>;

export const birthday = {
  name: "Sanvika",

  preface: {
    label: "Before you begin",
    text: "Some things are hard to say out loud. So I gathered a few moments, a few photographs and a few words, and made them into something you can *scroll through slowly.*",
    scroll: "Scroll",
  },

  // Drop your track at public/audio/theme.mp3 (loop-friendly, ideally under 3 MB).
  audio: {
    src: "/audio/theme.mp3",
    // A second track the film crossfades to when the countdown begins (plays from its start;
    // scrolling back above the countdown brings the main track back). Drop it at public/audio/reveal.mp3.
    reveal: { src: "/audio/reveal.mp3", crossfadeSeconds: 3 },
    // One steady volume (0–1) for the whole film; it only fades in when the sound is turned on.
    volume: 0.5,
  },

  soundGate: {
    label: "One small thing",
    line: "This is better with sound.",
    button: "Turn on sound",
    on: "Sound on",
    // One appears each time someone tries to scroll past without tapping. The last one repeats.
    teases: [
      "Psst. The button. Right there.",
      "You can't skip the good part.",
      "It really is better with sound. Trust me.",
      "I'll wait. I have all night.",
      "Still here. Still waiting.",
      "Okay, last chance. Tap the circle.",
    ],
  },

  letsStart: {
    lines: ["Okay,", "*let's start.*"],
  },

  intro: {
    label: "For Sanvika",
    lines: ["I made", "something", "*for you.*"],
    scroll: "Scroll",
  },

  introduction: {
    label: "Chapter one",
    lines: [
      "There are some people",
      "who quietly become",
      "a very important part",
      "of your life.",
    ],
    punch: ["You are", "*one of them.*"],
  },

  memories: {
    label: "Remembering",
    captions: [
      { label: "Somewhere in spring", text: "We didn't know yet *how much* it would matter." },
      { label: "An ordinary evening", text: "The kind of day I'd *happily* live again." },
      { label: "Late, and laughing", text: "Nobody was looking. *Everything* was perfect." },
    ],
  },

  journey: [
    {
      n: "01",
      date: "12 May 2025",
      text: "That first time, I *knew*.",
      note: "the beginning",
      photo: { src: "/photos/2.svg", alt: "" },
      tilt: -3,
    },
    {
      n: "02",
      date: "03 August 2025",
      text: "The day nothing went to plan, and it was *better*.",
      note: "still laughing",
      photo: { src: "/photos/7.svg", alt: "" },
      tilt: 2.5,
    },
    {
      n: "03",
      date: "19 October 2025",
      text: "Quiet hours that *felt like home*.",
      note: "my favourite",
      photo: { src: "/photos/9.svg", alt: "" },
      tilt: -2,
    },
    {
      n: "04",
      date: "Last winter",
      text: "And somehow, it keeps *getting better*.",
      note: "to be continued",
      photo: { src: "/photos/1.svg", alt: "" },
      tilt: 3,
    },
  ],

  littleThings: {
    label: "The little things",
    // y = vertical position (%), align = which side the phrase leans toward
    items: [
      { text: "the way you laugh", y: 16, align: "left" },
      { text: "your random messages", y: 34, align: "right" },
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
    first: ["I'm really glad", "*you're here.*"],
    second: ["Happy Birthday,", "*Sanvika.*"],
    celebrate: "Tap to celebrate",
    replay: "Experience again",
  },

  // The very last screen: a small envelope that opens on tap. Write your message here.
  surprise: {
    label: "One more thing",
    hint: "Tap to open",
    message: [
      "Your personal message goes here.",
      "Write whatever you'd like her to read last.",
    ],
    note: "always",
  },

  // Link preview (WhatsApp, iMessage…). The image is generated in app/opengraph-image.tsx.
  meta: {
    title: "For Sanvika",
    description: "I made something for you.",
  },
};
