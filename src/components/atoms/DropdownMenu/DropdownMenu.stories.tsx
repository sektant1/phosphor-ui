import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { DropdownMenu } from "./DropdownMenu";
import { source, tsx } from "../../../stories/source";

const meta: Meta<typeof DropdownMenu> = {
  title: "Atoms/DropdownMenu",
  component: DropdownMenu,
};
export default meta;

const defaultSource = tsx`
import { DropdownMenu } from "phosphor-ui";



const defaultProps = {
    label: "actions",
    items: [
      { label: "preview", value: "preview" },
      { label: "duplicate", value: "duplicate" },
      { label: "archive", value: "archive" },
      { label: "delete", value: "delete", destructive: true },
    ],
  };

export function Example() {
  return <DropdownMenu {...defaultProps} />;
}
`;

const booleanSettingsSource = tsx`
import { DropdownMenu } from "phosphor-ui";

export function Example() {
  return (
    <div style={{ display: "grid", gap: "0.85rem", maxWidth: "26rem" }}>
      <DropdownMenu
        label="publish: enabled"
        menuLabel="Publish draft"
        items={[
          { label: "Enabled", value: "enabled" },
          { label: "Disabled", value: "disabled" },
        ]}
      />
      <DropdownMenu
        label="alerts: off"
        menuLabel="Terminal alerts"
        items={[
          { label: "On", value: "on" },
          { label: "Off", value: "off" },
        ]}
      />
      <DropdownMenu
        label="motion: default"
        menuLabel="Motion level"
        items={[
          { label: "Default", value: "default" },
          { label: "Reduced", value: "reduced" },
          { label: "Disabled", value: "disabled" },
        ]}
      />
    </div>
  );
}
`;

type Story = StoryObj<typeof DropdownMenu>;

export const Default: Story = {
  parameters: { docs: { source: source(defaultSource) } },
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

export const BooleanSettings: Story = {
  parameters: { docs: { source: source(booleanSettingsSource) } },
  render: () => (
    <div style={{ display: "grid", gap: "0.85rem", maxWidth: "26rem" }}>
      <DropdownMenu
        label="publish: enabled"
        menuLabel="Publish draft"
        items={[
          { label: "Enabled", value: "enabled" },
          { label: "Disabled", value: "disabled" },
        ]}
      />
      <DropdownMenu
        label="alerts: off"
        menuLabel="Terminal alerts"
        items={[
          { label: "On", value: "on" },
          { label: "Off", value: "off" },
        ]}
      />
      <DropdownMenu
        label="motion: default"
        menuLabel="Motion level"
        items={[
          { label: "Default", value: "default" },
          { label: "Reduced", value: "reduced" },
          { label: "Disabled", value: "disabled" },
        ]}
      />
    </div>
  ),
};
