import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "../../atoms/Button";
import { List } from "./List";
import type { ListItem } from "./List";
import { basicUsage } from "../../../stories/basicUsage";

const items: ListItem[] = [
  {
    id: "boot",
    title: "Boot sequence",
    description: "Initialize shell state and confirm the primary channel.",
    meta: "00:04",
    href: "#boot",
  },
  {
    id: "sync",
    title: "Sync field notes",
    description: "Pull changed fragments into the local archive.",
    meta: "queued",
    href: "#sync",
  },
  {
    id: "publish",
    title: "Publish packet",
    description: "Ship the current article bundle to the public relay.",
    meta: "ready",
    action: (
      <Button size="sm" variant="ghost">
        open
      </Button>
    ),
  },
];

const meta: Meta<typeof List> = {
  title: "Molecules/List",
  component: List,
  argTypes: {
    as: { control: "inline-radio", options: ["ul", "ol"] },
    variant: { control: "inline-radio", options: ["plain", "ruled", "terminal"] },
    marker: { control: "inline-radio", options: ["dot", "dash", "chevron", "index", "none"] },
    density: { control: "inline-radio", options: ["default", "compact"] },
  },
  args: {
    items,
    as: "ul",
    variant: "ruled",
    marker: "chevron",
    density: "default",
  },
};

export default meta;

type Story = StoryObj<typeof List>;

export const Default: Story = {
  parameters: { docs: { source: { code: basicUsage.List } } },
};

export const Ordered: Story = {
  args: {
    as: "ol",
    marker: "index",
  },
};

export const Terminal: Story = {
  args: {
    variant: "terminal",
    marker: "dash",
  },
};

export const Compact: Story = {
  args: {
    density: "compact",
    marker: "dot",
  },
};

export const CustomRender: Story = {
  args: {
    renderItem: (item, index) => (
      <span>
        {index + 1}. {item.title}
      </span>
    ),
  },
};
