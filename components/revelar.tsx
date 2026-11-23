"use client";

import { useEffect, useRef, type ReactNode } from "react";

/**
 * Arma la animación de un bloque de datos para cuando entra en la vista.
 *
 * Sólo marca `pendiente` lo que arranca fuera de la pantalla: lo que ya se ve
 * al hidratar se queda como vino del servidor, porque volverlo a cero sería un
 * parpadeo. Los estados visuales viven en globals.css.
 */
export function Revelar({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const bloque = ref.current;
    if (!bloque || !("IntersectionObserver" in window)) return;
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const { top, bottom } = bloque.getBoundingClientRect();
    if (top < innerHeight && bottom > 0) return;

    bloque.dataset.revelar = "pendiente";
    const observador = new IntersectionObserver(
      ([entrada]) => {
        if (!entrada.isIntersecting) return;
        bloque.dataset.revelar = "listo";
        observador.disconnect();
      },
      { threshold: 0.35 },
    );
    observador.observe(bloque);
    return () => observador.disconnect();
  }, []);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
