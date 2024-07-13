import { defineConfig } from "tsup"

export default defineConfig({
  entry: ["./src/index.ts"],
  dts: true, // declarations
  shims: true,
  skipNodeModulesBundle: true,
  clean: true,
})
