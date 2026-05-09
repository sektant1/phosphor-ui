import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import Header from "./Header";
import { basicUsage } from "../../../stories/basicUsage";

const meta: Meta<typeof Header> = {
  title: "Organisms/Header",
  component: Header,
};

export default meta;
type Story = StoryObj<typeof Header>;

export const Default: Story = {
  args: {
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
  },
  parameters: {
    docs: {
      source: { code: basicUsage.Header },
    },
  },
};

export const Minimal: Story = {
  args: {
    title: "phosphor ui",
    align: "center",
    nav: [
      { label: "home", href: "#" },
      { label: "posts", href: "#" },
    ],
  },
  parameters: {
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
  },
};
