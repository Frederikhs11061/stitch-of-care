import Link from "next/link";
import { Check, ArrowRight } from "lucide-react";

export const metadata = {
  title: "Betaling gennemført — Stitch of Care",
  robots: { index: false },
};

export default function CheckoutSuccessPage() {
  return (
    <div className="min-h-screen bg-soft-white flex items-center justify-center px-6">
      <div className="max-w-md w-full text-center py-24">
        {/* Check icon */}
        <div className="flex items-center justify-center mb-10">
          <div className="w-16 h-16 rounded-full border border-dim-gold/40 flex items-center justify-center">
            <Check size={24} strokeWidth={1.5} className="text-dim-gold" />
          </div>
        </div>

        {/* Eyebrow */}
        <p className="font-sans text-[0.6rem] tracking-[0.35em] uppercase text-warm-gray mb-6">
          Stitch of Care
        </p>

        {/* Heading */}
        <h1 className="font-serif text-4xl font-light text-dark-brown leading-tight mb-6">
          Tak for dit køb.
        </h1>

        {/* Divider */}
        <div className="flex items-center justify-center gap-3 mb-8">
          <div className="w-8 h-px bg-sand" />
          <svg width="4" height="4" viewBox="0 0 5 5" fill="currentColor" className="text-dim-gold/60">
            <polygon points="2.5,0 5,2.5 2.5,5 0,2.5" />
          </svg>
          <div className="w-8 h-px bg-sand" />
        </div>

        <p className="font-sans text-sm text-warm-gray leading-relaxed mb-10">
          Din opskrift er på vej til din indbakke. Tjek evt. din spam-mappe, hvis du ikke modtager en mail inden for få minutter.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/patterns"
            className="inline-flex items-center gap-2 font-sans text-[0.65rem] tracking-[0.22em] uppercase font-medium bg-dark-brown text-cream px-8 py-4 hover:bg-deep-brown transition-colors duration-300"
          >
            Se flere opskrifter
            <ArrowRight size={11} strokeWidth={2} />
          </Link>
          <Link
            href="/"
            className="inline-flex items-center gap-2 font-sans text-[0.65rem] tracking-[0.22em] uppercase font-medium text-warm-gray hover:text-dark-brown transition-colors duration-300"
          >
            Tilbage til forsiden
          </Link>
        </div>
      </div>
    </div>
  );
}
