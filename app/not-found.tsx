import Link from "next/link";
import { Logo } from "@/components/logo";

export default function NoEncontrada() {
  return (
    <main className="mx-auto flex min-h-dvh max-w-informe flex-col px-6 pt-[clamp(1.875rem,1.4rem+2.4vw,3rem)]">
      <p className="flex items-center gap-2.5 border-b-[1.5px] border-tinta pb-3.5 font-serif text-media font-bold">
        <Logo className="h-7 w-auto text-firma" />
        DupreST
      </p>
      <h1 className="mt-10 font-serif text-titular font-semibold text-balance">
        Esta página no está en el informe.
      </h1>
      <p className="mt-4 text-tinta-suave">La dirección no existe o cambió.</p>
      <Link href="/" className="mt-6 self-start font-semibold text-firma underline underline-offset-4">
        Volver al informe
      </Link>
    </main>
  );
}
