import { terser } from "rollup-plugin-terser";

export default {
  input: "index.js",
  output: {
    file: "dist/lume.js",
    format: "iife",
    name: "LumeComponent",
  },
  plugin: [terser()],
};