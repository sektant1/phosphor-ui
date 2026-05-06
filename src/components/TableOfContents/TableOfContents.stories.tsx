import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { TableOfContents } from "./TableOfContents";

const meta: Meta<typeof TableOfContents> = {
  title: "Components/TableOfContents",
  component: TableOfContents,
};
export default meta;

type Story = StoryObj<typeof TableOfContents>;

export const Default: Story = {
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
