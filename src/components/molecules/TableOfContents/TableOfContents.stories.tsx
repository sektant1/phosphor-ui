import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { TableOfContents } from "./TableOfContents";
import { source, tsx } from "../../../stories/source";

const meta: Meta<typeof TableOfContents> = {
  title: "Molecules/TableOfContents",
  component: TableOfContents,
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
