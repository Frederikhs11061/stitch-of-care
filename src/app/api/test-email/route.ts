import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function GET() {
  try {
    const result = await resend.emails.send({
      from: "Stitch of Care <onboarding@resend.dev>",
      to: "frederik.hs@live.dk",
      subject: "Test mail fra Stitch of Care",
      html: "<p>Det virker!</p>",
    });

    return NextResponse.json({ ok: true, result });
  } catch (err) {
    return NextResponse.json({ ok: false, error: String(err) });
  }
}
