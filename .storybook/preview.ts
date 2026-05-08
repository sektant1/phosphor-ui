import type { Preview } from "@storybook/react";
import "../src/styles/tokens.css";
import "../src/styles/global.css";

const preview: Preview = {
  tags: ["autodocs"],

  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    backgrounds: {
      options: {
        tube: { name: "tube", value: "#04140a" },
        raised: { name: "raised", value: "#082416" },
        deep: { name: "deep", value: "#010604" }
      }
    },
    controls: {
      expanded: true,
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
      value: "tube"
    }
  }
};

export default preview;
