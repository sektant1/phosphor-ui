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
    description: "open this channel to public readers",
    defaultChecked: true,
  },
};

export const Off: Story = {
  args: {
    label: "silent mode",
    description: "suppress terminal alerts",
    defaultChecked: false,
  },
};

export const Disabled: Story = {
  args: {
    label: "locked channel",
    disabled: true,
  },
};

export const DisabledChecked: Story = {
  args: {
    label: "armed relay",
    description: "locked by the current deployment",
    defaultChecked: true,
    disabled: true,
  },
};

export const Matrix: Story = {
  render: () => (
    <div style={{ display: "grid", gap: "0.85rem", maxWidth: "26rem" }}>
      <Switch label="publish draft" description="open this channel to public readers" defaultChecked />
      <Switch label="silent mode" description="suppress terminal alerts" />
      <Switch label="locked channel" description="requires elevated clearance" disabled />
    </div>
  ),
};
