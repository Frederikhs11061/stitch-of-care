import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  const { email } = await req.json();

  if (!email || !email.includes("@")) {
    return NextResponse.json({ error: "Ugyldig e-mail" }, { status: 400 });
  }

  try {
    // Save to Resend Audience for campaigns
    const audienceId = process.env.RESEND_AUDIENCE_ID;
    if (audienceId) {
      await resend.contacts.create({ email, audienceId, unsubscribed: false });
    }

    // Send confirmation email to subscriber
    await resend.emails.send({
      from: "Stitch of Care <hej@konvertio.dk>",
      to: email,
      subject: "Velkommen til Stitch of Care ✦",
      html: `
        <div style="font-family: Georgia, serif; max-width: 560px; margin: 0 auto; padding: 48px 32px; color: #2c2520;">
          <p style="font-size: 11px; letter-spacing: 0.2em; text-transform: uppercase; color: #9a8d85; margin-bottom: 32px;">Stitch of Care</p>
          <h1 style="font-size: 32px; font-weight: 300; line-height: 1.2; margin-bottom: 24px;">Tak, fordi du tilmelder dig.</h1>
          <p style="font-size: 14px; line-height: 1.8; color: #6b5f5a; margin-bottom: 16px;">
            Du er nu en del af Stitch of Care-fællesskabet. Du får besked, når der er nye opskrifter, strikkernotes og andet, der er værd at dele.
          </p>
          <p style="font-size: 14px; line-height: 1.8; color: #6b5f5a; margin-bottom: 40px;">
            Ingen spam. Kun rolige, gennemtænkte opdateringer.
          </p>
          <a href="https://stitch-of-care.vercel.app/patterns" style="display: inline-block; background: #2c2520; color: #faf8f5; font-family: sans-serif; font-size: 11px; letter-spacing: 0.2em; text-transform: uppercase; padding: 14px 28px; text-decoration: none;">
            Se opskrifter
          </a>
          <p style="font-size: 11px; color: #c4b8b2; margin-top: 48px; line-height: 1.6;">
            Du modtager denne e-mail fordi du tilmeldte dig på stitchofcare.dk.<br>
            <a href="https://stitch-of-care.vercel.app" style="color: #9a8d85;">Afmeld</a>
          </p>
        </div>
      `,
    });

    // Notify yourself
    await resend.emails.send({
      from: "Stitch of Care <hej@konvertio.dk>",
      to: "frederik@konvertio.dk",
      subject: `Ny tilmelding: ${email}`,
      html: `<p>Ny nyhedsbrevstilmelding: <strong>${email}</strong></p>`,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Resend error:", err);
    return NextResponse.json({ error: "Der skete en fejl" }, { status: 500 });
  }
}
