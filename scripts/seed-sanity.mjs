/**
 * Seed script — populates Sanity with all existing static content.
 * Run with: node scripts/seed-sanity.mjs
 *
 * Requires NEXT_PUBLIC_SANITY_PROJECT_ID and SANITY_API_TOKEN in .env.local
 */

import { createClient } from "@sanity/client";
import { readFileSync } from "fs";

// Load .env.local manually
const envFile = readFileSync(new URL("../.env.local", import.meta.url), "utf-8");
const env = Object.fromEntries(
  envFile.split("\n").filter(Boolean).map((line) => line.split("="))
);

const projectId = env.NEXT_PUBLIC_SANITY_PROJECT_ID?.trim();
const token = env.SANITY_API_TOKEN?.trim();

if (!projectId) {
  console.error("❌  NEXT_PUBLIC_SANITY_PROJECT_ID not found in .env.local");
  process.exit(1);
}
if (!token) {
  console.error("❌  SANITY_API_TOKEN not found in .env.local");
  console.error("   Get it from: manage.sanity.io → API → Tokens → Add API token (Editor)");
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset: "production",
  apiVersion: "2024-01-01",
  token,
  useCdn: false,
});

async function upsert(doc) {
  await client.createOrReplace(doc);
  console.log(`✅  ${doc._type} (${doc._id})`);
}

