import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "./",
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    port: 5173,
    host: true,
    open: false,
    hmr: { overlay: false },
    // @ts-ignore
    allowedHosts: process.env.TEMPO === "true" ? true : undefined,
  },
  define: {
    "process.env": {},
    global: "globalThis",
  },
  optimizeDeps: {
    include: [
      "buffer",
      "process",
      "@solana/web3.js",
      "@solana/wallet-adapter-react",
      "framer-motion",
      "@tsparticles/engine",
      "react-intersection-observer",
    ],
    esbuildOptions: { define: { global: "globalThis" } },
  },
  build: { sourcemap: true },
});