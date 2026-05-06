import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { NerdTree } from "./NerdTree";

const meta: Meta<typeof NerdTree> = {
  title: "Components/NerdTree",
  component: NerdTree,
};
export default meta;

type Story = StoryObj<typeof NerdTree>;

export const Default: Story = {
  args: {
    title: "~/sektant's hideout",
    bufferLabel: "[content/]",
    hint: "press ? for help",
    command: ":NERDTree",
    footerMeta: "12 nodes · 3 dirs",
    tree: [
      {
        kind: "dir",
        label: "log",
        defaultOpen: true,
        children: [
          { kind: "leaf", label: "2026-05-06.md", href: "#", active: true },
          { kind: "leaf", label: "2026-05-05.md", href: "#" },
        ],
      },
      {
        kind: "dir",
        label: "courses",
        children: [
          { kind: "leaf", label: "phosphor-protocol.md", href: "#" },
          { kind: "leaf", label: "signal-interception.md", href: "#" },
        ],
      },
      { kind: "leaf", label: "about.md", href: "#" },
    ],
  },
};
