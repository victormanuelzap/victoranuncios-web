// astro.config.mjs
import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";

export default defineConfig({
  site: "https://www.victoranuncios.com", // dominio nuevo
  base: "/",                              // sin subcarpeta
  outDir: "dist",                         // carpeta de salida para Pages
  integrations: [tailwind({ applyBaseStyles: false })],
});
