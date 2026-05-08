import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { TableOfContents } from "./TableOfContents";
import { basicUsage } from "../../../stories/basicUsage";

const meta: Meta<typeof TableOfContents> = {
  title: "Molecules/TableOfContents",
  component: TableOfContents,
};
export default meta;

type Story = StoryObj<typeof TableOfContents>;

export const Default: Story = {
  parameters: { docs: { source: { code: basicUsage.TableOfContents } } },
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
