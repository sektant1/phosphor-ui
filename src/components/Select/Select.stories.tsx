import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Select } from "./Select";

const meta: Meta<typeof Select> = {
  title: "Components/Select",
  component: Select,
};
export default meta;

type Story = StoryObj<typeof Select>;

export const Default: Story = {
  args: {
    label: "status",
    defaultValue: "draft",
    options: [
      { label: "draft", value: "draft" },
      { label: "review", value: "review" },
      { label: "published", value: "published" },
    ],
  },
};
