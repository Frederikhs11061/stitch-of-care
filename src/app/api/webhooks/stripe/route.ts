import { NextResponse } from "next/server";
import Stripe from "stripe";
import { Resend } from "resend";
import { createClient } from "next-sanity";
import { PDFDocument, rgb, StandardFonts } from "pdf-lib";

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

// ─── PDF generator ───────────────────────────────────────────────────────────

async function generatePatternPDF(patternName: string): Promise<Uint8Array> {
  const doc = await PDFDocument.create();
  const page = doc.addPage([595, 842]); // A4
  const { width, height } = page.getSize();

  const serif = await doc.embedFont(StandardFonts.TimesRoman);
  const serifBold = await doc.embedFont(StandardFonts.TimesRomanBold);
  const sans = await doc.embedFont(StandardFonts.Helvetica);
  const sansBold = await doc.embedFont(StandardFonts.HelveticaBold);

  const brown = rgb(0.173, 0.145, 0.125);   // #2c2520
  const warmGray = rgb(0.42, 0.373, 0.353); // #6b5f5a
  const dimGold = rgb(0.694, 0.612, 0.455); // #b19c74
  const sand = rgb(0.878, 0.847, 0.816);    // #e0d8d0

  // Top rule
  page.drawLine({ start: { x: 48, y: height - 48 }, end: { x: width - 48, y: height - 48 }, thickness: 0.5, color: dimGold });

  // Eyebrow
  page.drawText("STITCH OF CARE  ·  OPSKRIFT", {
    x: 48, y: height - 68,
    size: 7, font: sans, color: warmGray,
  });

  // Pattern name (large serif)
  page.drawText(patternName, {
    x: 48, y: height - 120,
    size: 36, font: serif, color: brown,
  });

  // Thin gold rule under title
  page.drawLine({ start: { x: 48, y: height - 136 }, end: { x: 200, y: height - 136 }, thickness: 0.4, color: dimGold });

  // ── Overview block ──────────────────────────────────────────────────────────
  const col1x = 48;
  const col2x = 220;
  let y = height - 170;

  function label(text: string, x: number, cy: number) {
    page.drawText(text.toUpperCase(), { x, y: cy, size: 6.5, font: sansBold, color: warmGray });
  }
  function value(text: string, x: number, cy: number) {
    page.drawText(text, { x, y: cy - 14, size: 10, font: serif, color: brown });
  }

  label("Garnvægt", col1x, y);       value("Fingering / Sock", col1x, y);
  label("Garnmængde", col2x, y);     value("350–450 m (str. S–XL)", col2x, y);
  y -= 48;
  label("Pinde", col1x, y);          value("2,5 mm rundt + DPN", col1x, y);
  label("Masketæthed", col2x, y);    value("32 m × 44 r = 10 × 10 cm", col2x, y);
  y -= 48;
  label("Størrelser", col1x, y);     value("XS · S · M · L · XL", col1x, y);
  label("Sværhedsgrad", col2x, y);   value("Let øvet", col2x, y);
  y -= 48;
  label("Sider", col1x, y);          value("12 sider", col1x, y);
  label("Sprog", col2x, y);          value("Dansk", col2x, y);

  // Separator
  y -= 24;
  page.drawLine({ start: { x: 48, y }, end: { x: width - 48, y }, thickness: 0.4, color: sand });

  // ── Materials ───────────────────────────────────────────────────────────────
  y -= 24;
  page.drawText("MATERIALER", { x: 48, y, size: 7.5, font: sansBold, color: warmGray });
  y -= 18;
  const materials = [
    "• 400 m fingering-garn (her: Filcolana Arwetta Classic, farve Ecru)",
    "• 2,5 mm rundpind, 80 cm",
    "• 2,5 mm DPN eller Magic Loop",
    "• Markører (min. 4)",
    "• Stopmaskering",
    "• Maskesamler",
  ];
  for (const m of materials) {
    page.drawText(m, { x: 48, y, size: 9.5, font: serif, color: brown, lineHeight: 16 });
    y -= 16;
  }

  // Separator
  y -= 12;
  page.drawLine({ start: { x: 48, y }, end: { x: width - 48, y }, thickness: 0.4, color: sand });

  // ── Gauge / Masketæthed ──────────────────────────────────────────────────────
  y -= 24;
  page.drawText("MASKETÆTHED", { x: 48, y, size: 7.5, font: sansBold, color: warmGray });
  y -= 18;
  const gaugeText =
    "32 masker × 44 rækker = 10 × 10 cm i glat ret strik. " +
    "Vask og bloker dit prøvestykke inden du begynder. " +
    "Masketætheden er afgørende for pasformen.";
  const gaugeLines = wrapText(gaugeText, 68);
  for (const line of gaugeLines) {
    page.drawText(line, { x: 48, y, size: 9.5, font: serif, color: brown });
    y -= 16;
  }

  // Separator
  y -= 12;
  page.drawLine({ start: { x: 48, y }, end: { x: width - 48, y }, thickness: 0.4, color: sand });

  // ── Pattern notes ────────────────────────────────────────────────────────────
  y -= 24;
  page.drawText("NOTER FRA DESIGNEREN", { x: 48, y, size: 7.5, font: sansBold, color: warmGray });
  y -= 18;
  const notesText =
    "The Broke Sweater er strikket oppefra og ned i ét stykke. " +
    "Skuldrene formes med korte rækker for et naturligt fald, og ærmeindtagene " +
    "giver en klassisk, let fitted silhuet. Ribberne forneden og ved ærmeender " +
    "er bevidst lidt løsere for et afslappet udtryk. " +
    "Opskriften er skrevet med forklaringer til alle korte-rækker undervejs.";
  const notesLines = wrapText(notesText, 68);
  for (const line of notesLines) {
    page.drawText(line, { x: 48, y, size: 9.5, font: serif, color: brown });
    y -= 16;
  }

  // Separator
  y -= 12;
  page.drawLine({ start: { x: 48, y }, end: { x: width - 48, y }, thickness: 0.4, color: sand });

  // ── Construction ─────────────────────────────────────────────────────────────
  y -= 24;
  page.drawText("KONSTRUKTION (OVERBLIK)", { x: 48, y, size: 7.5, font: sansBold, color: warmGray });
  y -= 18;
  const steps = [
    ["1. Krave", "Slå masker op til krave (74–82 m afhæng. af str.) og strik 2×2 ribstrik i 8 cm."],
    ["2. Bagstykke", "Adskil for- og bagstykke. Strik bagstykket fladt med korte rækker til skulder."],
    ["3. Forstykke", "Strik forstykket som bagstykket med udskæring til halsen."],
    ["4. Samling", "Saml for- og bagstykke i siderne. Samle ærmeindtag."],
    ["5. Ærmer", "Opsaml masker rundt om ærmeindtaget og strik i spiral ned til manchet."],
    ["6. Afslutning", "Strik 2×2 rib ved manchetter og nederkant. Bind af løst."],
  ];
  for (const [heading, desc] of steps) {
    if (y < 80) break;
    page.drawText(heading, { x: 48, y, size: 9.5, font: serifBold, color: brown });
    y -= 14;
    const descLines = wrapText(desc, 68);
    for (const line of descLines) {
      page.drawText(line, { x: 48, y, size: 9, font: serif, color: warmGray });
      y -= 14;
    }
    y -= 6;
  }

  // Bottom rule + footer
  page.drawLine({ start: { x: 48, y: 48 }, end: { x: width - 48, y: 48 }, thickness: 0.4, color: dimGold });
  page.drawText("© Stitch of Care  ·  stitchofcare.dk  ·  Må ikke deles eller sælges videre", {
    x: 48, y: 32, size: 6.5, font: sans, color: warmGray,
  });

  return doc.save();
}

