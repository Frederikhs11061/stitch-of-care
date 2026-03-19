export const en = {
  nav: {
    patterns: "Patterns",
    blog: "Journal",
    faq: "FAQ",
    about: "About",
    cart: "Cart",
    menu: "Menu",
    close: "Close",
  },
  hero: {
    eyebrow: "Nordic Knitting Patterns",
    heading1: "Stitch",
    heading2: "of Care",
    tagline: "Patterns made with intention. Knitted with love.",
    cta: "Explore patterns",
    ctaSecondary: "Our story",
    scrollHint: "Scroll to explore",
  },
  marquee: {
    items: [
      "Handcrafted patterns",
      "Nordic design",
      "Digital PDF",
      "Instant download",
      "Made with care",
      "Slow knitting",
    ],
  },
  featuredProduct: {
    eyebrow: "Featured pattern",
    cta: "Add to cart",
    viewDetails: "View details",
    pages: "pages",
    difficulty: "Difficulty",
    yarnWeight: "Yarn weight",
    sizes: "Sizes",
    new: "New",
  },
  aboutTeaser: {
    eyebrow: "The maker",
    heading: "Hi, I'm the hands\nbehind the patterns",
    body: "I'm a knitter, a slow-living enthusiast, and a firm believer that craft is care. Stitch of Care was born from late evenings with needles in hand and a cup of tea gone cold.",
    cta: "Read my story",
    imageCaption: "Always surrounded by yarn",
  },
  instagram: {
    eyebrow: "Follow along",
    heading: "From the feed",
    handle: "@stitchofcare",
    cta: "Follow on Instagram",
  },
  newsletter: {
    eyebrow: "Stay in the loop",
    heading: "New patterns,\nknitting notes & more",
    body: "Join the community. No spam – just slow, considered updates when something worth sharing happens.",
    placeholder: "Your email address",
    cta: "Subscribe",
    success: "You're in! Check your inbox.",
    disclaimer: "Unsubscribe any time. We hate spam too.",
  },
  product: {
    addToCart: "Add to cart",
    addedToCart: "Added!",
    buyNow: "Buy now",
    inCart: "In cart",
    details: "Pattern details",
    includes: "What's included",
    includesList: [
      "14-page PDF pattern",
      "Step-by-step instructions",
      "Chart for the back lettering",
      "Sizing guide for 7 sizes",
      "Yarn & needle recommendations",
      "Gauge and tension guide",
    ],
    pages: "pages",
    difficulty: "Difficulty",
    yarnWeight: "Yarn weight",
    sizes: "Sizes",
    language: "Pattern language",
    languageValue: "English & Danish",
    format: "Format",
    formatValue: "Digital PDF",
    instant: "Instant download",
    new: "New",
    backLabel: "Back reads",
  },
  cart: {
    title: "Your cart",
    empty: "Your cart is empty",
    emptyBody: "Explore our patterns and find something to love.",
    exploreCta: "Browse patterns",
    checkout: "Proceed to checkout",
    total: "Total",
    remove: "Remove",
    quantity: "Qty",
    digital: "Digital download",
    currency: "DKK",
    subtotal: "Subtotal",
    tax: "VAT included",
  },
  about: {
    eyebrow: "About me",
    heading: "Stitch of Care",
    intro: "A small independent pattern studio rooted in Nordic tradition and the philosophy of slow craft.",
    storyHeading: "The story",
    story: `It started, as most things do, with a project that got out of hand. One evening, one sweater, and a realisation: this is the thing that makes me feel like myself.

Stitch of Care is my small corner of the internet where I share patterns that I actually want to make – and that I hope you will too. Every design comes from a genuine need: to wear something handmade, meaningful, and a little bit funny.

I live in Denmark with too much yarn and not enough storage. The Broke Sweater was the first pattern I published because it felt honest. More are on the way.`,
    valuesHeading: "What I believe in",
    values: [
      { title: "Slow making", body: "Craft should never feel rushed. Good things take time, and that time is worth something." },
      { title: "Honest design", body: "Patterns should be clear, tested, and joyful to follow. No unnecessary complexity." },
      { title: "Community first", body: "Knitting is better together. Tag me in your makes – I want to see them." },
    ],
    contactHeading: "Get in touch",
    contactBody: "Questions, collabs, or just want to share a photo of your Broke Sweater in progress?",
    contactCta: "Send me a message",
    followHeading: "Follow along",
  },
  blog: {
    eyebrow: "The journal",
    heading: "Knitting notes",
    readMore: "Read more",
    readingTime: "min read",
    back: "Back to journal",
    allPosts: "All posts",
    categories: {
      all: "All",
      guides: "Guides",
      lifestyle: "Lifestyle",
    },
  },
  faq: {
    eyebrow: "FAQ",
    heading: "Questions & answers",
    body: "Everything you need to know about our patterns and the process.",
    stillQuestions: "Still have questions?",
    stillBody: "We're always happy to help.",
    contactCta: "Contact us",
  },
  footer: {
    tagline: "Patterns made with intention.",
    nav: {
      patterns: "Patterns",
      about: "About",
      blog: "Journal",
      faq: "FAQ",
      contact: "Contact",
    },
    legal: {
      privacy: "Privacy",
      terms: "Terms",
    },
    copyright: "Stitch of Care",
    madeWith: "Made with yarn & care in Denmark",
    instagram: "Instagram",
    email: "Email",
  },
  common: {
    back: "Back",
    close: "Close",
    loading: "Loading…",
    error: "Something went wrong",
    retry: "Try again",
  },
};

export type Translations = {
  nav: { patterns: string; blog: string; faq: string; about: string; cart: string; menu: string; close: string };
  hero: { eyebrow: string; heading1: string; heading2: string; tagline: string; cta: string; ctaSecondary: string; scrollHint: string };
  marquee: { items: string[] };
  featuredProduct: { eyebrow: string; cta: string; viewDetails: string; pages: string; difficulty: string; yarnWeight: string; sizes: string; new: string };
  aboutTeaser: { eyebrow: string; heading: string; body: string; cta: string; imageCaption: string };
  instagram: { eyebrow: string; heading: string; handle: string; cta: string };
  newsletter: { eyebrow: string; heading: string; body: string; placeholder: string; cta: string; success: string; disclaimer: string };
  product: {
    addToCart: string; addedToCart: string; buyNow: string; inCart: string; details: string;
    includes: string; includesList: readonly string[]; pages: string; difficulty: string; yarnWeight: string;
    sizes: string; language: string; languageValue: string; format: string; formatValue: string;
    instant: string; new: string; backLabel: string;
  };
  cart: { title: string; empty: string; emptyBody: string; exploreCta: string; checkout: string; total: string; remove: string; quantity: string; digital: string; currency: string; subtotal: string; tax: string };
  about: {
    eyebrow: string; heading: string; intro: string; storyHeading: string; story: string; valuesHeading: string;
    values: { title: string; body: string }[];
    contactHeading: string; contactBody: string; contactCta: string; followHeading: string;
  };
  blog: { eyebrow: string; heading: string; readMore: string; readingTime: string; back: string; allPosts: string; categories: { all: string; guides: string; lifestyle: string } };
  faq: { eyebrow: string; heading: string; body: string; stillQuestions: string; stillBody: string; contactCta: string };
  footer: { tagline: string; nav: { patterns: string; about: string; blog: string; faq: string; contact: string }; legal: { privacy: string; terms: string }; copyright: string; madeWith: string; instagram: string; email: string };
  common: { back: string; close: string; loading: string; error: string; retry: string };
};
