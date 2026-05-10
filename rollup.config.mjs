import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import postcss from "rollup-plugin-postcss";

import terser from "@rollup/plugin-terser";
import peerDepsExternal from "rollup-plugin-peer-deps-external";

const input = {
  index: "src/index.ts",
  "admin/index": "src/admin/index.ts",
  "atoms/index": "src/atoms/index.ts",
  "content/index": "src/content/index.ts",
  "foundations/index": "src/foundations/index.ts",
  "hooks/index": "src/hooks/index.ts",
  "molecules/index": "src/molecules/index.ts",
  "organisms/index": "src/organisms/index.ts",
  "templates/index": "src/templates/index.ts",
  "video/index": "src/video/index.ts",
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
    ],
  },
];