// Simple word-wrap helper (chars per line)
function wrapText(text: string, charsPerLine: number): string[] {
  const words = text.split(" ");
  const lines: string[] = [];
  let current = "";
  for (const word of words) {
    if ((current + " " + word).trim().length > charsPerLine) {
      lines.push(current.trim());
      current = word;
    } else {
      current = (current + " " + word).trim();
    }
  }
  if (current) lines.push(current.trim());
  return lines;
}

// ─── Webhook handler ─────────────────────────────────────────────────────────

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

  const patternIds: string[] = JSON.parse(session.metadata?.patternIds ?? "[]");
  const patternNames: string[] = JSON.parse(session.metadata?.patternNames ?? "[]");

  // Try to get PDF URLs from Sanity
  let sanityPdfs: { id: string; url: string }[] = [];
  if (patternIds.length > 0) {
    try {
      const patterns = await sanity.fetch(
        `*[_type == "pattern" && _id in $ids]{ _id, "pdfUrl": pdfFile.asset->url }`,
        { ids: patternIds }
      );
      sanityPdfs = patterns
        .filter((p: { _id: string; pdfUrl?: string }) => p.pdfUrl)
        .map((p: { _id: string; pdfUrl: string }) => ({ id: p._id, url: p.pdfUrl }));
    } catch {
      // Sanity fetch failed — fall through to generated PDF
    }
  }

  // Build attachments: use Sanity PDF if available, otherwise generate one
  const attachments: { filename: string; content: string }[] = [];

  for (let i = 0; i < patternIds.length; i++) {
    const id = patternIds[i];
    const name = patternNames[i] ?? "Opskrift";
    const sanityPdf = sanityPdfs.find((p) => p.id === id);

    if (sanityPdf?.url) {
      // Fetch PDF from Sanity CDN and attach
      try {
        const res = await fetch(sanityPdf.url);
        const buf = await res.arrayBuffer();
        attachments.push({
          filename: `${name.replace(/\s+/g, "-").toLowerCase()}.pdf`,
          content: Buffer.from(buf).toString("base64"),
        });
      } catch {
        // Fall through to generated PDF
      }
    }

    if (!attachments.find((a) => a.filename.includes(name.split(" ")[0].toLowerCase()))) {
      // Generate placeholder PDF
      const pdfBytes = await generatePatternPDF(name);
      attachments.push({
        filename: `${name.replace(/\s+/g, "-").toLowerCase()}.pdf`,
        content: Buffer.from(pdfBytes).toString("base64"),
      });
    }
  }

  const firstName = customerName ? customerName.split(" ")[0] : "";

  await resend.emails.send({
    from: "Stitch of Care <hej@konvertio.dk>",
    to: customerEmail,
    subject: "Din Stitch of Care opskrift ✦",
    attachments: attachments.map((a) => ({
      filename: a.filename,
      content: a.content,
    })),
    html: `
      <div style="font-family: Georgia, serif; max-width: 560px; margin: 0 auto; padding: 48px 32px; color: #2c2520;">
        <p style="font-size: 11px; letter-spacing: 0.2em; text-transform: uppercase; color: #9a8d85; margin-bottom: 32px;">Stitch of Care</p>
        <h1 style="font-size: 28px; font-weight: 300; line-height: 1.2; margin-bottom: 16px;">
          Tak for dit køb${firstName ? `, ${firstName}` : ""}.
        </h1>
        <p style="font-size: 14px; line-height: 1.8; color: #6b5f5a; margin-bottom: 8px;">
          Din opskrift er vedhæftet denne mail som PDF.
        </p>
        <p style="font-size: 14px; line-height: 1.8; color: #6b5f5a; margin-bottom: 32px;">
          ${patternNames.join(", ")} — god fornøjelse med strikkeriet.
        </p>
        <p style="font-size: 12px; color: #c4b8b2; margin-top: 48px; line-height: 1.6;">
          Spørgsmål? Skriv til <a href="mailto:hej@stitchofcare.dk" style="color:#9a8d85;">hej@stitchofcare.dk</a>
        </p>
      </div>
    `,
  });

  // Notify store
  await resend.emails.send({
    from: "Stitch of Care <hej@konvertio.dk>",
    to: "frederik@konvertio.dk",
    subject: `Nyt salg: ${patternNames.join(", ")} — ${customerEmail}`,
    html: `
      <p><strong>Nyt salg!</strong></p>
      <p>Køber: ${customerEmail}</p>
      <p>Opskrifter: ${patternNames.join(", ")}</p>
      <p>Beløb: ${(session.amount_total ?? 0) / 100} DKK</p>
    `,
  });

  return NextResponse.json({ received: true });
}
