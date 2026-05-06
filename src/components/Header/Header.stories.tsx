import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import Header from "./Header";

export default {
  title: "Zone/Header",
  component: Header,
} as ComponentMeta<typeof Header>;

const Template: ComponentStory<typeof Header> = (args) => <Header {...args} />;

export const Full = Template.bind({});
Full.args = {
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

export const Minimal = Template.bind({});
Minimal.args = {
  title: "phosphor ui",
  align: "left",
  nav: [
    { label: "home", href: "#" },
    { label: "posts", href: "#" },
  ],
};
