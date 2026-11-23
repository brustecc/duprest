import type { NextConfig } from "next";

/**
 * Content Security Policy.
 *
 * `script-src` lleva `'unsafe-inline'` y conviene saber por qué antes de
 * intentar sacarlo: el App Router inyecta scripts inline con los datos de React
 * Server Components, y su contenido cambia en cada build. Hashearlos es
 * inviable, y la alternativa —nonce por request— obliga a renderizar en cada
 * pedido y tira a la basura la página estática. Para un sitio sin sesiones ni
 * datos de usuario ese precio no se justifica.
 *
 * No hay un solo origen externo: next/font sirve las fuentes desde el propio
 * dominio y no hay analytics ni embeds. Si algún día aparece uno, se agrega
 * acá y en ningún otro lado.
 */
const csp = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline'",
  // Tailwind y los estilos críticos de Next van inline.
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob:",
  "font-src 'self'",
  "connect-src 'self'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  "upgrade-insecure-requests",
].join("; ");

const securityHeaders = [
  // Redundante con frame-ancestors, pero lo entienden navegadores viejos.
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
];

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },

  async headers() {
    const headers = [...securityHeaders];

    // CSP y HSTS sólo en producción: en dev el bundler usa eval y un websocket
    // de HMR que una CSP estricta bloquea.
    if (process.env.NODE_ENV === "production") {
      headers.push({ key: "Content-Security-Policy", value: csp });
      headers.push({
        key: "Strict-Transport-Security",
        value: "max-age=63072000; includeSubDomains; preload",
      });
    }

    return [{ source: "/:path*", headers }];
  },
};

export default nextConfig;