async function seed() {
  console.log("\n🌱  Seeding Sanity with existing content...\n");

  // ─── Global Settings ──────────────────────────────────────────────────────
  await upsert({
    _id: "globalSettings",
    _type: "globalSettings",
    siteTitle: { da: "Stitch of Care", en: "Stitch of Care" },
    siteDescription: {
      da: "Håndlavede strikkeopskrifter med nordisk sjæl. Slow strik, PDF-download og 7 størrelser.",
      en: "Handcrafted knitting patterns with a Nordic soul. Slow knitting, PDF download and 7 sizes.",
    },
    contactEmail: "hej@stitchofcare.dk",
    instagramHandle: "@stitchofcare",
    footerTagline: { da: "Opskrifter med omtanke.", en: "Patterns made with care." },
  });

  // ─── Home Page ─────────────────────────────────────────────────────────────
  await upsert({
    _id: "homePage",
    _type: "homePage",
    seo: {
      title: "Stitch of Care — Nordiske Strikkeopskrifter med Omtanke",
      description: "Håndlavede strikkeopskrifter med nordisk sjæl. Slow strik, PDF-download og 7 størrelser.",
    },
    hero: {
      eyebrow: { da: "Nordiske strikkeopskrifter", en: "Nordic Knitting Patterns" },
      heading1: "Stitch",
      heading2: "of Care",
      tagline: { da: "Opskrifter med omtanke. Strikket med kærlighed.", en: "Patterns made with intention. Knitted with love." },
      ctaLabel: { da: "Se opskrift", en: "View pattern" },
      mainTile: {
        eyebrow: { da: "Stitch of Care — 2025", en: "Stitch of Care — 2025" },
        title: { da: "The Broke Sweater", en: "The Broke Sweater" },
        imageAlt: { da: "The Broke Sweater", en: "The Broke Sweater" },
      },
      tile1: {
        eyebrow: { da: "Opskrift detaljer", en: "Pattern details" },
        title: { da: "14 sider · 7 størrelser", en: "14 pages · 7 sizes" },
        imageAlt: { da: "Opskrift detaljer", en: "Pattern details" },
      },
      tile2: {
        eyebrow: { da: "Om designeren", en: "About the designer" },
        title: { da: "Strikket med omtanke", en: "Knitted with care" },
        imageAlt: { da: "Om designeren", en: "About the designer" },
      },
      tile3: {
        eyebrow: { da: "Digital PDF", en: "Digital PDF" },
        title: { da: "Øjeblikkelig download", en: "Instant download" },
        imageAlt: { da: "Digital PDF", en: "Digital PDF" },
      },
    },
    aboutTeaser: {
      eyebrow: { da: "Bagved opskrifterne", en: "The maker" },
      heading: { da: "Hej, jeg er hænderne\nbag opskrifterne", en: "Hi, I'm the hands\nbehind the patterns" },
      body: {
        da: "Jeg er stricker, slow-living-entusiast og overbevist om, at håndværk er omsorg. Stitch of Care blev til af sene aftener med pinde i hånden og en kop te, der er blevet kold.",
        en: "I'm a knitter, a slow-living enthusiast, and a firm believer that craft is care. Stitch of Care was born from late evenings with needles in hand and a cup of tea gone cold.",
      },
      ctaLabel: { da: "Læs min historie", en: "Read my story" },
      imageCaption: { da: "Altid omgivet af garn", en: "Always surrounded by yarn" },
      imageAlt: { da: "Strikker med garn", en: "Knitter with yarn" },
    },
    newsletter: {
      eyebrow: { da: "Bliv opdateret", en: "Stay in the loop" },
      heading: { da: "Nye opskrifter,\nstrikkernotes og mere", en: "New patterns,\nknitting notes & more" },
      body: {
        da: "Bliv en del af fællesskabet. Ingen spam – kun rolige, gennemtænkte opdateringer, når der sker noget, der er værd at dele.",
        en: "Join the community. No spam – just slow, considered updates when something worth sharing happens.",
      },
      placeholder: { da: "Din e-mailadresse", en: "Your email address" },
      ctaLabel: { da: "Tilmeld dig", en: "Subscribe" },
      successMessage: { da: "Du er med! Tjek din indbakke.", en: "You're in! Check your inbox." },
      disclaimer: { da: "Afmeld når som helst. Vi hader også spam.", en: "Unsubscribe any time. We hate spam too." },
    },
  });

  // ─── About Page ────────────────────────────────────────────────────────────
  await upsert({
    _id: "aboutPage",
    _type: "aboutPage",
    seo: {
      title: "Om mig — Stitch of Care",
      description: "Et lille uafhængigt opskriftstudie med rødder i nordisk tradition og filosofien om slow craft.",
    },
    eyebrow: { da: "Om mig", en: "About" },
    heading: "Stitch of Care",
    intro: {
      da: "Et lille uafhængigt opskriftstudie med rødder i nordisk tradition og filosofien om slow craft.",
      en: "A small independent pattern studio rooted in Nordic tradition and the philosophy of slow craft.",
    },
    portraitAlt: { da: "Strikker ved vinduet", en: "Knitter by the window" },
    storyHeading: { da: "Historien", en: "The story" },
    story: {
      da: `Det startede, som de fleste ting gør, med et projekt, der løb lidt løbsk. En aften, en sweater, og en erkendelse: dette er det, der får mig til at føle mig som mig selv.

Stitch of Care er mit lille hjørne af internettet, hvor jeg deler opskrifter, som jeg selv ønsker at lave – og som jeg håber, du vil også. Hvert design kommer fra et ægte behov: at bære noget håndlavet, meningsfuldt og en smule sjovt.

Jeg bor i Danmark med alt for meget garn og ikke nok opbevaring. The Broke Sweater var den første opskrift, jeg udgav, fordi den føltes ærlig. Flere er på vej.`,
      en: `It started, as most things do, with a project that got a little out of hand. One evening, one sweater, and a realisation: this is what makes me feel like myself.

Stitch of Care is my little corner of the internet, where I share patterns that I want to make myself – and that I hope you will too. Every design comes from a genuine need: to wear something handmade, meaningful, and a little fun.

I live in Denmark with way too much yarn and not enough storage. The Broke Sweater was the first pattern I published because it felt honest. More are on the way.`,
    },
    valuesHeading: { da: "Det tror jeg på", en: "What I believe in" },
    values: [
      {
        title: { da: "Slow making", en: "Slow making" },
        body: {
          da: "Håndværk bør aldrig føles som noget, der skal overstås. Gode ting tager tid, og den tid er noget værd.",
          en: "Craft should never feel like something to get through. Good things take time, and that time is worth something.",
        },
      },
      {
        title: { da: "Ærligt design", en: "Honest design" },
        body: {
          da: "Opskrifter skal være klare, testede og sjove at følge. Ingen unødvendig kompleksitet.",
          en: "Patterns should be clear, tested, and fun to follow. No unnecessary complexity.",
        },
      },
      {
        title: { da: "Fællesskab først", en: "Community first" },
        body: {
          da: "Strik er bedre sammen. Tag mig i dine billeder – jeg vil gerne se dem.",
          en: "Knitting is better together. Tag me in your photos – I'd love to see them.",
        },
      },
    ],
    contactHeading: { da: "Kontakt", en: "Get in touch" },
    contactBody: {
      da: "Spørgsmål, samarbejder, eller vil du bare dele et billede af din Broke Sweater undervejs?",
      en: "Questions, collaborations, or just want to share a picture of your Broke Sweater in progress?",
    },
    contactCta: { da: "Send mig en besked", en: "Send me a message" },
    followHeading: { da: "Følg med", en: "Follow along" },
  });

  // ─── FAQ Page ──────────────────────────────────────────────────────────────
  await upsert({
    _id: "faqPage",
    _type: "faqPage",
    seo: {
      title: "FAQ — Stitch of Care",
      description: "Alt du behøver at vide om vores opskrifter og processen.",
    },
    eyebrow: { da: "FAQ", en: "FAQ" },
    heading: { da: "Spørgsmål & svar", en: "Questions & answers" },
    body: {
      da: "Alt du behøver at vide om vores opskrifter og processen.",
      en: "Everything you need to know about our patterns and the process.",
    },
    items: [
      {
        question: { da: "Hvordan modtager jeg min opskrift?", en: "How do I receive my pattern?" },
        answer: {
          da: "Straks efter køb modtager du en e-mail med et downloadlink til din PDF-opskrift. Linket er gyldigt i 7 dage, men du kan altid kontakte os, hvis du har brug for en ny. Husk at tjekke din spammappe.",
          en: "Immediately after purchase, you'll receive an email with a download link to your PDF pattern. The link is valid for 7 days, but you can always contact us if you need a new one. Remember to check your spam folder.",
        },
      },
      {
        question: { da: "Hvad sker der, hvis jeg ikke kan åbne filen?", en: "What happens if I can't open the file?" },
        answer: {
          da: "Opskrifterne leveres som PDF-filer. Du skal bruge et program som Adobe Acrobat Reader (gratis) eller lignende. Er problemet teknisk, er du altid velkommen til at sende os en e-mail på hej@stitchofcare.dk.",
          en: "Patterns are delivered as PDF files. You'll need a program like Adobe Acrobat Reader (free) or similar. If the problem is technical, you're always welcome to email us at hej@stitchofcare.dk.",
        },
      },
      {
        question: { da: "Hvad er jeres returpolitik?", en: "What is your return policy?" },
        answer: {
          da: "Da opskrifter er digitale produkter, er købet endeligt efter download. Oplever du fejl i opskriften eller tekniske problemer, refunderer vi selvfølgelig fuldt ud – skriv til os inden for 14 dage.",
          en: "As patterns are digital products, the purchase is final after download. If you experience errors in the pattern or technical issues, we will of course provide a full refund – write to us within 14 days.",
        },
      },
      {
        question: { da: "Kan jeg dele opskriften med andre?", en: "Can I share the pattern with others?" },
        answer: {
          da: "Opskrifterne er til personlig brug og må ikke deles, kopieres eller videresælges. Del gerne dit færdige strikarbejde på sociale medier – tag @stitchofcare, vi elsker at se det!",
          en: "Patterns are for personal use only and may not be shared, copied, or resold. Feel free to share your finished knitting on social media – tag @stitchofcare, we love to see it!",
        },
      },
      {
        question: { da: "Hvilken garnvægt skal jeg bruge?", en: "What yarn weight should I use?" },
        answer: {
          da: "The Broke Sweater er designet til bulky weight garn (CYCA 5-6). Vi anbefaler Drops Eskimo, CaMaRose Yak eller lignende. Lav altid en maskeprøve for at sikre korrekt størrelse.",
          en: "The Broke Sweater is designed for bulky weight yarn (CYCA 5-6). We recommend Drops Eskimo, CaMaRose Yak, or similar. Always knit a gauge swatch to ensure correct sizing.",
        },
      },
      {
        question: { da: "Jeg er ny til strik – er opskriften noget for mig?", en: "I'm new to knitting – is this pattern for me?" },
        answer: {
          da: "The Broke Sweater er mærket som 'øvet begynder'. Det betyder, at du skal kende grundstierne (ret og vrang), og gerne have strikket en lille ting eller to. Vi arbejder på begynderopskrifter – tilmeld dig nyhedsbrevet for at få besked, når de lanceres.",
          en: "The Broke Sweater is labelled 'intermediate'. This means you should know the basic stitches (knit and purl), and ideally have knitted something small before. We're working on beginner patterns – subscribe to the newsletter to be notified when they launch.",
        },
      },
    ],
    stillQuestions: { da: "Har du stadig spørgsmål?", en: "Still have questions?" },
    stillBody: { da: "Vi hjælper altid gerne.", en: "We're always happy to help." },
    contactCta: { da: "Kontakt os", en: "Contact us" },
  });

  // ─── Patterns Page ─────────────────────────────────────────────────────────
  await upsert({
    _id: "patternsPage",
    _type: "patternsPage",
    seo: {
      title: "Strikkeopskrifter — Alle PDF-opskrifter",
      description: "Udforsk alle strikkeopskrifter fra Stitch of Care.",
    },
    eyebrow: { da: "Opskrifter", en: "Patterns" },
    heading: { da: "Opskrifter", en: "Patterns" },
    tagline: {
      da: "Opskrifter med omtanke. Strikket med kærlighed.",
      en: "Patterns made with intention. Knitted with love.",
    },
  });

  // ─── Blog Page ─────────────────────────────────────────────────────────────
  await upsert({
    _id: "blogPage",
    _type: "blogPage",
    seo: {
      title: "Strikkejournal — Strikketips, guides og slow living",
      description: "Læs om strik, garnvalg og slow living på Stitch of Care Journal.",
    },
    eyebrow: { da: "Journalen", en: "Journal" },
    heading: { da: "Strikkejournal", en: "Knitting journal" },
  });

  // ─── Pattern ───────────────────────────────────────────────────────────────
  await upsert({
    _id: "pattern-broke-sweater",
    _type: "pattern",
    name: "The Broke Sweater",
    slug: { current: "broke-sweater" },
    featured: true,
    isNew: true,
    price: 45,
    priceEur: 6,
    difficulty: "Intermediate",
    difficultyLabel: { da: "Øvet begynder", en: "Intermediate" },
    yarnWeight: "Bulky",
    pages: 14,
    sizes: ["XS", "S", "M", "L", "XL", "2XL", "3XL"],
    backText: "Need Money For Yarn",
    description: {
      da: "En oversized, blød trøje med en besked på ryggen. Fordi du altid mangler penge til garn.",
      en: "An oversized, cosy sweater with a message on the back. Because you always need money for yarn.",
    },
    longDescription: {
      da: `The Broke Sweater er skabt til den strikker, der kender kampen alt for godt. Du har garnet, du har nålene – og nu har du også opskriften. Med enkle konstruktionslinjer, en løs og varm pasform og de ikoniske bogstaver "Need Money For Yarn" på ryggen er denne sweater din næste favorit.\n\nOpskriften er skrevet tydeligt og inkluderer diagrammer, størrelsesguide og garnforslag. Perfekt til weekendstrik.`,
      en: `The Broke Sweater is made for the knitter who knows the struggle all too well. You have the yarn, you have the needles – and now you have the pattern. With clean construction lines, a relaxed and cosy fit, and the iconic words "Need Money For Yarn" on the back, this sweater will become your next favourite.\n\nThe pattern is clearly written and includes charts, sizing guide, and yarn recommendations. Perfect for weekend knitting.`,
    },
    tags: ["sweater", "oversized", "bulky", "statement"],
    seo: {
      title: "The Broke Sweater — Strikkeopskrift PDF",
      descriptionDa: "En oversized sweater med 'Need Money For Yarn' på ryggen. 14-siders PDF, 7 størrelser.",
    },
  });

  // ─── Blog posts ────────────────────────────────────────────────────────────
  await upsert({
    _id: "post-bulky-yarn",
    _type: "post",
    title: { da: "Derfor er tyk garn perfekt for begyndere", en: "Why Bulky Yarn Is Perfect for Beginners" },
    slug: { current: "why-bulky-yarn-is-perfect-for-beginners" },
    publishedAt: "2025-01-15",
    readingTime: 4,
    category: "Guides",
    tags: ["begynder", "garn", "tips"],
    excerpt: {
      da: "Tyk garn strikker hurtigt, fejl er lette at rette, og resultatet er synligt næsten med det samme. Her er alt, du skal vide.",
      en: "Bulky yarn knits up fast, mistakes are easy to fix, and progress is almost instantly visible. Here's everything you need to know.",
    },
    coverImageAlt: {
      da: "Tyk bulky garn i naturlige farver",
      en: "Thick bulky yarn in natural colours",
    },
    seo: {
      titleDa: "Derfor er tyk garn perfekt for begyndere — Stitch of Care",
      descriptionDa: "Tyk garn strikker hurtigt, fejl er lette at rette, og resultatet er synligt næsten med det samme.",
    },
  });

  await upsert({
    _id: "post-slow-crafting",
    _type: "post",
    title: { da: "Magien ved slow crafting", en: "The Magic of Slow Crafting" },
    slug: { current: "the-magic-of-slow-crafting" },
    publishedAt: "2025-02-03",
    readingTime: 3,
    category: "Livsstil",
    tags: ["slow living", "mindfulness", "strik"],
    excerpt: {
      da: "I en verden af hurtig mode og hurtige løsninger er strik et oprør. Et stykke for stykke bygget modstykke til stress.",
      en: "In a world of fast fashion and quick fixes, knitting is an act of rebellion. A stitch-by-stitch built antidote to stress.",
    },
    coverImageAlt: {
      da: "Hænder der strikker ved vinduet",
      en: "Hands knitting by the window",
    },
    seo: {
      titleDa: "Magien ved slow crafting — Stitch of Care",
      descriptionDa: "I en verden af hurtig mode og hurtige løsninger er strik et oprør.",
    },
  });

  await upsert({
    _id: "post-yarn-guide",
    _type: "post",
    title: { da: "Din guide til det perfekte garn", en: "Your Guide to the Perfect Yarn" },
    slug: { current: "your-guide-to-the-perfect-yarn" },
    publishedAt: "2025-03-10",
    readingTime: 6,
    category: "Guides",
    tags: ["garn", "guide", "materialer"],
    excerpt: {
      da: "Merino, alpaka eller bomuld? Her er hvad du skal vide, inden du køber garn til dit næste projekt.",
      en: "Merino, alpaca, or cotton? Here's what you need to know before buying yarn for your next project.",
    },
    coverImageAlt: {
      da: "Kugler af farverigt garn",
      en: "Balls of colourful yarn",
    },
    seo: {
      titleDa: "Din guide til det perfekte garn — Stitch of Care",
      descriptionDa: "Merino, alpaka eller bomuld? Her er hvad du skal vide, inden du køber garn.",
    },
  });

  console.log("\n✨  Done! All content seeded to Sanity.");
  console.log("   Open /studio to see and edit everything.\n");
}

seed().catch((err) => {
  console.error("❌  Seed failed:", err.message);
  console.error("    Full error:", JSON.stringify(err, null, 2));
  process.exit(1);
});
