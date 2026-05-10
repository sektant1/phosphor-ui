import type { Preview } from "@storybook/react";
import { withThemeByDataAttribute } from "@storybook/addon-themes";
import "../src/styles/phosphor.css";

const preview: Preview = {
  tags: ["autodocs"],
  decorators: [
    withThemeByDataAttribute({
      themes: {
        tube: "tube",
        raised: "raised",
        deep: "deep",
      },
      defaultTheme: "tube",
      attributeName: "data-phosphor-theme",
    }),
  ],

  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    backgrounds: {
      options: {
        tube: { name: "tube", value: "#04140a" },
        raised: { name: "raised", value: "#082416" },
        deep: { name: "deep", value: "#010604" },
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
          "Foundations",
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
      value: "tube",
    },
    theme: "tube",
  },
};

export default preview;
