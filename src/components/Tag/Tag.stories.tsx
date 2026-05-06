import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Tag } from "./Tag";

const meta: Meta<typeof Tag> = {
  title: "Components/Tag",
  component: Tag,
  argTypes: {
    color: { control: "inline-radio", options: ["phosphor", "magenta"] },
  },
};
export default meta;

type Story = StoryObj<typeof Tag>;

export const Magenta: Story = { args: { children: "intro", color: "magenta" } };
export const Phosphor: Story = { args: { children: "lab", color: "phosphor" } };
export const WithCount: Story = { args: { children: "docs", count: 12 } };
export const Linked: Story = { args: { children: "courses", href: "#", hover: true } };
