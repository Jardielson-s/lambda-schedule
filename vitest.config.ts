import path from "path";
import { defineConfig } from "vitest/config";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [tsconfigPaths()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  test: {
    bail: 2,
    exclude: [
      "node_modules/",
      "dist/",
      "architecture/",
      ".infracost/",
      "terraform/",
      "**/src/**/*.config.ts",
      "**/src/shared/**",
    ],
    include: ["src/**/__tests__/**"],
    coverage: {
      all: true,
      provider: "istanbul",
      enabled: true,
      exclude: ["**/src/**/*.config.ts"],
    },
  },
});
