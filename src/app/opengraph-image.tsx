import { ImageResponse } from "next/og";

export const alt = "Dakshina Learnings — Every Officer Begins With A Question.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: 72, background: "linear-gradient(135deg,#101C2C 0%,#16253a 60%,#244C76 100%)", color: "#F5F0E6", fontFamily: "Georgia, serif" }}>
        <div style={{ fontSize: 22, letterSpacing: 6, color: "#B79A62", fontFamily: "monospace" }}>DAKSHINA LEARNINGS · CIVIL SERVICES ACADEMY</div>
        <div style={{ display: "flex", flexDirection: "column", fontSize: 92, lineHeight: 1 }}>
          <span>Every Officer</span>
          <span>Begins With</span>
          <span style={{ color: "#D4BF8F", fontStyle: "italic" }}>A Question.</span>
        </div>
        <div style={{ fontSize: 24, color: "rgba(245,240,230,0.7)" }}>UPSC preparation · Thiruvananthapuram, Kerala</div>
      </div>
    ),
    size,
  );
}
