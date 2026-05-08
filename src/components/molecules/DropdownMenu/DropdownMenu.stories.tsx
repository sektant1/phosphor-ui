import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { DropdownMenu } from "./DropdownMenu";
import { basicUsage } from "../../../stories/basicUsage";

const meta: Meta<typeof DropdownMenu> = {
  title: "Molecules/DropdownMenu",
  component: DropdownMenu,
};
export default meta;

type Story = StoryObj<typeof DropdownMenu>;

export const Default: Story = {
  parameters: { docs: { source: { code: basicUsage.DropdownMenu } } },
  args: {
    label: "actions",
    items: [
      { label: "preview", value: "preview" },
      { label: "duplicate", value: "duplicate" },
      { label: "archive", value: "archive" },
      { label: "delete", value: "delete", destructive: true },
    ],
  },
};
