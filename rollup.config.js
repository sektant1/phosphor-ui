import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import postcss from "rollup-plugin-postcss";

import { terser } from "rollup-plugin-terser";
import peerDepsExternal from "rollup-plugin-peer-deps-external";

export default [
  {
    input: "src/index.ts",
    output: [
      {
        file: "dist/cjs/index.js",
        format: "cjs",
        sourcemap: true,
        inlineDynamicImports: true,
      },
      {
        file: "dist/esm/index.js",
        format: "esm",
        sourcemap: true,
        inlineDynamicImports: true,
      },
    ],
    external: (id) =>
      ["react", "react-dom", "react/jsx-runtime", "@mdx-js/react"].includes(id) ||
      id === "shiki" ||
      id.startsWith("shiki/"),
    plugins: [
      peerDepsExternal(),

      resolve(),
      commonjs(),
      typescript({ tsconfig: "./tsconfig.json" }),
      postcss({ extensions: [".css", ".scss"], use: ["sass"], inject: true }),

      terser(),
    ],
  },
];

