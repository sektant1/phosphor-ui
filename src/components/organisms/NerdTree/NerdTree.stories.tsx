import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { NerdTree } from "./NerdTree";
import { source, tsx } from "../../../stories/source";

const meta: Meta<typeof NerdTree> = {
  title: "Organisms/NerdTree",
  component: NerdTree,
};
export default meta;

const defaultSource = tsx`
import { NerdTree } from "phosphor-ui";

const defaultProps = {
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
  };

export function Example() {
  return <NerdTree {...defaultProps} />;
}
`;

const compactPanelSource = tsx`
import { NerdTree } from "phosphor-ui";

export function Example() {
  return (
    <NerdTree
      density="compact"
      frame="panel"
      title="mission index"
      bufferLabel="[ops/]"
      tree={[
        { kind: "leaf", label: "briefing.md", href: "#", active: true },
        { kind: "leaf", label: "targets.md", href: "#" },
      ]}
    />
  );
}
`;

const mobileDrawerSource = tsx`
import { NerdTree } from "phosphor-ui";

export function Example() {
  return (
    <NerdTree
      mobileToggleLabel="mission tree"
      tree={[
        { kind: "leaf", label: "briefing.md", href: "#", active: true },
        { kind: "leaf", label: "targets.md", href: "#" },
      ]}
    />
  );
}
`;

type Story = StoryObj<typeof NerdTree>;

export const Default: Story = {
  parameters: { docs: { source: source(defaultSource) } },
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
  parameters: { docs: { source: source(compactPanelSource) } },
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
  parameters: { docs: { source: source(mobileDrawerSource) },
    viewport: { defaultViewport: "mobile1" },
  },
};
