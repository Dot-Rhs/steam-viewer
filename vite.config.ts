import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/

console.log("GARY: ", process.env.PORT);

export default ({ mode }: { mode: string }) => {
  process.env = loadEnv(mode, "../", "");

  return defineConfig({
    plugins: [react()],
    // build: {
    //   manifest: true,
    //   rollupOptions: {
    //     input: "./src/main.jsx",
    //   },
    // },
    server: {
      // proxy: {
      //   "/api": "http://localhost:5000/", // the address that u serve in the backend
      // },
      port: (Number(process.env.PORT) as number) ?? 3001,
    },
  });
};
