import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import Header from "./Header";
import { source, tsx } from "../../../stories/source";

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

const defaultSource = tsx`
import { Header } from "@sektant1/phosphor-ui";

const defaultProps = {
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
  };

export function Example() {
  return <Header {...defaultProps} />;
}
`;

const minimalSource = tsx`
import { Header } from "@sektant1/phosphor-ui";

const minimalProps = {
    title: "phosphor ui",
    align: "center",
    nav: [
      { label: "home", href: "#" },
      { label: "posts", href: "#" },
    ],
  };

export function Example() {
  return <Header {...minimalProps} />;
}
`;

const compactSource = tsx`
import { Header } from "@sektant1/phosphor-ui";

const compactProps = {
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
  };

export function Example() {
  return <Header {...compactProps} />;
}
`;

const terminalSource = tsx`
import { Header } from "@sektant1/phosphor-ui";

const terminalProps = {
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
  };

export function Example() {
  return <Header {...terminalProps} />;
}
`;

const mobileWidthSource = tsx`
import { Header } from "@sektant1/phosphor-ui";



const mobileWidthProps = {
    ...Terminal.args,
    title: "mobile relay",
  };

export function Example() {
  return <Header {...mobileWidthProps} />;
}
`;
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
      source: source(defaultSource),
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
      source: source(minimalSource),
    },
  },
};

export const Compact: Story = {
  parameters: { docs: { source: source(compactSource) } },
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
  parameters: { docs: { source: source(terminalSource) } },
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
  parameters: { docs: { source: source(mobileWidthSource) } },
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
