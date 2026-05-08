import "../src/styles/tokens.css";
import "../src/styles/global.css";

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  backgrounds: {
    default: "tube",
    values: [
      { name: "tube", value: "#04140a" },
      { name: "deep", value: "#010604" },
    ],
  },
  docs: {
    source: {
      type: "code",
      excludeDecorators: true,
    },
  },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  options: {
    storySort: {
      order: ["Pages", ["Demo Site", ["Site Router", "Home Page", "Post Page", "Course Page"]], "Zone", "Components", "*"],
    },
  },
};

export const tags = ["autodocs"];
