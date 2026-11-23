"use client";

export default function ErrorInforme({ retry }: { error: unknown; retry: () => void }) {
  return (
    <main className="mx-auto max-w-informe px-6 py-seccion">
      <p className="border-b-[1.5px] border-tinta pb-3.5 font-serif text-media font-bold">DupreST</p>
      <h1 className="mt-10 font-serif text-titular font-semibold text-balance">
        El informe no se pudo mostrar.
      </h1>
      <p className="mt-4 text-tinta-suave">Puede ser un corte momentáneo de la conexión.</p>
      <button
        type="button"
        onClick={retry}
        className="mt-6 cursor-pointer font-semibold text-firma underline underline-offset-4"
      >
        Reintentar
      </button>
    </main>
  );
}
