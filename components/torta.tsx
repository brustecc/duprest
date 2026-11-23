import type { CSSProperties } from "react";
import { Revelar } from "@/components/revelar";
import type { Parte } from "@/contenido/informe";

const RADIO = 78;
const GROSOR = 24;
const CIRCUNFERENCIA = 2 * Math.PI * RADIO;
// Unos dos píxeles entre sectores vecinos, a la escala en que se muestra.
const HUECO = 2.4;

const trazo: Record<Parte, string> = {
  parada: "stroke-parada",
  reputacion: "stroke-reputacion",
  propiedad: "stroke-propiedad",
  multas: "stroke-multas",
  respuesta: "stroke-respuesta",
};

const muestra: Record<Parte, string> = {
  parada: "bg-parada",
  reputacion: "bg-reputacion",
  propiedad: "bg-propiedad",
  multas: "bg-multas",
  respuesta: "bg-respuesta",
};

type Props = {
  total: string;
  partes: { id: Parte; nombre: string; porcentaje: number }[];
};

export function Torta({ total, partes }: Props) {
  const sectores = partes.map((parte, i) => {
    const previo = partes.slice(0, i).reduce((suma, p) => suma + p.porcentaje, 0);
    return {
      ...parte,
      desde: (CIRCUNFERENCIA * previo) / 100,
      largo: (CIRCUNFERENCIA * parte.porcentaje) / 100 - HUECO,
    };
  });
  const mayor = partes.reduce((a, b) => (b.porcentaje > a.porcentaje ? b : a));

  return (
    <Revelar className="mt-8 flex flex-wrap items-center gap-x-12 gap-y-7">
      <div className="relative size-48 shrink-0">
        <svg
          viewBox="0 0 220 220"
          className="size-full -rotate-90"
          role="img"
          aria-label={`Torta del impacto: ${mayor.nombre.toLowerCase()} concentra el ${mayor.porcentaje} % de la pérdida`}
        >
          <defs>
            {/* La máscara barre la torta entera de una vez, con una sola curva. */}
            <mask id="torta-mascara">
              <circle
                className="torta-mascara"
                cx="110"
                cy="110"
                r={RADIO}
                fill="none"
                stroke="#fff"
                strokeWidth={GROSOR + 4}
                strokeDasharray={`${CIRCUNFERENCIA} ${CIRCUNFERENCIA}`}
                style={{ "--circunferencia": `${CIRCUNFERENCIA}px` } as CSSProperties}
              />
            </mask>
          </defs>
          <circle cx="110" cy="110" r={RADIO} fill="none" strokeWidth={GROSOR} className="stroke-pliego" />
          <g mask="url(#torta-mascara)">
            {sectores.map((sector) => (
              <circle
                key={sector.id}
                cx="110"
                cy="110"
                r={RADIO}
                fill="none"
                strokeWidth={GROSOR}
                strokeDasharray={`${sector.largo} ${CIRCUNFERENCIA}`}
                strokeDashoffset={-sector.desde}
                className={trazo[sector.id]}
              />
            ))}
          </g>
        </svg>
        <p className="absolute inset-0 grid place-content-center font-serif text-media font-bold tabular-nums">
          {total}
        </p>
      </div>

      <ul className="grid max-w-md min-w-60 flex-1 gap-2.5">
        {partes.map((parte) => (
          <li
            key={parte.id}
            className="flex items-center gap-3 border-b border-regla-suave pb-2.5 text-tinta-suave"
          >
            <span aria-hidden className={`size-2.5 shrink-0 ${muestra[parte.id]}`} />
            <span>{parte.nombre}</span>
            <span className="ml-auto font-serif font-semibold text-tinta tabular-nums">
              {parte.porcentaje}&nbsp;%
            </span>
          </li>
        ))}
      </ul>
    </Revelar>
  );
}
