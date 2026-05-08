import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Select } from "./Select";
import { basicUsage } from "../../../stories/basicUsage";

const meta: Meta<typeof Select> = {
  title: "Atoms/Select",
  component: Select,
};
export default meta;

type Story = StoryObj<typeof Select>;

export const Default: Story = {
  parameters: { docs: { source: { code: basicUsage.Select } } },
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
