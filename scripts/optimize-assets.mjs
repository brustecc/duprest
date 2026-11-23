import { mkdir, readdir, stat } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

/**
 * Pasa los originales de `assets-raw/` a webp en `public/`.
 *
 * Los originales quedan afuera del repo (están en .gitignore): no los necesita
 * nadie que clone el proyecto. Lo que se versiona es el resultado optimizado,
 * que es lo que se sirve.
 *
 * Corre a mano con `npm run assets`, no en cada build: las imágenes cambian una
 * vez cada tanto y convertirlas es caro.
 */

const ORIGEN = "assets-raw";
const DESTINO = "public";
// La tapa va a pantalla completa: next/image la achica para cada pantalla, pero
// necesita un original que alcance para un monitor grande.
const ANCHO_MAXIMO = 2400;
const CALIDAD = 82;

const EXTENSIONES = new Set([".jpg", ".jpeg", ".png", ".webp", ".tif", ".tiff"]);

async function* recorrer(dir) {
  for (const entrada of await readdir(dir, { withFileTypes: true })) {
    const completo = path.join(dir, entrada.name);
    if (entrada.isDirectory()) yield* recorrer(completo);
    else yield completo;
  }
}

function aSlug(nombre) {
  return nombre
    .normalize("NFD")
    // NFD separa los diacríticos en su propio code point y este rango los
    // borra: "Ñandú" queda "nandu" y no "n-and-".
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

let convertidos = 0;
let omitidos = 0;
let bytesAntes = 0;
let bytesDespues = 0;

for await (const archivo of recorrer(ORIGEN)) {
  const ext = path.extname(archivo).toLowerCase();
  if (!EXTENSIONES.has(ext)) continue;

  const relativo = path.relative(ORIGEN, archivo);
  const carpeta = path.join(DESTINO, path.dirname(relativo));
  const destino = path.join(carpeta, `${aSlug(path.basename(archivo, ext))}.webp`);

  const original = await stat(archivo);

  // Si el webp ya existe y es más nuevo que el original, no hay nada que hacer.
  try {
    const existente = await stat(destino);
    if (existente.mtimeMs >= original.mtimeMs) {
      omitidos++;
      continue;
    }
  } catch {
    // No existe todavía: se convierte.
  }

  await mkdir(carpeta, { recursive: true });

  await sharp(archivo)
    .rotate() // respeta la orientación EXIF antes de redimensionar
    .resize({ width: ANCHO_MAXIMO, withoutEnlargement: true })
    // Toda foto del informe va en blanco y negro: así entra en la paleta de
    // papel y tinta sin importar los colores con que vino.
    .grayscale()
    .webp({ quality: CALIDAD })
    .toFile(destino);

  const salida = await stat(destino);
  bytesAntes += original.size;
  bytesDespues += salida.size;
  convertidos++;

  console.log(
    `${relativo} → ${path.relative(DESTINO, destino)}  ` +
      `${(original.size / 1024).toFixed(0)} kB → ${(salida.size / 1024).toFixed(0)} kB`,
  );
}

const ahorro = bytesAntes > 0 ? (1 - bytesDespues / bytesAntes) * 100 : 0;

console.log(
  `\n${convertidos} convertidas, ${omitidos} ya estaban al día.` +
    (convertidos > 0 ? ` ${ahorro.toFixed(0)}% menos de peso.` : ""),
);
