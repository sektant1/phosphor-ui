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

const hideoutNav = [
  { label: "BLOG", href: "/blog", active: true },
  { label: "WIKI", href: "/wiki" },
  { label: "PROJECTS", href: "/projects" },
  { label: "COURSE", href: "/course" },
  { label: "ABOUT", href: "/about" },
];

const locales = [
  { code: "en", label: "EN", href: "/", active: true },
  { code: "pt", label: "PT", href: "/pt/" },
];

const defaultSource = tsx`
import { Header } from "phosphor-ui";

export function Example() {
  return (
    <Header
      title="sektant's hideout"
      align="center"
      variant="terminal"
      nav={[
        { label: "BLOG", href: "/blog", active: true },
        { label: "WIKI", href: "/wiki" },
        { label: "PROJECTS", href: "/projects" },
        { label: "COURSE", href: "/course" },
        { label: "ABOUT", href: "/about" },
      ]}
      locales={[
        { code: "en", label: "EN", href: "/", active: true },
        { code: "pt", label: "PT", href: "/pt/" },
      ]}
    />
  );
}
`;

const minimalSource = tsx`
import { Header } from "phosphor-ui";

export function Example() {
  return (
    <Header
      title="sektant's hideout"
      align="center"
      variant="terminal"
      nav={[
        { label: "BLOG", href: "/blog", active: true },
        { label: "WIKI", href: "/wiki" },
      ]}
    />
  );
}
`;

const compactSource = tsx`
import { Header } from "phosphor-ui";

export function Example() {
  return (
    <Header
      title="sektant's hideout"
      align="center"
      variant="compact"
      nav={[
        { label: "BLOG", href: "/blog" },
        { label: "WIKI", href: "/wiki", active: true },
        { label: "PROJECTS", href: "/projects" },
        { label: "COURSE", href: "/course" },
        { label: "ABOUT", href: "/about" },
      ]}
    />
  );
}
`;

const mobileWidthSource = tsx`
import { Header } from "phosphor-ui";

export function Example() {
  return (
    <Header
      title="sektant's hideout"
      align="center"
      variant="terminal"
      nav={[
        { label: "BLOG", href: "/blog", active: true },
        { label: "WIKI", href: "/wiki" },
        { label: "PROJECTS", href: "/projects" },
        { label: "COURSE", href: "/course" },
        { label: "ABOUT", href: "/about" },
      ]}
    />
  );
}
`;

type Story = StoryObj<typeof Header>;

export const Default: Story = {
  args: {
    title: "sektant's hideout",
    align: "center",
    variant: "terminal",
    nav: hideoutNav,
    locales,
  },
  parameters: {
    docs: {
      source: source(defaultSource),
    },
  },
};

export const Minimal: Story = {
  args: {
    title: "sektant's hideout",
    align: "center",
    variant: "terminal",
    nav: hideoutNav.slice(0, 2),
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
    title: "sektant's hideout",
    align: "center",
    variant: "compact",
    locales,
    nav: [
      { label: "BLOG", href: "/blog" },
      { label: "WIKI", href: "/wiki", active: true },
      { label: "PROJECTS", href: "/projects" },
      { label: "COURSE", href: "/course" },
      { label: "ABOUT", href: "/about" },
    ],
  },
};

export const MobileWidth: Story = {
  parameters: { docs: { source: source(mobileWidthSource) } },
  args: {
    ...Default.args,
  },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: "22rem" }}>
        <Story />
      </div>
    ),
  ],
};
