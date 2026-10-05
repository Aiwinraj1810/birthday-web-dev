import { ImageResponse } from "next/og";
import { birthday } from "@/data/birthday";

// The link preview image. To use a real photo instead, delete this file and add
// app/opengraph-image.jpg (1200×630) — Next.js picks it up automatically.
export const alt = birthday.meta.title;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "0 110px",
          background: "linear-gradient(160deg, #fbefe1 0%, #f7d9bf 100%)",
          color: "#3a2b30",
          fontFamily: "serif",
        }}
      >
        <div style={{ fontSize: 26, letterSpacing: 10, textTransform: "uppercase", opacity: 0.6 }}>
          A small something
        </div>
        <div style={{ fontSize: 150, lineHeight: 1, marginTop: 28 }}>{birthday.meta.title}</div>
        <div style={{ fontSize: 44, fontStyle: "italic", marginTop: 28, color: "#cf5a3e" }}>
          {birthday.meta.description}
        </div>
      </div>
    ),
    size,
  );
}
