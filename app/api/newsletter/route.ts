// app/api/newsletter/route.ts
import { NextResponse } from "next/server";

type NewsletterPayload = {
  email: string;
};

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as Partial<NewsletterPayload>;
    const email = (body.email || "").trim();

    if (!email || !isValidEmail(email)) {
      return NextResponse.json(
        { ok: false, error: "invalid_email" },
        { status: 400 }
      );
    }

    const key = process.env.RESEND_API_KEY;
    const to = (process.env.NEWSLETTER_TO || process.env.CONTACT_TO || "wilmrt12@gmail.com")
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);
    const from = process.env.RESEND_FROM || "Afenta <onboarding@resend.dev>";

    if (!key) {
      console.error("Missing RESEND_API_KEY for newsletter");
      return NextResponse.json(
        { ok: false, error: "email_not_configured" },
        { status: 500 }
      );
    }

    let sent = false;

    try {
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${key}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from,
          to,
          subject: "New newsletter subscriber",
          text: `New newsletter subscriber:\n${email}`,
        }),
      });

      if (res.ok) {
        sent = true;
      } else {
        console.error("Resend newsletter HTTP error:", await res.text());
      }
    } catch (err) {
      console.error("Resend newsletter exception:", err);
    }

    if (!sent) {
      return NextResponse.json(
        { ok: false, error: "email_failed" },
        { status: 500 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { ok: false, error: "server_error" },
      { status: 500 }
    );
  }
}
