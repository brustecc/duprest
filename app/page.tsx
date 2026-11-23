import Image from "next/image";
import { Fragment } from "react";
import { Barras } from "@/components/barras";
import { Cifra } from "@/components/cifra";
import { Logo } from "@/components/logo";
import { Matriz } from "@/components/matriz";
import { Seccion } from "@/components/seccion";
import { Torta } from "@/components/torta";
import {
  activo,
  escenarios,
  hallazgo,
  impacto,
  pie,
  portada,
  prevencion,
  propuesta,
  type Nivel,
} from "@/contenido/informe";

const contenedor = "mx-auto max-w-informe px-6";
const tituloSeccion = "font-serif text-seccion font-semibold tracking-[-0.01em] text-balance";
const rotuloMenor = "text-mini font-semibold tracking-[0.14em] text-nota uppercase";
// Filas de datos sin cajas: apiladas con reglas en el celular, en columnas con filetes desde sm.
const filaDato =
  "border-t border-regla-suave py-3 first:border-t-0 sm:border-t-0 sm:border-l sm:border-regla sm:px-5 sm:py-1 sm:first:border-l-0 sm:first:pl-0";

const bordeNivel: Record<Nivel, string> = {
  probable: "border-probable",
  grave: "border-grave",
  catastrofico: "border-catastrofico",
};

const tintaNivel: Record<Nivel, string> = {
  probable: "text-probable-texto",
  grave: "text-grave",
  catastrofico: "text-catastrofico",
};

// Cada parte va entera: «CVE-2021-41773» partido en el guion no se lee.
function Enumeracion({ partes }: { partes: string[] }) {
  return partes.map((parte, i) => (
    <Fragment key={parte}>
      {i > 0 && " · "}
      <span className="whitespace-nowrap">{parte}</span>
    </Fragment>
  ));
}

