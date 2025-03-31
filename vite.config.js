import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "/", // 👈 essenziale per GitHub Pages su root domain
  sourceMap: false,
});
