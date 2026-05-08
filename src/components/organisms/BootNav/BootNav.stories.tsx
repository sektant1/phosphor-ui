import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { BootNav } from "./BootNav";
import { basicUsage } from "../../../stories/basicUsage";

const meta: Meta<typeof BootNav> = {
  title: "Molecules/BootNav",
  component: BootNav,
};
export default meta;

type Story = StoryObj<typeof BootNav>;

export const Default: Story = {
  parameters: { docs: { source: { code: basicUsage.BootNav } } },
  args: {
    items: [
      { label: "home", href: "#", active: true },
      { label: "log", href: "#log" },
      { label: "courses", href: "#courses" },
      { label: "about", href: "#about", glyph: "*" },
    ],
  },
};
