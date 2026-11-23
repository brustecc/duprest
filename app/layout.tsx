import type { Metadata } from "next";
import { Libre_Franklin, Spectral } from "next/font/google";
import { urlSitio } from "@/lib/site-url";
import "./globals.css";

const spectral = Spectral({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-spectral",
});

// La itálica va aparte para no bajar seis archivos cuando se usan dos pesos.
const spectralItalica = Spectral({
  subsets: ["latin"],
  weight: ["400", "600"],
  style: "italic",
  variable: "--font-spectral-italica",
});

const franklin = Libre_Franklin({
  subsets: ["latin"],
  variable: "--font-franklin",
});

const titulo = "DupreST · Evaluación de riesgo de ciberseguridad para YPF";
const descripcion =
  "Un servidor sin parchear pone en juego US$ 25 M de la operación de campo; cerrarlo cuesta US$ 50 k. " +
  "Escenario ilustrativo basado en benchmarks de la industria: no representa datos reales de YPF.";

export const metadata: Metadata = {
  metadataBase: new URL(urlSitio),
  title: titulo,
  description: descripcion,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "es_AR",
    siteName: "DupreST",
    title: titulo,
    description: descripcion,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="es"
      className={`${spectral.variable} ${spectralItalica.variable} ${franklin.variable}`}
    >
      <body className="bg-papel font-sans text-tinta antialiased">{children}</body>
    </html>
  );
}
