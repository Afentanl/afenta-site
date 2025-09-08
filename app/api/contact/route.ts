/* app/api/contact/route.ts */
import { NextResponse } from "next/server";

// export const runtime = "edge"; // si te da guerra en dev, déjalo comentado

export async function POST(req: Request) {
    try {
    const body = await req.json();
    const { name, email, message } = body || {};

    if (!name || !email || !message) {
        return NextResponse.json({ ok: false, error: "Missing fields" }, { status: 400 });
    }

    // TODO: integra Email/CRM (Resend/Sendgrid/etc.)
    return NextResponse.json({ ok: true });
    } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
    }
}

export function GET() {
    return NextResponse.json({ ok: true });
}
