import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Hr } from "./Hr";
import { basicUsage } from "../../../stories/basicUsage";

const meta: Meta<typeof Hr> = {
  title: "Atoms/Hr",
  component: Hr,
};
export default meta;

type Story = StoryObj<typeof Hr>;

export const Default: Story = {
  parameters: { docs: { source: { code: basicUsage.Hr } } },
  render: () => (
    <div style={{ width: 480 }}>
      <p>above</p>
      <Hr />
      <p>below</p>
    </div>
  ),
};
