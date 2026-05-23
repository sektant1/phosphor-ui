import type { Preview } from "@storybook/react";
import { withThemeByDataAttribute } from "@storybook/addon-themes";
import "../src/styles/phosphor.css";

const preview: Preview = {
  tags: ["autodocs"],
  decorators: [
    withThemeByDataAttribute({
      themes: {
        phosphor: "phosphor",
        amber: "amber",
        cyan: "cyan",
        red: "red",
      },
      defaultTheme: "phosphor",
      attributeName: "data-theme",
    }),
  ],

  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    backgrounds: {
      options: {
        phosphor: { name: "phosphor", value: "#04140a" },
        amber: { name: "amber", value: "#0b0702" },
        cyan: { name: "cyan", value: "#020b10" },
        red: { name: "red", value: "#100303" },
      },
    },
    controls: {
      expanded: true,
      sort: "requiredFirst",
      exclude: [
        "as",
        "children",
        "className",
        "style",
        "ref",
        "key",
        "dangerouslySetInnerHTML",
        "topHud",
        "bottomHud",
        "header",
        "footer",
        "icon",
        "actions",
        "action",
        "nav",
        "items",
        "posts",
        "tree",
        "hits",
        "tabs",
        "lessons",
        "tasks",
        "fields",
        "data",
        "render",
        /^on[A-Z].*/,
      ],
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    docs: {
      toc: true,
      source: {
        type: "code",
        excludeDecorators: true,
      },
    },
    layout: "padded",
    options: {
      storySort: {
        method: "alphabetical",
        order: [
          "Introduction",
          "Foundations",
          ["Design Tokens", "Typography", "Colors", "Spacing", "Effects"],
          "Atoms",
          "Molecules",
          "Organisms",
          "Templates",
          "Pages",
          "Legacy",
          "*",
        ],
      },
    },
  },

  initialGlobals: {
    backgrounds: {
      value: "phosphor",
    },
    theme: "phosphor",
  },
};

export default preview;
