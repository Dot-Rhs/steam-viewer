import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/

export default ({ mode, command }: { mode: string; command: unknown }) => {
  process.env = loadEnv(mode, "../", "");

  if (command === "serve") {
    return defineConfig({
      plugins: [react()],
      // build: {
      //   manifest: true,
      //   rollupOptions: {
      //     input: "./src/main.jsx",
      //   },
      // },
      define: {
        "process.env": {
          VITE_LOCAL_SERVER_API_BASE_DOMAIN: "http://localhost:5000",
          VITE_LOCAL_GAMES_API_BASE_DOMAIN: "http://localhost:5001",
          VITE_LOCAL_PLAYERS_API_BASE_DOMAIN: "http://localhost:5002",
        },
      },
      server: {
        port: (Number(process.env.PORT) as number) || 3001,
      },
    });
  }
};
