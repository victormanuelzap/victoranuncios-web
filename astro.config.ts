import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";

export default defineConfig({
  site: "https://victormanuelzap.github.io/victoranuncios-web/",
  base: "/victoranuncios-web/",
  outDir: "dist", // 👈 muy importante: dist, no docs
  integrations: [tailwind({ applyBaseStyles: false })],
});
