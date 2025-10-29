import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "./", // Use relative paths for assets
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    port: 5172,
    open: false, // Prevent automatic browser opening
    host: true,
    hmr: {
      overlay: false, // Disable the HMR overlay to reduce overhead
    },
  },
  build: {
    sourcemap: true,
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
      "react-intersection-observer"
    ],
    esbuildOptions: {
      define: {
        global: "globalThis",
      },
    },
  },
});