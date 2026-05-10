import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { NerdTree } from "./NerdTree";
import { basicUsage } from "../../../stories/basicUsage";

const meta: Meta<typeof NerdTree> = {
  title: "Organisms/NerdTree",
  component: NerdTree,
};
export default meta;

type Story = StoryObj<typeof NerdTree>;

export const Default: Story = {
  parameters: { docs: { source: { code: basicUsage.NerdTree } } },
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

export const CompactPanel: Story = {
  args: {
    ...Default.args,
    density: "compact",
    frame: "panel",
    title: "mission index",
    bufferLabel: "[ops/]",
  },
};

export const MobileDrawer: Story = {
  args: {
    ...Default.args,
    mobileToggleLabel: "mission tree",
  },
  parameters: {
    viewport: { defaultViewport: "mobile1" },
  },
};
