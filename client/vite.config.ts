import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import VueDevTools from "vite-plugin-vue-devtools";
import path from "path";

export default defineConfig({
  server: {
    proxy: {
      "/api": "http://localhost:3000",
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  plugins: [vue(), VueDevTools()],
  css: {
    preprocessorOptions: {
      scss: {
        api: "modern-compiler",
        // additionalData: `
        //   @use "@/shared/styles/index.scss" as *;
        // `,
      },
    },
  },
});
