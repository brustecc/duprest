"use client";

import { useEffect, useRef, useState } from "react";

const DURACION = 1300;

type Props = {
  valor: number;
  decimales?: number;
  prefijo?: string;
  sufijo?: string;
};

/**
 * Cifra con count-up al entrar en la vista.
 *
 * El servidor la renderiza con el valor final, así que sin JS, en una captura
 * o con reduced-motion se lee entera. `data-cifra` vacío la esconde hasta que
 * arranca la cuenta (ver globals.css); se marca `lista` directo en el DOM y no
 * con estado, porque React no vuelve a tocar un atributo que no cambió.
 */
export function Cifra({ valor, decimales = 0, prefijo = "", sufijo = "" }: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const [mostrado, setMostrado] = useState(valor);

  useEffect(() => {
    const cifra = ref.current;
    if (!cifra) return;
    if (!("IntersectionObserver" in window)) {
      cifra.dataset.cifra = "lista";
      return;
    }
    // Con reduced-motion la cifra nunca se escondió: se queda como está.
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let cuadro = 0;
    const observador = new IntersectionObserver(
      ([entrada]) => {
        if (!entrada.isIntersecting) return;
        observador.disconnect();
        const inicio = performance.now();
        const avanzar = (ahora: number) => {
          const avance = Math.min((ahora - inicio) / DURACION, 1);
          setMostrado(valor * (1 - (1 - avance) ** 3));
          if (avance < 1) cuadro = requestAnimationFrame(avanzar);
        };
        setMostrado(0);
        cifra.dataset.cifra = "lista";
        cuadro = requestAnimationFrame(avanzar);
      },
      { threshold: 0.4 },
    );
    observador.observe(cifra);
    return () => {
      observador.disconnect();
      cancelAnimationFrame(cuadro);
    };
  }, [valor]);

  const formato = new Intl.NumberFormat("es-AR", {
    minimumFractionDigits: decimales,
    maximumFractionDigits: decimales,
  });

  return (
    <span ref={ref} data-cifra="">
      {prefijo}
      {formato.format(mostrado)}
      {sufijo}
    </span>
  );
}
