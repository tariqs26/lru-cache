import { defineConfig } from "tsup"

export default defineConfig({
  format: ["cjs", "esm"], // transpile to esm or cjs
  entry: ["./src/index.ts"],
  dts: true, // declarations
  shims: true,
  skipNodeModulesBundle: true,
  clean: true,
})