export default function Informe() {
  return (
    <>
      <header className="negativo relative isolate flex min-h-[88svh] flex-col">
        {/* La foto es ambiente: todo lo que dice la tapa está en el texto. */}
        <Image
          src="/tapa.webp"
          alt=""
          fill
          preload
          sizes="100vw"
          className="-z-20 object-cover object-[50%_35%]"
        />
        <div aria-hidden className="velo absolute inset-0 -z-10" />

        <div
          className={`${contenedor} flex flex-1 flex-col pt-[clamp(1.875rem,1.4rem+2.4vw,3rem)] pb-[clamp(2.5rem,1.6rem+4vw,4.5rem)]`}
        >
          <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2 border-b-[1.5px] border-tinta pb-3.5">
            <span className="flex items-center gap-2.5">
              <Logo className="h-7 w-auto" />
              <span className="font-serif text-media font-bold">{portada.marca}</span>
            </span>
            <span className="text-mini tracking-[0.12em] text-tinta-suave uppercase">{portada.tipo}</span>
          </div>

          <div className="mt-auto pt-20">
            <dl className="flex flex-wrap gap-x-6 gap-y-1 text-chica text-tinta-suave">
              {portada.ficha.map((f) => (
                <div key={f.rotulo} className="flex gap-1.5">
                  <dt className="font-semibold text-tinta">{f.rotulo}</dt>
                  <dd>{f.valor}</dd>
                </div>
              ))}
            </dl>
            <h1 className="mt-4 max-w-[20ch] font-serif text-tapa font-semibold tracking-[-0.01em] text-balance">
              {portada.titular.antes}
              <em className="font-serif-italica font-semibold text-firma">{portada.titular.enfasis}</em>
              {portada.titular.despues}
            </h1>
          </div>
        </div>
      </header>

      <main>
        <section id="resumen" className="py-seccion">
          <div className={contenedor}>
            <p className="mb-3 text-mini font-semibold tracking-[0.14em] text-tinta-suave uppercase">
              {portada.rotuloResumen}
            </p>
            <p className="max-w-[60ch] text-tinta-suave sm:text-media">{portada.bajada}</p>

            <div className="mt-10 flex flex-wrap items-end gap-x-5 gap-y-3 border-t border-regla pt-6">
              <p className="font-serif text-cifra font-bold tracking-[-0.02em] whitespace-nowrap text-alarma tabular-nums">
                <Cifra valor={portada.cifra.valor} prefijo={portada.cifra.prefijo} sufijo={portada.cifra.sufijo} />
              </p>
              <p className="max-w-[24ch] pb-2 text-tinta-suave">{portada.cifra.nota}</p>
            </div>

            <ul className="mt-7 grid sm:grid-cols-3">
              {portada.datos.map((dato) => (
                <li key={dato.nota} className={filaDato}>
                  <p className="font-serif text-dato font-semibold tabular-nums">
                    {dato.tipo === "cifra" ? (
                      <Cifra
                        valor={dato.valor}
                        decimales={dato.decimales}
                        prefijo={dato.prefijo}
                        sufijo={dato.sufijo}
                      />
                    ) : (
                      dato.texto
                    )}
                  </p>
                  <p className="mt-0.5 text-chica text-tinta-suave">{dato.nota}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <Seccion numero={1} rotulo={activo.rotulo}>
          <div className="grid items-start gap-x-14 gap-y-8 md:grid-cols-[1.05fr_0.95fr]">
            <div>
              <h2 className={tituloSeccion}>{activo.titulo}</h2>
              <p className="mt-3 max-w-[62ch] text-tinta-suave">{activo.texto}</p>
            </div>
            <div>
              <h3 className={`mb-2 ${rotuloMenor}`}>{activo.rotuloLista}</h3>
              <ul>
                {activo.expuesto.map((e) => (
                  <li key={e.nombre} className="border-b border-regla-suave py-3 first:border-t">
                    <p className="font-semibold">{e.nombre}</p>
                    <p className="text-chica text-tinta-suave">{e.detalle}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Seccion>

        <Seccion numero={2} rotulo={hallazgo.rotulo} className="negativo">
          <h2 className={tituloSeccion}>{hallazgo.titulo}</h2>
          <p className="mt-3 max-w-[62ch] text-tinta-suave">{hallazgo.texto}</p>
          <p className="mt-3 text-chica text-nota">
            <Enumeracion partes={hallazgo.tecnico} />
          </p>
          <ol className="mt-8 grid md:grid-cols-5">
            {hallazgo.pasos.map((paso, i) => (
              <li
                key={paso.momento}
                className="border-t border-regla py-3.5 first:border-t-0 first:pt-0 md:border-t-0 md:border-l md:px-4 md:py-0 md:first:border-l-0 md:first:pl-0"
              >
                <p
                  className={`font-serif-italica italic ${i === hallazgo.pasos.length - 1 ? "text-alarma" : "text-tinta"}`}
                >
                  {paso.momento}
                </p>
                <p className="mt-1.5 text-chica text-tinta-suave">{paso.hecho}</p>
              </li>
            ))}
          </ol>
        </Seccion>

        <Seccion numero={3} rotulo={escenarios.rotulo}>
          <h2 className={tituloSeccion}>{escenarios.titulo}</h2>
          <div className="mt-7 grid gap-x-8 gap-y-8 md:grid-cols-3">
            {escenarios.niveles.map((nivel) => (
              <div key={nivel.id} className={`border-t-[3px] pt-4 ${bordeNivel[nivel.id]}`}>
                <p className={`mb-2 text-mini font-semibold tracking-[0.12em] uppercase ${tintaNivel[nivel.id]}`}>
                  {nivel.rotulo}
                </p>
                <h3 className="font-serif text-media leading-snug font-semibold">{nivel.titulo}</h3>
                <p className="mt-2 mb-3.5 text-tinta-suave">{nivel.texto}</p>
                <p className={`font-serif text-grande font-bold tabular-nums ${tintaNivel[nivel.id]}`}>{nivel.monto}</p>
                <p className="mt-0.5 text-chica text-nota">{nivel.probabilidad}</p>
              </div>
            ))}
          </div>

          <div className="mt-14 grid items-start gap-x-14 gap-y-8 md:grid-cols-[0.9fr_1.1fr]">
            <div>
              <h3 className="font-serif text-grande leading-snug font-semibold">{escenarios.matriz.titulo}</h3>
              <p className="mt-3 max-w-[50ch] text-tinta-suave">{escenarios.matriz.texto}</p>
            </div>
            <Matriz
              niveles={escenarios.niveles}
              probabilidad={escenarios.matriz.probabilidad}
              impacto={escenarios.matriz.impacto}
              bandas={escenarios.matriz.bandas}
            />
          </div>
        </Seccion>

        <Seccion numero={4} rotulo={impacto.rotulo}>
          <h2 className={tituloSeccion}>{impacto.titulo}</h2>
          <p className="mt-3 max-w-[62ch] text-tinta-suave">{impacto.texto}</p>
          <Torta total={impacto.total} partes={impacto.partes} />
        </Seccion>

        <Seccion numero={5} rotulo={prevencion.rotulo}>
          <h2 className={tituloSeccion}>{prevencion.titulo}</h2>
          <Barras prevenir={prevencion.prevenir} sufrir={prevencion.sufrir} />
          <p className="mt-6 font-serif text-ratio font-bold tracking-[-0.01em] text-alarma tabular-nums">
            {prevencion.relacion}
          </p>
          <p className="mt-2 max-w-[62ch] text-tinta-suave">{prevencion.texto}</p>

          <h3 className={`mt-10 mb-3 ${rotuloMenor}`}>{prevencion.rotuloReferencias}</h3>
          <ul className="grid sm:grid-cols-3">
            {prevencion.referencias.map((r) => (
              <li key={r.texto} className={filaDato}>
                <p className="font-serif text-media font-semibold whitespace-nowrap tabular-nums">{r.cifra}</p>
                <p className="mt-0.5 text-chica text-tinta-suave">{r.texto}</p>
              </li>
            ))}
          </ul>
        </Seccion>

        <Seccion numero={6} rotulo={propuesta.rotulo}>
          <h2 className={tituloSeccion}>{propuesta.titulo}</h2>
          <ul className="mt-6">
            {propuesta.capas.map((capa) => (
              <li
                key={capa.nombre}
                className="border-b border-l-2 border-b-regla-suave border-l-firma py-3.5 pl-4.5"
              >
                <p className="font-semibold">{capa.nombre}</p>
                <p className="text-chica text-tinta-suave">{capa.detalle}</p>
              </li>
            ))}
          </ul>
        </Seccion>

        <section className="contratapa py-seccion">
          <div className={contenedor}>
            <p className="flex items-center gap-3">
              <Logo className="h-9 w-auto" />
              <span className="font-serif text-grande font-bold">{portada.marca}</span>
            </p>
            <p className="mt-10 max-w-[26ch] font-serif text-titular text-balance">{propuesta.cierre}</p>
            <p className="mt-6 text-media font-semibold">{propuesta.llamado}</p>
          </div>
        </section>
      </main>

      <footer className="contratapa border-t border-regla py-7 text-chica">
        <div className={contenedor}>
          <p className="text-tinta-suave">{pie.aviso}</p>
          <p className="mt-1.5 text-nota">
            <Enumeracion partes={pie.firma} />
          </p>
          <p className="mt-1.5 text-nota">
            Foto de tapa:{" "}
            <a href={pie.foto.perfil} className="underline underline-offset-2">
              {pie.foto.autor}
            </a>{" "}
            en{" "}
            <a href={pie.foto.sitio} className="underline underline-offset-2">
              {pie.foto.banco}
            </a>
            .
          </p>
        </div>
      </footer>
    </>
  );
}
