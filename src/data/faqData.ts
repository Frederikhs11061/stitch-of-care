export interface FaqItem {
  id: string;
  question: { da: string; en: string };
  answer: { da: string; en: string };
}

export const faqItems: FaqItem[] = [
  {
    id: "1",
    question: {
      da: "Hvordan modtager jeg min opskrift?",
      en: "How do I receive my pattern?",
    },
    answer: {
      da: "Straks efter køb modtager du en e-mail med et downloadlink til din PDF-opskrift. Linket er gyldigt i 7 dage, men du kan altid kontakte os, hvis du har brug for en ny. Husk at tjekke din spammappe.",
      en: "Immediately after purchase, you'll receive an email with a download link to your PDF pattern. The link is valid for 7 days, but you can always contact us if you need a new one. Remember to check your spam folder.",
    },
  },
  {
    id: "2",
    question: {
      da: "Hvad sker der, hvis jeg ikke kan åbne filen?",
      en: "What happens if I can't open the file?",
    },
    answer: {
      da: "Opskrifterne leveres som PDF-filer. Du skal bruge et program som Adobe Acrobat Reader (gratis) eller lignende. Er problemet teknisk, er du altid velkommen til at sende os en e-mail på hej@stitchofcare.dk.",
      en: "Patterns are delivered as PDF files. You'll need a program like Adobe Acrobat Reader (free) or similar. If the problem is technical, you're always welcome to email us at hello@stitchofcare.com.",
    },
  },
  {
    id: "3",
    question: {
      da: "Hvad er jeres returpolitik?",
      en: "What is your return policy?",
    },
    answer: {
      da: "Da opskrifter er digitale produkter, er købet endeligt efter download. Oplever du fejl i opskriften eller tekniske problemer, refunderer vi selvfølgelig fuldt ud – skriv til os inden for 14 dage.",
      en: "As patterns are digital products, the purchase is final after download. If you experience errors in the pattern or technical issues, we will of course provide a full refund – write to us within 14 days.",
    },
  },
  {
    id: "4",
    question: {
      da: "Kan jeg dele opskriften med andre?",
      en: "Can I share the pattern with others?",
    },
    answer: {
      da: "Opskrifterne er til personlig brug og må ikke deles, kopieres eller videresælges. Del gerne dit færdige strikarbejde på sociale medier – tag @stitchofcare, vi elsker at se det!",
      en: "Patterns are for personal use only and may not be shared, copied, or resold. Feel free to share your finished knitting on social media – tag @stitchofcare, we love to see it!",
    },
  },
  {
    id: "5",
    question: {
      da: "Hvilken garnvægt skal jeg bruge?",
      en: "What yarn weight should I use?",
    },
    answer: {
      da: "The Broke Sweater er designet til bulky weight garn (CYCA 5-6). Vi anbefaler Drops Eskimo, CaMaRose Yak eller lignende. Lav altid en maskeprøve for at sikre korrekt størrelse.",
      en: "The Broke Sweater is designed for bulky weight yarn (CYCA 5-6). We recommend Drops Eskimo, CaMaRose Yak, or similar. Always knit a gauge swatch to ensure correct sizing.",
    },
  },
  {
    id: "6",
    question: {
      da: "Jeg er ny til strik – er opskriften noget for mig?",
      en: "I'm new to knitting – is this pattern for me?",
    },
    answer: {
      da: "The Broke Sweater er mærket som 'øvet begynder'. Det betyder, at du skal kende grundstierne (ret og vrang), og gerne have strikket en lille ting eller to. Vi arbejder på begynderopskrifter – tilmeld dig nyhedsbrevet for at få besked, når de lanceres.",
      en: "The Broke Sweater is labelled 'intermediate'. This means you should know the basic stitches (knit and purl), and ideally have knitted something small before. We're working on beginner patterns – subscribe to the newsletter to be notified when they launch.",
    },
  },
];
