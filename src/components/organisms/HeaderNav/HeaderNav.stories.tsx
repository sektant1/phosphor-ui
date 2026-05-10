import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { HeaderNav } from "./HeaderNav";
import { source, tsx } from "../../../stories/source";

const meta: Meta<typeof HeaderNav> = {
  title: "Organisms/HeaderNav",
  component: HeaderNav,
  argTypes: {
    variant: { control: "inline-radio", options: ["plain", "tabs", "command", "mobile"] },
  },
};
export default meta;

const defaultSource = tsx`
import { HeaderNav } from "@sektant1/phosphor-ui";

const defaultProps = {
    items: [
      { label: "home", href: "#", active: true },
      { label: "log", href: "#log" },
      { label: "courses", href: "#courses" },
      { label: "about", href: "#about", glyph: "*" },
    ],
    variant: "plain",
  };

export function Example() {
  return <HeaderNav {...defaultProps} />;
}
`;

const tabsSource = tsx`
import { HeaderNav } from "@sektant1/phosphor-ui";

const tabsProps = {
    variant: "tabs",
    items: [
      { label: "docs", href: "#docs", active: true },
      { label: "changelog", href: "#changelog" },
      { label: "notes", href: "#notes" },
      { label: "ops", href: "#ops" },
    ],
  };

export function Example() {
  return <HeaderNav {...tabsProps} />;
}
`;

const commandSource = tsx`
import { HeaderNav } from "@sektant1/phosphor-ui";

const commandProps = {
    variant: "command",
    items: [
      { label: "overview", href: "#overview", active: true },
      { label: "logs", href: "#logs" },
      { label: "alerts", href: "#alerts" },
      { label: "settings", href: "#settings" },
    ],
  };

export function Example() {
  return <HeaderNav {...commandProps} />;
}
`;

const mobileWidthSource = tsx`
import { HeaderNav } from "@sektant1/phosphor-ui";



const mobileWidthProps = {
    items: [
      { label: "home", href: "#", active: true },
      { label: "log", href: "#log" },
      { label: "courses", href: "#courses" },
      { label: "about", href: "#about", glyph: "*" },
    ],
    variant: "command",
  };

export function Example() {
  return <HeaderNav {...mobileWidthProps} />;
}
`;

type Story = StoryObj<typeof HeaderNav>;

export const Default: Story = {
  parameters: { docs: { source: source(defaultSource) } },
  args: {
    items: [
      { label: "home", href: "#", active: true },
      { label: "log", href: "#log" },
      { label: "courses", href: "#courses" },
      { label: "about", href: "#about", glyph: "*" },
    ],
    variant: "plain",
  },
};

export const Tabs: Story = {
  parameters: { docs: { source: source(tabsSource) } },
  args: {
    variant: "tabs",
    items: [
      { label: "docs", href: "#docs", active: true },
      { label: "changelog", href: "#changelog" },
      { label: "notes", href: "#notes" },
      { label: "ops", href: "#ops" },
    ],
  },
};

export const Command: Story = {
  parameters: { docs: { source: source(commandSource) } },
  args: {
    variant: "command",
    items: [
      { label: "overview", href: "#overview", active: true },
      { label: "logs", href: "#logs" },
      { label: "alerts", href: "#alerts" },
      { label: "settings", href: "#settings" },
    ],
  },
};

export const MobileWidth: Story = {
  parameters: { docs: { source: source(mobileWidthSource) } },
  args: {
    items: [
      { label: "home", href: "#", active: true },
      { label: "log", href: "#log" },
      { label: "courses", href: "#courses" },
      { label: "about", href: "#about", glyph: "*" },
    ],
    variant: "command",
  },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: "18rem" }}>
        <Story />
      </div>
    ),
  ],
};
