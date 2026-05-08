import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import Header from "./Header";
import { basicUsage } from "../../../stories/basicUsage";

export default {
  title: "Organisms/Header",
  component: Header,
} as ComponentMeta<typeof Header>;

const Template: ComponentStory<typeof Header> = (args) => <Header {...args} />;

export const Default = Template.bind({});
Default.args = {
  title: "phosphor ui",
  tagline: "// terminal-grade publishing on the magenta band",
  align: "center",
  nav: [
    { label: "home", href: "#", active: true },
    { label: "posts", href: "#" },
    { label: "projects", href: "#" },
    { label: "tags", href: "#" },
    { label: "about", href: "#" },
  ],
  locales: [
    { code: "en", label: "EN", href: "/", active: true },
    { code: "ru", label: "RU", href: "/ru/" },
    { code: "pt", label: "PT", href: "/pt/" },
  ],
};
Default.parameters = {
  docs: {
    source: { code: basicUsage.Header },
  },
};

export const Minimal = Template.bind({});
Minimal.args = {
  title: "phosphor ui",
  align: "center",
  nav: [
    { label: "home", href: "#" },
    { label: "posts", href: "#" },
  ],
};
Minimal.parameters = {
  docs: {
    source: {
      code: `<Header
  title="phosphor ui"
  align="center"
  nav={[
    { label: "home", href: "#" },
    { label: "posts", href: "#" },
  ]}/>
`,
    },
  },
};
