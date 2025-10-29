// astro.config.mjs
import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";

export default defineConfig({
  site: "https://victormanuelzap.github.io", // dominio base (sin subcarpeta)
  base: "/victoranuncios-web/",              // nombre del repo
  outDir: "dist",                            // carpeta de salida para Pages
  integrations: [tailwind({ applyBaseStyles: false })],
});