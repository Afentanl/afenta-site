import { NextResponse } from "next/server";

// export const runtime = "edge"; // opcional

type Payload = {
  name?: string;
  email?: string;
  budget?: string;
  message?: string;
};

const RESEND_API_KEY = process.env.RESEND_API_KEY || "";
const EMAIL_FROM = process.env.EMAIL_FROM || "Afenta <no-reply@afenta.com>";
const EMAIL_TO = process.env.EMAIL_TO || "";

/* --------- Validaciones sin zod --------- */
function isEmail(v: string) {
  // simple, suficiente para validar formato
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
}

function validate(p: Payload) {
  const errors: string[] = [];

  const name = (p.name || "").trim();
  const email = (p.email || "").trim();
  const message = (p.message || "").trim();
  const budget = (p.budget || "").trim();

  if (name.length < 2 || name.length > 100) errors.push("name");
  if (!isEmail(email)) errors.push("email");
  if (message.length < 10 || message.length > 5000) errors.push("message");
  if (budget && budget.length > 120) errors.push("budget");

  return { ok: errors.length === 0, errors, data: { name, email, message, budget } };
}

/* --------- Handlers --------- */
export async function POST(req: Request) {
  try {
    const body = (await req.json().catch(() => null)) as Payload | null;
    if (!body) return NextResponse.json({ ok: false, error: "Invalid JSON" }, { status: 400 });

    const v = validate(body);
    if (!v.ok) {
      return NextResponse.json({ ok: false, error: "Invalid fields", fields: v.errors }, { status: 400 });
    }

    const { name, email, message, budget } = v.data;

    // Si no hay claves → modo demo (no envía correo pero responde OK)
    if (!RESEND_API_KEY || !EMAIL_TO) {
      return NextResponse.json({ ok: true, demo: true });
    }

    // Envío vía Resend (sin librerías)
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: EMAIL_FROM,
        to: [EMAIL_TO],
        subject: `New contact — ${name}`,
        reply_to: email,
        text:
          `Name: ${name}\nEmail: ${email}\n` +
          (budget ? `Budget: ${budget}\n` : "") +
          `\n${message}`,
    }),
    });

    if (!res.ok) {
      const txt = await res.text();
      return NextResponse.json({ ok: false, error: txt || "Email send failed" }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false, error: "Unexpected error" }, { status: 500 });
  }
}

export function GET() {
  return NextResponse.json({ ok: true });
}
