import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { BootNav } from "./BootNav";

const meta: Meta<typeof BootNav> = {
  title: "Components/BootNav",
  component: BootNav,
};
export default meta;

type Story = StoryObj<typeof BootNav>;

export const Default: Story = {
  args: {
    items: [
      { label: "home", href: "#", active: true },
      { label: "log", href: "#log" },
      { label: "courses", href: "#courses" },
      { label: "about", href: "#about", glyph: "*" },
    ],
  },
};
