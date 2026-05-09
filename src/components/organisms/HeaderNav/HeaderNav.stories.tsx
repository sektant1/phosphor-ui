import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { HeaderNav } from "./HeaderNav";
import { basicUsage } from "../../../stories/basicUsage";

const meta: Meta<typeof HeaderNav> = {
  title: "Organisms/HeaderNav",
  component: HeaderNav,
  argTypes: {
    variant: { control: "inline-radio", options: ["plain", "tabs", "command"] },
  },
};
export default meta;

type Story = StoryObj<typeof HeaderNav>;

export const Default: Story = {
  parameters: { docs: { source: { code: basicUsage.HeaderNav } } },
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
