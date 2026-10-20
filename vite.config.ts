import { defineConfig } from "vite";

// Относительные пути: собранный сайт можно положить в любую папку хостинга.
export default defineConfig({
  base: "./",
  // LEGAL_* — данные для Impressum, как в deelstuff (src/legal.ts).
  envPrefix: ["VITE_", "LEGAL_"],
});
