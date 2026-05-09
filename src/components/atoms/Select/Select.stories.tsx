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
    prompt: "mode",
    helpText: "route content through the selected publication state",
    defaultValue: "draft",
    options: [
      { label: "draft", value: "draft" },
      { label: "review", value: "review" },
      { label: "published", value: "published" },
    ],
  },
};

export const Error: Story = {
  args: {
    label: "clearance",
    prompt: "auth",
    defaultValue: "invalid",
    error: "clearance level rejected",
    options: [
      { label: "guest", value: "guest" },
      { label: "invalid", value: "invalid" },
      { label: "operator", value: "operator" },
    ],
  },
};

export const Disabled: Story = {
  args: {
    label: "uplink",
    prompt: "lock",
    defaultValue: "offline",
    disabled: true,
    helpText: "locked while synchronization is offline",
    options: [
      { label: "offline", value: "offline" },
      { label: "standby", value: "standby" },
      { label: "online", value: "online" },
    ],
  },
};

export const LongValue: Story = {
  args: {
    label: "routing profile",
    prompt: "profile",
    defaultValue: "field-ops-extended",
    options: [
      { label: "field operations extended telemetry channel", value: "field-ops-extended" },
      { label: "quiet maintenance", value: "quiet-maintenance" },
      { label: "diagnostics", value: "diagnostics" },
    ],
  },
};
