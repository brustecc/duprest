import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

const rutas = ["/", "/no-existe"];

/**
 * axe detecta alrededor del 40% de los problemas de accesibilidad reales: los
 * que son verificables sin criterio humano (contraste, roles, nombres
 * accesibles, orden de encabezados). Que esto pase en verde no quiere decir que
 * el sitio sea accesible; quiere decir que no tiene los errores obvios.
 *
 * Lo que axe no ve —si el foco va a donde tiene que ir, si se puede usar todo
 * sin mouse— se prueba abajo a mano.
 */
for (const ruta of rutas) {
  test(`sin violaciones de accesibilidad en ${ruta}`, async ({ page }) => {
    await page.goto(ruta);

    const { violations } = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
      .analyze();

    // El default de Playwright corta el objeto y no se ve qué falló.
    expect(
      violations.map((v) => ({
        regla: v.id,
        impacto: v.impact,
        donde: v.nodes.map((n) => n.target.join(" ")),
      })),
    ).toEqual([]);
  });
}

// El informe no tiene un solo elemento interactivo; el 404 sí, y el estilo de
// foco es el mismo para todo el sitio.
test("se puede navegar con el teclado", async ({ page }) => {
  await page.goto("/no-existe");

  await page.keyboard.press("Tab");

  const enfocado = page.locator(":focus");
  await expect(enfocado).toBeVisible();

  // Un outline en 0 sin reemplazo deja al que navega con teclado sin saber
  // dónde está parado.
  const contorno = await enfocado.evaluate((el) => {
    const s = getComputedStyle(el);
    return {
      outline: s.outlineStyle !== "none" && parseFloat(s.outlineWidth) > 0,
      sombra: s.boxShadow !== "none",
    };
  });

  expect(contorno.outline || contorno.sombra).toBe(true);
});

test("respeta prefers-reduced-motion", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");

  const animado = await page.evaluate(() =>
    [...document.querySelectorAll("*")].filter((el) => {
      const s = getComputedStyle(el);
      const dur = parseFloat(s.animationDuration) + parseFloat(s.transitionDuration);
      return dur > 0.1;
    }).length,
  );

  expect(animado).toBe(0);
});
