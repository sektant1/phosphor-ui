import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import postcss from "rollup-plugin-postcss";

import terser from "@rollup/plugin-terser";
import peerDepsExternal from "rollup-plugin-peer-deps-external";

const input = {
  index: "src/index.ts",
  server: "src/server.ts",
};

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
const clientDirective = '"use client";';

function preserveClientDirective() {
  return {
    name: "preserve-client-directive",
    generateBundle(_options, bundle) {
      for (const output of Object.values(bundle)) {
        if (output.type !== "chunk" || !output.isEntry || output.name !== "index") continue;
        if (output.code.startsWith(clientDirective)) continue;
        output.code = `${clientDirective}\n${output.code}`;
      }
    },
  };
}

export default [
  {
    input,
    output: [
      {
        dir: "dist/cjs",
        entryFileNames: "[name].js",
        chunkFileNames: "chunks/[name]-[hash].js",
        format: "cjs",
        sourcemap: true,
        exports: "named",
      },
      {
        dir: "dist/esm",
        entryFileNames: "[name].js",
        chunkFileNames: "chunks/[name]-[hash].js",
        format: "esm",
        sourcemap: true,
      },
    ],
    external: isExternal,
    plugins: [
      peerDepsExternal(),

      resolve(),
      commonjs(),
      typescript({
        tsconfig: "./tsconfig.json",
        compilerOptions: {
          declaration: false,
          declarationDir: undefined,
          outDir: undefined,
        },
      }),
      postcss({
        extensions: [".css", ".scss"],
        use: ["sass"],
        modules: { auto: true },
        inject: false,
        extract: "styles/components.css",
      }),

      terser(),
      preserveClientDirective(),
    ],
  },
];
