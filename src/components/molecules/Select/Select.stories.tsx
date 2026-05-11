import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Select, SelectControl } from "./Select";
import { source, tsx } from "../../../stories/source";

const meta: Meta<typeof Select> = {
  title: "Molecules/Select",
  component: Select,
  argTypes: {
    prompt: { control: "boolean" },
  },
  args: {
    prompt: false,
  },
};
export default meta;

const defaultSource = tsx`
import { Select } from "@sektant1/phosphor-ui";

const defaultProps = {
    label: "status",
    prompt: false,
    helpText: "route content through the selected publication state",
    defaultValue: "draft",
    options: [
      { label: "draft", value: "draft" },
      { label: "review", value: "review" },
      { label: "published", value: "published" },
    ],
  };

export function Example() {
  return <Select {...defaultProps} />;
}
`;

const errorSource = tsx`
import { Select } from "@sektant1/phosphor-ui";

const errorProps = {
    label: "clearance",
    prompt: false,
    defaultValue: "invalid",
    error: "clearance level rejected",
    options: [
      { label: "guest", value: "guest" },
      { label: "invalid", value: "invalid" },
      { label: "operator", value: "operator" },
    ],
  };

export function Example() {
  return <Select {...errorProps} />;
}
`;

const disabledSource = tsx`
import { Select } from "@sektant1/phosphor-ui";

const disabledProps = {
    label: "uplink",
    prompt: false,
    defaultValue: "offline",
    disabled: true,
    helpText: "locked while synchronization is offline",
    options: [
      { label: "offline", value: "offline" },
      { label: "standby", value: "standby" },
      { label: "online", value: "online" },
    ],
  };

export function Example() {
  return <Select {...disabledProps} />;
}
`;

const longValueSource = tsx`
import { Select } from "@sektant1/phosphor-ui";



const longValueProps = {
    label: "routing profile",
    prompt: false,
    defaultValue: "field-ops-extended",
    options: [
      { label: "field operations extended telemetry channel", value: "field-ops-extended" },
      { label: "quiet maintenance", value: "quiet-maintenance" },
      { label: "diagnostics", value: "diagnostics" },
    ],
  };

export function Example() {
  return <Select {...longValueProps} />;
}
`;

const controlSource = tsx`
import { SelectControl } from "@sektant1/phosphor-ui";

export function Example() {
  return (
    <SelectControl
      aria-label="Status"
      defaultValue="draft"
      options={[
        { label: "draft", value: "draft" },
        { label: "published", value: "published" },
      ]}
    />
  );
}
`;

type Story = StoryObj<typeof Select>;

export const Default: Story = {
  parameters: { docs: { source: source(defaultSource) } },
  args: {
    label: "status",
    prompt: false,
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
  parameters: { docs: { source: source(errorSource) } },
  args: {
    label: "clearance",
    prompt: false,
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
  parameters: { docs: { source: source(disabledSource) } },
  args: {
    label: "uplink",
    prompt: false,
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
  parameters: { docs: { source: source(longValueSource) } },
  args: {
    label: "routing profile",
    prompt: false,
    defaultValue: "field-ops-extended",
    options: [
      { label: "field operations extended telemetry channel", value: "field-ops-extended" },
      { label: "quiet maintenance", value: "quiet-maintenance" },
      { label: "diagnostics", value: "diagnostics" },
    ],
  },
};

export const Control: StoryObj<typeof SelectControl> = {
  parameters: { docs: { source: source(controlSource) } },
  render: () => (
    <SelectControl
      aria-label="Status"
      defaultValue="draft"
      options={[
        { label: "draft", value: "draft" },
        { label: "published", value: "published" },
      ]}
    />
  ),
};
