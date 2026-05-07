import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { DropdownMenu } from "./DropdownMenu";

const meta: Meta<typeof DropdownMenu> = {
  title: "Components/DropdownMenu",
  component: DropdownMenu,
};
export default meta;

type Story = StoryObj<typeof DropdownMenu>;

export const Default: Story = {
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
