import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Switch } from "./Switch";
import { basicUsage } from "../../../stories/basicUsage";

const meta: Meta<typeof Switch> = {
  title: "Atoms/Switch",
  component: Switch,
};
export default meta;

type Story = StoryObj<typeof Switch>;

export const Default: Story = {
  parameters: { docs: { source: { code: basicUsage.Switch } } },
  args: {
    label: "publish draft",
    defaultChecked: true,
  },
};

export const Disabled: Story = {
  args: {
    label: "locked channel",
    disabled: true,
  },
};
