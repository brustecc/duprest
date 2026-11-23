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

    // Dos tiempos: se pone en cero un poco antes de entrar en la vista, para
    // que nadie vea el salto del valor final a cero, y cuenta recién al entrar.
    let cuadro = 0;
    let lista = false;
    const preparar = () => {
      if (lista) return;
      lista = true;
      setMostrado(0);
      cifra.dataset.cifra = "lista";
    };
    const previo = new IntersectionObserver(
      ([entrada]) => {
        if (!entrada.isIntersecting) return;
        previo.disconnect();
        preparar();
      },
      { rootMargin: "0px 0px 40% 0px" },
    );
    const visible = new IntersectionObserver(
      ([entrada]) => {
        if (!entrada.isIntersecting) return;
        visible.disconnect();
        previo.disconnect();
        preparar();
        const inicio = performance.now();
        const avanzar = (ahora: number) => {
          const avance = Math.min((ahora - inicio) / DURACION, 1);
          setMostrado(valor * (1 - (1 - avance) ** 3));
          if (avance < 1) cuadro = requestAnimationFrame(avanzar);
        };
        cuadro = requestAnimationFrame(avanzar);
      },
      { rootMargin: "0px 0px -15% 0px" },
    );
    previo.observe(cifra);
    visible.observe(cifra);
    return () => {
      previo.disconnect();
      visible.disconnect();
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
