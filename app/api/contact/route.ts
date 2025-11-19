// app/api/contact/route.ts
import { NextResponse } from "next/server";

type LeadPayload = {
  name: string;
  email: string;
  budget?: string;
  message: string;
  services?: string;
  startWhen?: string;
  company?: string;   // honeypot
  _elapsed?: string;  // ms rellenados en el cliente
};

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
function minLen(s: string, n: number) {
  return (s ?? "").trim().length >= n;
}

export async function POST(req: Request) {
  try {
    const data = (await req.json()) as Partial<LeadPayload>;

    // validación básica
    if (
      !data ||
      !minLen(data.name ?? "", 2) ||
      !isValidEmail(data.email ?? "") ||
      !minLen(data.message ?? "", 4)
    ) {
      return NextResponse.json(
        { ok: false, error: "invalid_payload" },
        { status: 400 }
      );
    }

    // honeypot
    if ((data.company ?? "").trim() !== "") {
      return NextResponse.json({ ok: true });
    }

    // anti-spam por tiempo (bájalo o comenta si molesta)
    const elapsed = Number(data._elapsed ?? "0");
    if (!Number.isNaN(elapsed) && elapsed < 5000) {
      return NextResponse.json(
        { ok: false, error: "too_fast" },
        { status: 400 }
      );
    }

    const text = [
      `Name: ${data.name}`,
      `Email: ${data.email}`,
      `Budget: ${data.budget || "-"}`,
      `Services: ${data.services || "-"}`,
      `Start: ${data.startWhen || "-"}`,
      "",
      "Message:",
      data.message,
    ].join("\n");

    const key = process.env.RESEND_API_KEY;
    const to = (process.env.CONTACT_TO || "info@afenta.com")
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);

    const from = process.env.RESEND_FROM || "Afenta <onboarding@resend.dev>";

    if (!key) {
      console.error("Missing RESEND_API_KEY, cannot send email");
      console.log("[LEAD_NO_EMAIL]", text);
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
          reply_to: data.email,
          subject: `New lead — ${data.name}`,
          text,
        }),
      });

      if (res.ok) {
        sent = true;
      } else {
        console.error("Resend HTTP error:", await res.text());
      }
    } catch (e) {
      console.error("Resend HTTP exception:", e);
    }

    if (!sent) {
      return NextResponse.json(
        { ok: false, error: "email_failed" },
        { status: 500 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { ok: false, error: "server_error" },
      { status: 500 }
    );
  }
}
