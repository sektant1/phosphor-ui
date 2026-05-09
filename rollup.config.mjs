import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import postcss from "rollup-plugin-postcss";

import terser from "@rollup/plugin-terser";
import peerDepsExternal from "rollup-plugin-peer-deps-external";

const externalPackages = [
  /^react($|\/)/,
  /^react-dom($|\/)/,
  /^@mdx-js\/react$/,
  /^shiki($|\/)/,
  /^figlet($|\/)/,
  /^video\.js$/,
  /^video\.js\/dist\/types\//,
];

const isExternal = (id) => externalPackages.some((pattern) => pattern.test(id));

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
    external: isExternal,
    plugins: [
      peerDepsExternal(),

      resolve(),
      commonjs(),
      typescript({
        tsconfig: "./tsconfig.json",
        declaration: false,
        declarationDir: undefined,
      }),
      postcss({ extensions: [".css", ".scss"], use: ["sass"], inject: true }),

      terser(),
    ],
  },
];
