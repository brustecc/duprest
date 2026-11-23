import type { ReactNode } from "react";

export function Seccion({
  numero,
  rotulo,
  children,
}: {
  numero: number;
  rotulo: string;
  children: ReactNode;
}) {
  return (
    <section className="border-t border-regla py-seccion">
      <div className="mx-auto max-w-informe px-6">
        <p className="mb-3 flex items-baseline gap-3">
          <span className="font-serif-italica text-nota italic">{numero}</span>
          <span className="text-mini font-semibold tracking-[0.14em] text-tinta-suave uppercase">
            {rotulo}
          </span>
        </p>
        {children}
      </div>
    </section>
  );
}
