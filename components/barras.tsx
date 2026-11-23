import { Revelar } from "@/components/revelar";

type Barra = { rotulo: string; monto: number; texto: string };

export function Barras({ prevenir, sufrir }: { prevenir: Barra; sufrir: Barra }) {
  const tope = Math.max(prevenir.monto, sufrir.monto);
  const filas = [
    { ...prevenir, tinta: "text-firma", relleno: "bg-firma" },
    { ...sufrir, tinta: "text-alarma", relleno: "bg-alarma" },
  ];

  return (
    <Revelar className="mt-7 flex flex-col gap-5">
      {filas.map((fila) => (
        <div key={fila.rotulo}>
          <p className="mb-2 flex items-baseline justify-between gap-4">
            <span className="font-medium">{fila.rotulo}</span>
            <span className={`font-serif text-media font-bold whitespace-nowrap tabular-nums ${fila.tinta}`}>
              {fila.texto}
            </span>
          </p>
          <div aria-hidden className="h-5.5 bg-pliego">
            {/* A escala real: 50 k contra 25 M es un 0,2 %, apenas una raya. Ese contraste es el argumento. */}
            <div
              className={`barra h-full ${fila.relleno}`}
              style={{ width: `max(2px, ${(fila.monto / tope) * 100}%)` }}
            />
          </div>
        </div>
      ))}
    </Revelar>
  );
}
