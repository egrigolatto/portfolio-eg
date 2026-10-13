import { ImageResponse } from "next/og";

export const alt = "Emanuel Grigolatto — Full Stack Developer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          alignItems: "flex-start",
          backgroundColor: "#081425",
          display: "flex",
          flexDirection: "column",
          height: "100%",
          justifyContent: "center",
          padding: "96px",
          width: "100%",
        }}
      >
        <div
          style={{
            color: "#d8e3fb",
            fontSize: 96,
            fontWeight: 700,
            letterSpacing: -2,
            lineHeight: 1.1,
          }}
        >
          Emanuel Grigolatto
        </div>
        <div
          style={{
            color: "#c3c0ff",
            fontSize: 48,
            fontWeight: 300,
            marginTop: 24,
          }}
        >
          Full Stack Developer
        </div>
        <div
          style={{
            backgroundColor: "#464555",
            height: 1,
            marginTop: 64,
            opacity: 0.5,
            width: "100%",
          }}
        />
      </div>
    ),
    size,
  );
}
