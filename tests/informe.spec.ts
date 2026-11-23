import { test, expect } from "@playwright/test";

// Publicar números inventados con el nombre de YPF sólo se sostiene con este aviso a la vista.
test("el aviso de datos ilustrativos se ve en la página", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByText("No representa datos reales de YPF.")).toBeVisible();
});

test.describe("sin JavaScript", () => {
  test.use({ javaScriptEnabled: false });

  // El count-up es una capa encima: el dato tiene que estar aunque el script no llegue.
  test("las cifras de la portada llegan completas en el HTML", async ({ page }) => {
    await page.goto("/");
    const portada = page.locator("header");
    for (const cifra of ["US$ 25 M", "9,8", "95 %"]) {
      await expect(portada.getByText(cifra, { exact: true })).toBeVisible();
    }
  });
});
