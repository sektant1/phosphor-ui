import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { AdminShell } from "./AdminShell";
import type { AdminShellProps } from "./AdminShell";
import { Button } from "../../atoms/Button";
import Text from "../../atoms/Text";
import { source, tsx } from "../../../stories/source";

const meta: Meta<AdminShellProps> = {
  title: "Templates/AdminShell",
  component: AdminShell,
  parameters: { layout: "fullscreen" },
};
export default meta;

const defaultSource = tsx`
import React from "react";
import { AdminShell, Button, Text } from "phosphor-ui";



export function Example() {
  const props = {
      title: "// admin",
      description: "Manage drafts, published content, projects, and course modules from one operator surface.",
      actions: (
        <>
          <Button size="sm" variant="ghost">new draft</Button>
          <Button size="sm">publish</Button>
        </>
      ),
      stats: [
        { label: "drafts", value: "12" },
        { label: "published", value: "48", tone: "good" },
        { label: "needs review", value: "03", tone: "warn" },
      ],
      user: { name: "sektant1", role: "admin" },
      nav: [
        { label: "dashboard", href: "#", active: true, glyph: "◈" },
        { label: "posts", href: "#", glyph: "▸" },
        { label: "courses", href: "#", glyph: "▸" },
        { label: "projects", href: "#", glyph: "▸" },
        { label: "notes", href: "#", glyph: "▸" },
        { label: "settings", href: "#", glyph: "▸" },
      ],
    };

  return React.createElement(
        AdminShell,
        props,
        React.createElement(Text, { variant: "display" }, "[ select content from the tree or create a new draft ]")
      );
}
`;

type Story = StoryObj<AdminShellProps>;

export const Default: Story = {
  parameters: { docs: { source: source(defaultSource) } },
  args: {
    title: "// admin",
    description:
      "Manage drafts, published content, projects, and course modules from one operator surface.",
    actions: (
      <>
        <Button size="sm" variant="secondary">
          new draft
        </Button>
        <Button size="sm">publish</Button>
      </>
    ),
    stats: [
      { label: "drafts", value: "12" },
      { label: "published", value: "48", tone: "good" },
      { label: "needs review", value: "03", tone: "warn" },
    ],
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
        Text,
        { variant: "terminal" },
        "[ select content from the tree or create a new draft ]",
      ),
    ),
};
