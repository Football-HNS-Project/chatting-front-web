import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig(() => {
  return defineConfig({
    plugins: [react(), tsconfigPaths()],
    server: {
      host: true,
      port: 9999,
    },
  });
});
