import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Switch, SwitchControl } from "./Switch";
import { source, tsx } from "../../../stories/source";

const meta: Meta<typeof Switch> = {
  title: "Atoms/Switch",
  component: Switch,
};
export default meta;

const defaultSource = tsx`
import { Switch } from "@sektant1/phosphor-ui";

const defaultProps = {
    label: "publish draft",
    description: "open this channel to public readers",
    defaultChecked: true,
  };

export function Example() {
  return <Switch {...defaultProps} />;
}
`;

const offSource = tsx`
import { Switch } from "@sektant1/phosphor-ui";

const offProps = {
    label: "silent mode",
    description: "suppress terminal alerts",
    defaultChecked: false,
  };

export function Example() {
  return <Switch {...offProps} />;
}
`;

const disabledSource = tsx`
import { Switch } from "@sektant1/phosphor-ui";

const disabledProps = {
    label: "locked channel",
    disabled: true,
  };

export function Example() {
  return <Switch {...disabledProps} />;
}
`;

const disabledCheckedSource = tsx`
import { Switch } from "@sektant1/phosphor-ui";

const disabledCheckedProps = {
    label: "armed relay",
    description: "locked by the current deployment",
    defaultChecked: true,
    disabled: true,
  };

export function Example() {
  return <Switch {...disabledCheckedProps} />;
}
`;

const matrixSource = tsx`
import { Switch } from "@sektant1/phosphor-ui";



export function Example() {
  return (
      <div style={{ display: "grid", gap: "0.85rem", maxWidth: "26rem" }}>
        <Switch label="publish draft" description="open this channel to public readers" defaultChecked />
        <Switch label="silent mode" description="suppress terminal alerts" />
        <Switch label="locked channel" description="requires elevated clearance" disabled />
      </div>
    );
}
`;

const controlSource = tsx`
import { SwitchControl } from "@sektant1/phosphor-ui";

export function Example() {
  return <SwitchControl aria-label="Publish draft" defaultChecked />;
}
`;

type Story = StoryObj<typeof Switch>;

export const Default: Story = {
  parameters: { docs: { source: source(defaultSource) } },
  args: {
    label: "publish draft",
    description: "open this channel to public readers",
    defaultChecked: true,
  },
};

export const Off: Story = {
  parameters: { docs: { source: source(offSource) } },
  args: {
    label: "silent mode",
    description: "suppress terminal alerts",
    defaultChecked: false,
  },
};

export const Disabled: Story = {
  parameters: { docs: { source: source(disabledSource) } },
  args: {
    label: "locked channel",
    disabled: true,
  },
};

export const DisabledChecked: Story = {
  parameters: { docs: { source: source(disabledCheckedSource) } },
  args: {
    label: "armed relay",
    description: "locked by the current deployment",
    defaultChecked: true,
    disabled: true,
  },
};

export const Matrix: Story = {
  parameters: { docs: { source: source(matrixSource) } },
  render: () => (
    <div style={{ display: "grid", gap: "0.85rem", maxWidth: "26rem" }}>
      <Switch label="publish draft" description="open this channel to public readers" defaultChecked />
      <Switch label="silent mode" description="suppress terminal alerts" />
      <Switch label="locked channel" description="requires elevated clearance" disabled />
    </div>
  ),
};

export const Control: StoryObj<typeof SwitchControl> = {
  parameters: { docs: { source: source(controlSource) } },
  render: () => <SwitchControl aria-label="Publish draft" defaultChecked />,
};
