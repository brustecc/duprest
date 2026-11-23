import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { pie, portada, prevencion } from "@/contenido/informe";

export const alt =
  "DupreST: un servidor sin parchear pone US$ 25 M en juego para YPF. Escenario ilustrativo: no representa datos reales de YPF.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Satori no lee woff2, que es lo que sirve next/font: por eso los TTF van aparte.
const carpeta = join(process.cwd(), "lib/fuentes-og");
const [spectral, franklin] = await Promise.all([
  readFile(join(carpeta, "spectral-bold.ttf")),
  readFile(join(carpeta, "libre-franklin.ttf")),
]);

// Los mismos valores que los tokens de globals.css: Satori no lee variables CSS.
const papel = "#f3f3ef";
const tinta = "#1b211e";
const tintaSuave = "#4b534e";
const regla = "#d5d4cc";
const firma = "#0d5247";
const alarma = "#9e3a2c";

export default function ImagenOG() {
  const { cifra } = portada;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          padding: "64px 80px",
          background: papel,
          color: tinta,
          fontFamily: "Franklin",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            paddingBottom: 18,
            borderBottom: `3px solid ${tinta}`,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            {/* El mismo trazado que components/logo.tsx. */}
            <svg width={40} height={42} viewBox="8 6 34 36">
              <path
                fill={firma}
                fillRule="evenodd"
                d="M8 6h16a18 18 0 0 1 0 36H8zM24 14.5a5.5 5.5 0 0 0-3 10.1L19 33h10l-2-8.4a5.5 5.5 0 0 0-3-10.1z"
              />
            </svg>
            <span style={{ fontFamily: "Spectral", fontSize: 44 }}>{portada.marca}</span>
          </div>
          {/* Satori no alinea por línea base: el margen compensa la diferencia de descendentes. */}
          <span
            style={{
              marginBottom: 8,
              fontSize: 19,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: tintaSuave,
            }}
          >
            {portada.tipo}
          </span>
        </div>
        <div style={{ display: "flex", gap: 28, marginTop: 18, fontSize: 24, color: tintaSuave }}>
          {portada.ficha.map((f) => (
            <span key={f.rotulo}>{`${f.rotulo}: ${f.valor}`}</span>
          ))}
        </div>

        <span
          style={{
            marginTop: "auto",
            fontFamily: "Spectral",
            fontSize: 190,
            lineHeight: 0.85,
            letterSpacing: "-0.02em",
            color: alarma,
          }}
        >
          {`${cifra.prefijo}${cifra.valor}${cifra.sufijo}`}
        </span>
        <span style={{ marginTop: 22, fontSize: 32, color: tintaSuave }}>
          en juego por un servidor sin parchear.
        </span>
        <span style={{ fontSize: 32, color: firma }}>{`Cerrarlo cuesta ${prevencion.prevenir.texto}.`}</span>

        <span
          style={{
            marginTop: 36,
            paddingTop: 18,
            borderTop: `2px solid ${regla}`,
            fontSize: 23,
            color: tintaSuave,
          }}
        >
          {pie.aviso}
        </span>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Spectral", data: spectral, weight: 700, style: "normal" },
        { name: "Franklin", data: franklin, weight: 400, style: "normal" },
      ],
    },
  );
}
