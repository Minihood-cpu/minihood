// Centralized project content & configuration.
// Everything project-specific (copy, URLs, image paths, FAQ, tasks) lives here
// so the rest of the app never hardcodes strings that might need to change.

export const project = {
  name: "MINIHOOD",
  tagline: "Small hood. Big energy.",
  supply: 2999,
  supplyLabel: "2,999",
  description:
    "Minihood is a collection of 2,999 original pixel characters built for the Robinhood ecosystem.",
  descriptionLong:
    "Minihood is a collection of 2,999 original pixel characters built for the Robinhood ecosystem. Every Mini comes with its own traits, style, and personality — but they all belong to one hood.",
};

// External / internal links — edit here, nowhere else.
export const links = {
  join: "/join",
  collection: "#collection", // TODO: point at the real marketplace/mint link when available
  twitter: "https://x.com/Minihoodxyz",
};

export const nav = [
  { label: "HOME", href: "/#home" },
  { label: "ABOUT", href: "/#about" },
  { label: "COLLECTION", href: "/#collection" },
  { label: "COMMUNITY", href: "/#community" },
  { label: "FAQ", href: "/#faq" },
];

export const images = {
  logo: "/images/logo.webp",
  favicon: "/images/favicon-32.png",
  hero: "/images/characters/hero.webp",
  heroPng: "/images/characters/hero.png",
  characters: {
    afro: "/images/characters/char-afro.webp",
    antenna: "/images/characters/char-antenna.webp",
    balaclava: "/images/characters/char-balaclava.webp",
    pinkhair: "/images/characters/char-pinkhair.webp",
    beanie: "/images/characters/char-beanie.webp",
    hero: "/images/characters/hero.webp",
  },
  traits: {
    headwear1: "/images/traits/headwear-1.webp",
    headwear2: "/images/traits/headwear-2.webp",
    eyes1: "/images/traits/eyes-1.webp",
    eyes2: "/images/traits/eyes-2.webp",
    outfit1: "/images/traits/outfit-1.webp",
    outfit2: "/images/traits/outfit-2.webp",
    accessory1: "/images/traits/accessory-1.webp",
    accessory2: "/images/traits/accessory-2.webp",
    background1: "/images/traits/background-1.webp",
    background2: "/images/traits/background-2.webp",
  },
};

// Sneak Peek grid — the real character portraits, in display order.
export const sneakPeek = [
  { id: "0001", src: images.characters.pinkhair, alt: "Minihood #0001 — pink spiky hair, sunglasses, cigarette" },
  { id: "0002", src: images.characters.afro, alt: "Minihood #0002 — purple afro, sunglasses" },
  { id: "0003", src: images.characters.antenna, alt: "Minihood #0003 — antenna hair, glasses, cigarette" },
  { id: "0004", src: images.characters.beanie, alt: "Minihood #0004 — red beanie, purple hoodie" },
  { id: "0005", src: images.characters.balaclava, alt: "Minihood #0005 — balaclava, sword" },
];

export const stats = [
  { value: "2,999", label: "MINIS" },
  { value: "100%", label: "ORIGINAL PIXEL ART" },
  { value: "1", label: "HOOD" },
];

export const traitCategories = [
  {
    name: "EYES",
    accent: "cyan",
    blurb: "Glasses & expressions",
    images: [images.traits.eyes1, images.traits.eyes2],
  },
  {
    name: "OUTFITS",
    accent: "magenta",
    blurb: "Jackets & fits",
    images: [images.traits.outfit1, images.traits.outfit2],
  },
  {
    name: "ACCESSORIES",
    accent: "orange",
    blurb: "Staffs, chains & extras",
    images: [images.traits.accessory1, images.traits.accessory2],
  },
];

export const faq = [
  {
    question: "What is Minihood?",
    answer:
      "Minihood is a collection of 2,999 original pixel characters built for the Robinhood ecosystem. Each Mini has its own traits, appearance, and personality.",
  },
  {
    question: "How many Minis are there?",
    answer: "There are 2,999 Minis in total — no more, no less.",
  },
  {
    question: "Are the characters original pixel art?",
    answer: "Yes. Every Mini is original pixel art, designed specifically for the Minihood collection.",
  },
  {
    question: "How can I join the hood?",
    answer:
      "Head to the Join page, complete the puzzle and social tasks, then submit your wallet to secure your spot.",
  },
];
