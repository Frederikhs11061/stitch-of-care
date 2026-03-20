import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2026-02-25.clover",
});

interface CartItem {
  id: string;
  name: string;
  price: number; // DKK
  priceEur: number;
  image: string;
  quantity: number;
}

export async function POST(req: Request) {
  const { items, email }: { items: CartItem[]; email?: string } = await req.json();

  if (!items?.length) {
    return NextResponse.json({ error: "Ingen varer i kurven" }, { status: 400 });
  }

  const origin = req.headers.get("origin") ?? "https://stitch-of-care.vercel.app";

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    payment_method_types: ["card"],
    customer_email: email,
    line_items: items.map((item) => ({
      price_data: {
        currency: "dkk",
        unit_amount: Math.round(item.price * 100), // øre
        product_data: {
          name: item.name,
          images: item.image ? [item.image] : [],
        },
      },
      quantity: item.quantity,
    })),
    metadata: {
      patternIds: JSON.stringify(items.map((i) => i.id)),
      patternNames: JSON.stringify(items.map((i) => i.name)),
    },
    success_url: `${origin}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${origin}/checkout/cancel`,
    locale: "da",
  });

  return NextResponse.json({ url: session.url });
}
