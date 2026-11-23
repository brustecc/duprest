/**
 * URL pública del sitio, con fallback en cascada.
 *
 * 1. `NEXT_PUBLIC_SITE_URL` — se define a mano y gana siempre. Es la que hay que
 *    usar si algún día hay dominio propio.
 * 2. `VERCEL_PROJECT_PRODUCTION_URL` — la inyecta Vercel sola en cada build y
 *    apunta al dominio de producción del proyecto, el `.vercel.app` mientras no
 *    haya otro.
 * 3. localhost, para desarrollo.
 *
 * Ojo: `VERCEL_URL` NO sirve acá — es el host efímero de cada deploy, así que
 * como URL canónica en el sitemap y los metadatos sería peor que no tener nada.
 */
function resolver(): string {
  const explicita = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (explicita) return explicita.replace(/\/$/, "");

  const vercel = process.env.VERCEL_PROJECT_PRODUCTION_URL?.trim();
  if (vercel) return `https://${vercel.replace(/\/$/, "")}`;

  return `http://localhost:${process.env.PORT ?? 3000}`;
}

export const urlSitio = resolver();

export function urlAbsoluta(ruta: string): string {
  return new URL(ruta, urlSitio).toString();
}
