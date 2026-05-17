import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { TableOfContents } from "./TableOfContents";
import type { TableOfContentsProps } from "./TableOfContents";
import { source, tsx } from "../../../stories/source";

const meta: Meta<TableOfContentsProps> = {
  title: "Molecules/TableOfContents",
  component: TableOfContents,
  argTypes: {
    heading: { control: "text" },
    items: { control: "object" },
    foot: { control: "text" },
    spy: { control: "boolean" },
    smoothScroll: { control: "boolean" },
    spyOffset: { control: "number" },
    collapsible: { control: "boolean" },
    defaultCollapsed: { control: "boolean" },
    showGlyphs: { control: "boolean" },
  },
  args: { spy: true, collapsible: true, showGlyphs: true },
};
export default meta;

const defaultSource = tsx`
import { TableOfContents } from "phosphor-ui";



const defaultProps = {
    items: [
      { label: "Boot sequence", href: "#boot" },
      {
        label: "Decode the signal",
        href: "#decode",
        state: "active",
        children: [
          { label: "Carrier wave", href: "#carrier" },
          { label: "Cipher", href: "#cipher" },
        ],
      },
      { label: "Engage the zone", href: "#zone" },
    ],
    foot: <span>est. 18 min</span>,
  };

export function Example() {
  return <TableOfContents {...defaultProps} />;
}
`;

type Story = StoryObj<typeof TableOfContents>;

export const Default: Story = {
  parameters: { docs: { source: source(defaultSource) } },
  args: {
    items: [
      { label: "Boot sequence", href: "#boot" },
      {
        label: "Decode the signal",
        href: "#decode",
        state: "active",
        children: [
          { label: "Carrier wave", href: "#carrier" },
          { label: "Cipher", href: "#cipher" },
        ],
      },
      { label: "Engage the zone", href: "#zone" },
    ],
    foot: <span>est. 18 min</span>,
  },
};
