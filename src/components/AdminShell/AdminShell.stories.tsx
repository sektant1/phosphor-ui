import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { AdminShell } from "./AdminShell";
import type { AdminShellProps } from "./AdminShell";

const meta: Meta<AdminShellProps> = {
  title: "Components/AdminShell",
  component: AdminShell,
  parameters: { layout: "fullscreen" },
};
export default meta;

type Story = StoryObj<AdminShellProps>;

export const Default: Story = {
  args: {
    title: "// admin",
    user: { name: "sektant1", role: "admin" },
    nav: [
      { label: "dashboard", href: "#", active: true, glyph: "◈" },
      { label: "posts", href: "#", glyph: "▸" },
      { label: "courses", href: "#", glyph: "▸" },
      { label: "projects", href: "#", glyph: "▸" },
      { label: "notes", href: "#", glyph: "▸" },
      { label: "settings", href: "#", glyph: "▸" },
    ],
  },
  render: (args) =>
    React.createElement(
      AdminShell,
      args,
      React.createElement(
        "div",
        { style: { padding: "2rem", fontFamily: "var(--font-code)", color: "var(--phosphor-dim)" } },
        "[ main content area ]"
      )
    ),
};
