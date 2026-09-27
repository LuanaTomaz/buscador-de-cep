import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Essa é a configuração do Vite (a ferramenta que "roda" o projeto).
// Aqui só dizemos: "usa o plugin de React".
export default defineConfig({
  plugins: [react()],
});
