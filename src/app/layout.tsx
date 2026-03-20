import type { Metadata } from "next";
import "./globals.css";
import { LanguageProvider } from "@/context/LanguageContext";
import { CartProvider } from "@/context/CartContext";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CartDrawer } from "@/components/layout/CartDrawer";

export const metadata: Metadata = {
  metadataBase: new URL("https://stitch-of-care.vercel.app"),
  title: {
    default: "Stitch of Care — Nordiske Strikkeopskrifter med Omtanke",
    template: "%s — Stitch of Care",
  },
  description:
    "Håndlavede strikkeopskrifter med nordisk sjæl. Slow strik, PDF-download og 7 størrelser. Køb The Broke Sweater opskrift direkte online.",
  keywords: [
    "strikkeopskrifter",
    "nordisk strik",
    "sweater opskrift",
    "strik PDF",
    "The Broke Sweater",
    "bulky garn opskrift",
    "slow strik",
    "knitting patterns",
  ],
  authors: [{ name: "Stitch of Care" }],
  creator: "Stitch of Care",
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  openGraph: {
    title: "Stitch of Care — Nordiske Strikkeopskrifter",
    description:
      "Håndlavede strikkeopskrifter med nordisk sjæl. PDF-download, øjeblikkelig levering, 7 størrelser.",
    type: "website",
    locale: "da_DK",
    siteName: "Stitch of Care",
    images: [
      {
        url: "https://images.unsplash.com/photo-1576871337622-98d48d1cf531?w=1200&q=80",
        width: 1200,
        height: 630,
        alt: "Stitch of Care — Nordiske Strikkeopskrifter",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Stitch of Care — Nordiske Strikkeopskrifter",
    description: "Håndlavede strikkeopskrifter med nordisk sjæl. PDF-download.",
    images: ["https://images.unsplash.com/photo-1576871337622-98d48d1cf531?w=1200&q=80"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Stitch of Care",
    url: "https://stitch-of-care.vercel.app",
    logo: "https://stitch-of-care.vercel.app/icon.png",
    description: "Håndlavede nordiske strikkeopskrifter — PDF-download, øjeblikkelig levering.",
    sameAs: ["https://instagram.com/stitchofcare"],
    contactPoint: {
      "@type": "ContactPoint",
      email: "hej@stitchofcare.dk",
      contactType: "customer service",
    },
  };

  return (
    <html lang="da" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500;1,600&family=Jost:wght@300;400;500;600&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
      </head>
      <body className="bg-soft-white text-dark-brown antialiased">
        <LanguageProvider>
          <CartProvider>
            <Navbar />
            <CartDrawer />
            <main>{children}</main>
            <Footer />
          </CartProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
