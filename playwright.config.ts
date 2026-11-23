import { defineConfig, devices } from "@playwright/test";

/**
 * Los tests corren contra el build de producción, no contra `next dev`: en dev
 * no hay CSP, el bundle no está minificado y las páginas estáticas no existen
 * como tales. Testear dev es testear un sitio que nunca va a ver nadie.
 */
export default defineConfig({
  testDir: "./tests",
  fullyParallel: true,

  // Que no se pueda mergear un `.only` olvidado.
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,

  reporter: process.env.CI ? [["html"], ["github"]] : "list",

  use: {
    baseURL: "http://localhost:3000",
    trace: "on-first-retry",
    screenshot: "only-on-failure",
  },

  projects: [
    { name: "escritorio", use: { ...devices["Desktop Chrome"] } },
    { name: "movil", use: { ...devices["Pixel 7"] } },
  ],

  webServer: {
    command: "npm run build && npm run start",
    url: "http://localhost:3000",
    reuseExistingServer: !process.env.CI,
    timeout: 180_000,
  },
});
