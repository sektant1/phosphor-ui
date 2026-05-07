const path = require("path");

module.exports = {
  stories: [
    "../src/**/*.stories.mdx",
    "../src/**/*.stories.@(js|jsx|ts|tsx)"
  ],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials"
  ],
  framework: {
    name: "@storybook/react-webpack5",
    options: {},
  },
  webpackFinal: async (config) => {
    const scssModuleRule = /\.module\.s[ac]ss$/i;

    const excludeScssModules = (rules = []) => {
      rules.forEach((rule) => {
        if (!rule || typeof rule !== "object") return;
        if (Array.isArray(rule.oneOf)) excludeScssModules(rule.oneOf);

        const test = rule.test?.toString() ?? "";
        if (test.includes("scss") || test.includes("sass")) {
          const existing = rule.exclude
            ? Array.isArray(rule.exclude)
              ? rule.exclude
              : [rule.exclude]
            : [];
          rule.exclude = [...existing, scssModuleRule];
        }
      });
    };

    excludeScssModules(config.module.rules);

    config.module.rules.push({
      test: scssModuleRule,
      use: [
        require.resolve("style-loader"),
        {
          loader: require.resolve("css-loader"),
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
        require.resolve("sass-loader"),
      ],
    });
    config.module.rules.push({
      test: /\.s[ac]ss$/i,
      exclude: scssModuleRule,
      use: [
        require.resolve("style-loader"),
        {
          loader: require.resolve("css-loader"),
          options: { importLoaders: 1 },
        },
        require.resolve("sass-loader"),
      ],
    });
    config.module.rules.push({
      test: /\.(ts|tsx)$/,
      include: path.resolve(__dirname, "../src"),
      use: {
        loader: require.resolve("babel-loader"),
        options: {
          presets: [
            require.resolve("@babel/preset-env"),
            [require.resolve("@babel/preset-react"), { runtime: "automatic" }],
            require.resolve("@babel/preset-typescript"),
          ],
        },
      },
    });
    config.resolve.extensions.push(".ts", ".tsx");
    return config;
  },
};
