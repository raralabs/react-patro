//uses peer dependency
import external from "rollup-plugin-peer-deps-external";
//pairs rollup with typescript
import typescript from "rollup-plugin-typescript2";
// resolves third party modules and add in the source
import resolve from "@rollup/plugin-node-resolve";
//uglifying and minizing the budle
// import { terser } from "rollup-plugin-terser";
// babel
import babel from "rollup-plugin-babel";

export default [
  {
    input: "./src/index.ts",
    output: [
      {
        file: "dist/index.esm.js",
        format: "esm",
      },
      {
        file: "dist/index.js",
        format: "cjs",
      },
    ],
    plugins: [
      babel({
        exclude: "node_modules/**",
        presets: ["@babel/preset-react"],
      }),
      typescript(),
      external(),
      resolve(),
      // terser(),
    ],
  },
];
