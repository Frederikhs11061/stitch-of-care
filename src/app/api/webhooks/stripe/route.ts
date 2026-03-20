import { NextResponse } from "next/server";
import Stripe from "stripe";
import { Resend } from "resend";
import { createClient } from "next-sanity";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2026-02-25.clover",
});

const resend = new Resend(process.env.RESEND_API_KEY);

const sanity = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production",
  apiVersion: "2024-01-01",
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
});

export async function POST(req: Request) {
  const body = await req.text();
  const sig = req.headers.get("stripe-signature");

  if (!sig || !process.env.STRIPE_WEBHOOK_SECRET) {
    return NextResponse.json({ error: "Manglende signatur" }, { status: 400 });
  }

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch {
    return NextResponse.json({ error: "Ugyldig signatur" }, { status: 400 });
  }

  if (event.type !== "checkout.session.completed") {
    return NextResponse.json({ received: true });
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const session = event.data.object as any;
  const customerEmail = session.customer_details?.email ?? session.customer_email;
  const customerName = session.customer_details?.name ?? "";

  if (!customerEmail) {
    return NextResponse.json({ received: true });
  }

  // Fetch pattern PDF URLs from Sanity
  const patternIds: string[] = JSON.parse(session.metadata?.patternIds ?? "[]");
  const patternNames: string[] = JSON.parse(session.metadata?.patternNames ?? "[]");

  let pdfLinks: { name: string; url: string }[] = [];

  if (patternIds.length > 0) {
    const patterns = await sanity.fetch(
      `*[_type == "pattern" && _id in $ids]{ _id, name, "pdfUrl": pdfFile.asset->url }`,
      { ids: patternIds }
    );

    pdfLinks = patternIds
      .map((id, i) => {
        const found = patterns.find((p: { _id: string; pdfUrl?: string }) => p._id === id);
        return {
          name: patternNames[i] ?? found?.name ?? "Opskrift",
          url: found?.pdfUrl ?? "",
        };
      })
      .filter((l) => l.url);
  }

  const hasFiles = pdfLinks.length > 0;

  const pdfLinksHtml = hasFiles
    ? pdfLinks
        .map(
          (l) =>
            `<a href="${l.url}" style="display:inline-block;background:#2c2520;color:#faf8f5;font-family:sans-serif;font-size:11px;letter-spacing:0.2em;text-transform:uppercase;padding:12px 24px;text-decoration:none;margin-bottom:8px;">
              Download: ${l.name}
            </a>`
        )
        .join("<br/>")
    : `<p style="font-size:14px;color:#6b5f5a;">Vi sender din opskrift manuelt inden for 24 timer til denne adresse.</p>`;

  await resend.emails.send({
    from: "Stitch of Care <onboarding@resend.dev>",
    to: customerEmail,
    subject: "Din Stitch of Care opskrift ✦",
    html: `
      <div style="font-family: Georgia, serif; max-width: 560px; margin: 0 auto; padding: 48px 32px; color: #2c2520;">
        <p style="font-size: 11px; letter-spacing: 0.2em; text-transform: uppercase; color: #9a8d85; margin-bottom: 32px;">Stitch of Care</p>
        <h1 style="font-size: 28px; font-weight: 300; line-height: 1.2; margin-bottom: 16px;">
          Tak for dit køb${customerName ? `, ${customerName.split(" ")[0]}` : ""}.
        </h1>
        <p style="font-size: 14px; line-height: 1.8; color: #6b5f5a; margin-bottom: 32px;">
          ${hasFiles
            ? "Din opskrift er klar til download herunder. God fornøjelse med strikkeriet."
            : "Betalingen er gennemført. Du modtager din opskrift som vedhæftning inden for 24 timer."}
        </p>
        ${pdfLinksHtml}
        <p style="font-size: 12px; color: #c4b8b2; margin-top: 48px; line-height: 1.6;">
          Spørgsmål? Skriv til <a href="mailto:hej@stitchofcare.dk" style="color:#9a8d85;">hej@stitchofcare.dk</a>
        </p>
      </div>
    `,
  });

  // Notify store
  await resend.emails.send({
    from: "Stitch of Care <onboarding@resend.dev>",
    to: "hej@stitchofcare.dk",
    subject: `Nyt salg: ${patternNames.join(", ")} — ${customerEmail}`,
    html: `
      <p><strong>Nyt salg!</strong></p>
      <p>Køber: ${customerEmail}</p>
      <p>Opskrifter: ${patternNames.join(", ")}</p>
      <p>Beløb: ${(session.amount_total ?? 0) / 100} DKK</p>
      ${!hasFiles ? "<p><strong>OBS: Ingen PDF uploadet endnu — send manuelt.</strong></p>" : ""}
    `,
  });

  return NextResponse.json({ received: true });
}
