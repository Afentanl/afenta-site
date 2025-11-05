// app/api/contact/route.ts
import { NextResponse } from "next/server";

// Tipado del payload que esperamos
type LeadPayload = {
  name: string;
  email: string;
  budget?: string;
  message: string;
  services?: string;
  startWhen?: string;
  // antispam
  company?: string;   // honeypot
  _elapsed?: string;  // ms rellenados en el cliente
};

// Validaciones mínimas sin zod (para compilar sin deps)
function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
function minLen(s: string, n: number) {
  return (s ?? "").trim().length >= n;
}

export async function POST(req: Request) {
  try {
    const data = (await req.json()) as Partial<LeadPayload>;

    // ---- validación básica
    if (!data || !minLen(data.name ?? "", 2) || !isValidEmail(data.email ?? "") || !minLen(data.message ?? "", 4)) {
      return NextResponse.json({ ok: false, error: "invalid_payload" }, { status: 400 });
    }

    // ---- antispam
    if ((data.company ?? "").trim() !== "") {
      // honeypot relleno → ignoramos en silencio
      return NextResponse.json({ ok: true });
    }
    const elapsed = Number(data._elapsed ?? "0");
    if (!Number.isNaN(elapsed) && elapsed < 5000) {
      return NextResponse.json({ ok: false, error: "too_fast" }, { status: 400 });
    }

    // ---- construimos el texto del mail/log
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

    // ---- Envío opcional vía API HTTP de Resend (sin SDK)
    // Si no configuras RESEND_API_KEY, simplemente haremos console.log
    const key = process.env.RESEND_API_KEY;
    const to = (process.env.CONTACT_TO || "you@example.com")
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);

    let sent = false;
    if (key) {
      try {
        const res = await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${key}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            from: "Afenta <no-reply@afenta.nl>",
            to,
            reply_to: data.email,
            subject: `New lead — ${data.name}`,
            text,
          }),
        });
        if (res.ok) sent = true;
        else console.error("Resend HTTP error:", await res.text());
      } catch (e) {
        console.error("Resend HTTP exception:", e);
      }
    }

    if (!sent) {
      console.log("[LEAD]", text);
    }

    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ ok: false, error: "server_error" }, { status: 500 });
  }
}
