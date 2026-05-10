import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "../../atoms/Button";
import { List } from "./List";
import type { ListItem } from "./List";
import { source, tsx } from "../../../stories/source";

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

const defaultSource = tsx`
import { Button, List } from "@sektant1/phosphor-ui";

const defaultProps = {
    items,
    as: "ul",
    variant: "ruled",
    marker: "chevron",
    density: "default",
  };

export function Example() {
  return <List {...defaultProps} />;
}
`;

const orderedSource = tsx`
import { Button, List } from "@sektant1/phosphor-ui";

const orderedProps = {
  ...{
    items,
    as: "ul",
    variant: "ruled",
    marker: "chevron",
    density: "default",
  },
  ...{
    as: "ol",
    marker: "index",
  },
};

export function Example() {
  return <List {...orderedProps} />;
}
`;

const terminalSource = tsx`
import { Button, List } from "@sektant1/phosphor-ui";

const terminalProps = {
  ...{
    items,
    as: "ul",
    variant: "ruled",
    marker: "chevron",
    density: "default",
  },
  ...{
    variant: "terminal",
    marker: "dash",
  },
};

export function Example() {
  return <List {...terminalProps} />;
}
`;

const compactSource = tsx`
import { Button, List } from "@sektant1/phosphor-ui";

const compactProps = {
  ...{
    items,
    as: "ul",
    variant: "ruled",
    marker: "chevron",
    density: "default",
  },
  ...{
    density: "compact",
    marker: "dot",
  },
};

export function Example() {
  return <List {...compactProps} />;
}
`;

const customRenderSource = tsx`
import { Button, List } from "@sektant1/phosphor-ui";



const customRenderProps = {
  ...{
    items,
    as: "ul",
    variant: "ruled",
    marker: "chevron",
    density: "default",
  },
  ...{
    renderItem: (item, index) => (
      <span>
        {index + 1}. {item.title}
      </span>
    ),
  },
};

export function Example() {
  return <List {...customRenderProps} />;
}
`;

type Story = StoryObj<typeof List>;

export const Default: Story = {
  parameters: { docs: { source: source(defaultSource) } },
};

export const Ordered: Story = {
  parameters: { docs: { source: source(orderedSource) } },
  args: {
    as: "ol",
    marker: "index",
  },
};

export const Terminal: Story = {
  parameters: { docs: { source: source(terminalSource) } },
  args: {
    variant: "terminal",
    marker: "dash",
  },
};

export const Compact: Story = {
  parameters: { docs: { source: source(compactSource) } },
  args: {
    density: "compact",
    marker: "dot",
  },
};

export const CustomRender: Story = {
  parameters: { docs: { source: source(customRenderSource) } },
  args: {
    renderItem: (item, index) => (
      <span>
        {index + 1}. {item.title}
      </span>
    ),
  },
};
