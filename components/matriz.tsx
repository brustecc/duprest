import { Fragment, type CSSProperties } from "react";
import { Revelar } from "@/components/revelar";
import type { Banda, Escenario, Nivel } from "@/contenido/informe";

const fondoBanda: Record<Banda, string> = {
  baja: "bg-banda-baja",
  media: "bg-banda-media",
  alta: "bg-banda-alta",
  critica: "bg-banda-critica",
};

const fondoNivel: Record<Nivel, string> = {
  probable: "bg-probable",
  grave: "bg-grave",
  catastrofico: "bg-catastrofico",
};

// Riesgo = probabilidad × impacto, con los cortes habituales de una matriz de 5×5.
function banda(probabilidad: number, impacto: number): Banda {
  const riesgo = probabilidad * impacto;
  if (riesgo <= 3) return "baja";
  if (riesgo <= 6) return "media";
  if (riesgo <= 10) return "alta";
  return "critica";
}

const FILAS = [5, 4, 3, 2, 1];
const COLUMNAS = [1, 2, 3, 4, 5];

type Props = {
  niveles: Escenario[];
  probabilidad: string[];
  impacto: string[];
  bandas: { id: Banda; nombre: string }[];
};

export function Matriz({ niveles, probabilidad, impacto, bandas }: Props) {
  const nombreBanda = Object.fromEntries(bandas.map((b) => [b.id, b.nombre.toLowerCase()]));
  const descripcion =
    "Matriz de riesgo de cinco por cinco. " +
    niveles
      .map(({ rotulo, posicion: { probabilidad: p, impacto: i } }) =>
        `${rotulo}: probabilidad ${probabilidad[p - 1].toLowerCase()} e impacto ${impacto[i - 1].toLowerCase()}, ${nombreBanda[banda(p, i)]}`,
      )
      .join(". ") +
    ".";

  return (
    <Revelar>
      <figure>
        <div role="img" aria-label={descripcion}>
          <p className="mb-2 text-mini font-semibold tracking-[0.12em] text-nota uppercase">Impacto ↑</p>
          <div className="grid grid-cols-[auto_repeat(5,minmax(0,1fr))] gap-0.5">
            {FILAS.map((i) => (
              <Fragment key={i}>
                <span className="self-center pr-2 text-right text-mini leading-tight text-nota">
                  {impacto[i - 1]}
                </span>
                {COLUMNAS.map((p) => (
                  <span key={p} className={`relative aspect-square ${fondoBanda[banda(p, i)]}`}>
                    {niveles
                      .filter((n) => n.posicion.probabilidad === p && n.posicion.impacto === i)
                      .map((n) => (
                        <span
                          key={n.id}
                          className="marca absolute inset-0 z-10"
                          style={{ "--orden": niveles.indexOf(n) } as CSSProperties}
                        >
                          <span
                            className={`punto absolute top-1/2 left-1/2 size-4 -translate-x-1/2 -translate-y-1/2 border-2 border-papel ${fondoNivel[n.id]}`}
                          />
                          <span className="absolute top-1/2 left-[calc(50%+0.75rem)] -translate-y-1/2 text-chica font-semibold whitespace-nowrap text-tinta">
                            {n.rotulo}
                          </span>
                        </span>
                      ))}
                  </span>
                ))}
              </Fragment>
            ))}
            <span />
            {COLUMNAS.map((p) => (
              <span key={p} className="pt-2 text-center text-mini leading-tight text-nota">
                {probabilidad[p - 1]}
              </span>
            ))}
          </div>
          <p className="mt-2 text-center text-mini font-semibold tracking-[0.12em] text-nota uppercase">
            Probabilidad →
          </p>
        </div>
        <figcaption>
          <ul className="mt-5 flex flex-wrap gap-x-5 gap-y-1.5 text-chica text-tinta-suave">
            {bandas.map((b) => (
              <li key={b.id} className="flex items-center gap-2">
                <span aria-hidden className={`size-2.5 ${fondoBanda[b.id]}`} />
                {b.nombre}
              </li>
            ))}
          </ul>
        </figcaption>
      </figure>
    </Revelar>
  );
}
