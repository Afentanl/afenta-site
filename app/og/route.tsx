import { ImageResponse } from "next/og";
export const runtime = "edge";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const title = searchParams.get("title") ?? "Afenta";
  return new ImageResponse(
    (
      <div style={{
        width: "1200px", height: "630px",
        display: "flex", alignItems: "center", justifyContent: "center",
        background: "linear-gradient(90deg,#7c3aed,#f0abfc,#facc15)"
      }}>
        <div style={{
          fontSize: 64, fontWeight: 800, color: "#0b0b0b",
          background: "white", padding: "24px 32px", borderRadius: 16,
          boxShadow: "0 18px 50px rgba(0,0,0,.25)"
        }}>
          {title}
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
