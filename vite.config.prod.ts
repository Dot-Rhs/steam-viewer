import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/

console.log("GARY2: ", process.env);

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
    define: {
      "process.env": {
        VITE_LOCAL_SERVER_API_BASE_DOMAIN:
          "https://steam-viewer-server-9cb9b1697b74.herokuapp.com",
        VITE_LOCAL_GAMES_API_BASE_DOMAIN:
          "https://steam-viewer-games-service-1ff46a6c2739.herokuapp.com",
        VITE_LOCAL_PLAYERS_API_BASE_DOMAIN:
          "https://steam-viewer-player-service-a1b780795ae9.herokuapp.com",
      },
    },
    server: {
      port: (Number(process.env.PORT) as number) || 3001,
    },
  });
};
