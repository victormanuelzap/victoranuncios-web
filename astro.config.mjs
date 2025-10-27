import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";

export default defineConfig({
  site: "https://victormanuelzap.github.io",
  base: "/victoranuncios-web/",
  build: { outDir: "docs" },
  integrations: [tailwind({ applyBaseStyles: false })],
});
