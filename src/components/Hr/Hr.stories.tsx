import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Hr } from "./Hr";

const meta: Meta<typeof Hr> = {
  title: "Components/Hr",
  component: Hr,
};
export default meta;

type Story = StoryObj<typeof Hr>;

export const Default: Story = {
  render: () => (
    <div style={{ width: 480 }}>
      <p>above</p>
      <Hr />
      <p>below</p>
    </div>
  ),
};
