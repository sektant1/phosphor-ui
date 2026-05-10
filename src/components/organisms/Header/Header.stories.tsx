import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import Header from "./Header";
import { basicUsage } from "../../../stories/basicUsage";

const meta: Meta<typeof Header> = {
  title: "Organisms/Header",
  component: Header,
  argTypes: {
    align: { control: "inline-radio", options: ["left", "center"] },
    variant: { control: "inline-radio", options: ["masthead", "compact", "terminal"] },
    mobileLayout: { control: "inline-radio", options: ["scroll", "stack"] },
    navVariant: { control: "inline-radio", options: ["plain", "tabs", "command", "mobile"] },
    localeVariant: { control: "inline-radio", options: ["inline", "segmented", "terminal"] },
  },
};

export default meta;
type Story = StoryObj<typeof Header>;

export const Default: Story = {
  args: {
    title: "phosphor ui",
    tagline: "// terminal-grade publishing on the magenta band",
    align: "center",
    variant: "masthead",
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

export const Compact: Story = {
  args: {
    title: "phosphor ui",
    tagline: "field notes / components / courses",
    align: "left",
    variant: "compact",
    nav: [
      { label: "docs", href: "#", active: true },
      { label: "changelog", href: "#" },
      { label: "patterns", href: "#" },
    ],
    locales: [
      { code: "en", label: "EN", href: "/", active: true },
      { code: "pt", label: "PT", href: "/pt/" },
    ],
  },
};

export const Terminal: Story = {
  args: {
    title: "ops console",
    tagline: "signal lock: stable",
    align: "left",
    variant: "terminal",
    mobileLayout: "stack",
    nav: [
      { label: "overview", href: "#", active: true },
      { label: "logs", href: "#" },
      { label: "alerts", href: "#" },
      { label: "settings", href: "#" },
    ],
    locales: [
      { code: "en", label: "EN", href: "/", active: true },
      { code: "ru", label: "RU", href: "/ru/" },
      { code: "pt", label: "PT", href: "/pt/" },
    ],
  },
};

export const MobileWidth: Story = {
  args: {
    ...Terminal.args,
    title: "mobile relay",
  },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: "22rem" }}>
        <Story />
      </div>
    ),
  ],
};
