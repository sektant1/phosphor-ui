import type { StorybookConfig } from "@storybook/react-webpack5";
import path from "path";

const cssModuleRule = /\.module\.(css|s[ac]ss)$/i;
const scssModuleRule = /\.module\.s[ac]ss$/i;

const excludeCssModules = (rules: unknown[]) => {
  for (const rule of rules) {
    if (!rule || typeof rule !== "object") continue;

    const candidate = rule as {
      exclude?: unknown;
      oneOf?: unknown[];
      test?: { toString(): string };
    };

    if (Array.isArray(candidate.oneOf)) {
      excludeCssModules(candidate.oneOf);
    }

    const test = candidate.test?.toString() ?? "";
    if (
      !test.includes("css") &&
      !test.includes("scss") &&
      !test.includes("sass")
    ) {
      continue;
    }

    const existing = candidate.exclude
      ? Array.isArray(candidate.exclude)
        ? candidate.exclude
        : [candidate.exclude]
      : [];
    candidate.exclude = [...existing, cssModuleRule];
  }
};

const config: StorybookConfig = {
  stories: ["../src/**/*.stories.@(ts|tsx|mdx)", "../src/stories/**/*.mdx"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-docs",
    "@storybook/addon-themes",
    "@storybook/addon-styling-webpack",
  ],
  framework: {
    name: "@storybook/react-webpack5",
    options: {},
  },
  docs: {
    defaultName: "Docs",
  },
  staticDirs: [],
  webpackFinal: async (config) => {
    config.module ??= { rules: [] };
    config.module.rules ??= [];
    excludeCssModules(config.module.rules);

    config.module.rules.push({
      test: cssModuleRule,
      use: [
        "style-loader",
        {
          loader: "css-loader",
          options: {
            esModule: true,
            importLoaders: 1,
            modules: {
              namedExport: false,
              exportLocalsConvention: "as-is",
              localIdentName: "[name]__[local]--[hash:base64:5]",
            },
          },
        },
        {
          loader: "sass-loader",
        },
      ],
    });

    config.module.rules.push({
      test: /\.s[ac]ss$/i,
      exclude: scssModuleRule,
      use: [
        "style-loader",
        {
          loader: "css-loader",
          options: { importLoaders: 1 },
        },
        {
          loader: "sass-loader",
        },
      ],
    });

    config.module.rules.push({
      test: /\.(ts|tsx)$/i,
      include: [
        path.resolve(process.cwd(), "src"),
        path.resolve(process.cwd(), ".storybook"),
      ],
      use: {
        loader: "babel-loader",
        options: {
          presets: [
            "@babel/preset-env",
            ["@babel/preset-react", { runtime: "automatic" }],
            "@babel/preset-typescript",
          ],
        },
      },
    });

    config.resolve ??= {};
    config.resolve.extensions = Array.from(
      new Set([...(config.resolve.extensions ?? []), ".ts", ".tsx"]),
    );

    return config;
  },
};

export default config;
