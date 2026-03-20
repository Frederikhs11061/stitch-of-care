import { NextResponse } from "next/server";
import { Resend } from "resend";
import { PDFDocument, rgb, StandardFonts } from "pdf-lib";

const resend = new Resend(process.env.RESEND_API_KEY);

async function generatePatternPDF(patternName: string): Promise<Uint8Array> {
  const doc = await PDFDocument.create();
  const page = doc.addPage([595, 842]);
  const { width, height } = page.getSize();

  const serif = await doc.embedFont(StandardFonts.TimesRoman);
  const sans = await doc.embedFont(StandardFonts.Helvetica);
  const sansBold = await doc.embedFont(StandardFonts.HelveticaBold);

  const brown = rgb(0.173, 0.145, 0.125);
  const warmGray = rgb(0.42, 0.373, 0.353);
  const dimGold = rgb(0.694, 0.612, 0.455);

  page.drawLine({ start: { x: 48, y: height - 48 }, end: { x: width - 48, y: height - 48 }, thickness: 0.5, color: dimGold });
  page.drawText("STITCH OF CARE  ·  OPSKRIFT", { x: 48, y: height - 68, size: 7, font: sans, color: warmGray });
  page.drawText(patternName, { x: 48, y: height - 120, size: 36, font: serif, color: brown });
  page.drawLine({ start: { x: 48, y: height - 136 }, end: { x: 200, y: height - 136 }, thickness: 0.4, color: dimGold });

  let y = height - 180;
  page.drawText("MATERIALER", { x: 48, y, size: 7.5, font: sansBold, color: warmGray });
  y -= 20;
  const lines = [
    "• 400 m fingering-garn (Filcolana Arwetta Classic, Ecru)",
    "• 2,5 mm rundpind, 80 cm",
    "• 2,5 mm DPN eller Magic Loop",
    "• Markører (min. 4)",
  ];
  for (const l of lines) { page.drawText(l, { x: 48, y, size: 10, font: serif, color: brown }); y -= 18; }

  page.drawLine({ start: { x: 48, y: 48 }, end: { x: width - 48, y: 48 }, thickness: 0.4, color: dimGold });
  page.drawText("© Stitch of Care  ·  stitchofcare.dk", { x: 48, y: 32, size: 6.5, font: sans, color: warmGray });

  return doc.save();
}

export async function GET() {
  try {
    const pdfBytes = await generatePatternPDF("The Broke Sweater");
    const pdfBase64 = Buffer.from(pdfBytes).toString("base64");

    const result = await resend.emails.send({
      from: "Stitch of Care <onboarding@resend.dev>",
      to: "frederik.hs@live.dk",
      subject: "Din Stitch of Care opskrift ✦",
      attachments: [{ filename: "the-broke-sweater.pdf", content: pdfBase64 }],
      html: `
        <div style="font-family: Georgia, serif; max-width: 560px; margin: 0 auto; padding: 48px 32px; color: #2c2520;">
          <p style="font-size: 11px; letter-spacing: 0.2em; text-transform: uppercase; color: #9a8d85; margin-bottom: 32px;">Stitch of Care</p>
          <h1 style="font-size: 28px; font-weight: 300;">Tak for dit køb.</h1>
          <p style="font-size: 14px; line-height: 1.8; color: #6b5f5a;">Din opskrift er vedhæftet som PDF — god fornøjelse med strikkeriet.</p>
        </div>
      `,
    });

    return NextResponse.json({ ok: true, result });
  } catch (err) {
    return NextResponse.json({ ok: false, error: String(err) });
  }
}
