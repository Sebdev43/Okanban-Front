import { defineConfig } from "vite";
import viteCompression from "vite-plugin-compression";

export default defineConfig({
  plugins: [viteCompression()],
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:5000",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
});
