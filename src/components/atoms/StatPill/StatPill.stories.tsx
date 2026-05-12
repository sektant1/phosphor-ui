import type { Meta, StoryObj } from "@storybook/react";
import { StatPill } from "./StatPill";
import type { StatPillProps } from "./StatPill";
import { source, tsx } from "../../../stories/source";

const meta: Meta<StatPillProps> = {
  title: "Atoms/StatPill",
  component: StatPill,
  argTypes: {
    color: { control: "inline-radio", options: ["phosphor", "magenta", "dim"] },
  },
  args: {
    label: "status",
    value: "STABLE",
    color: "phosphor",
  },
};
export default meta;

const defaultSource = tsx`
import { StatPill } from "phosphor-ui";

const defaultProps = {
    label: "status",
    value: "STABLE",
    color: "phosphor",
  };

export function Example() {
  return <StatPill {...defaultProps} />;
}
`;

const tonesSource = tsx`
import { StatPill } from "phosphor-ui";

export function Example() {
  return (
      <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem" }}>
        <StatPill label="status" value="STABLE" color="phosphor" />
        <StatPill label="signal" value="ACTIVE" color="magenta" />
        <StatPill label="sync" value="IDLE" color="dim" />
      </div>
    );
}
`;

const longValueSource = tsx`
import { StatPill } from "phosphor-ui";

const longValueProps = {
  ...{
    label: "status",
    value: "STABLE",
    color: "phosphor",
  },
  ...{
    label: "route",
    value: "FIELD-OPERATIONS-EXTENDED",
    color: "phosphor",
  },
};

export function Example() {
  return <StatPill {...longValueProps} />;
}
`;

const statusRowSource = tsx`
import { StatPill } from "phosphor-ui";



export function Example() {
  return (
      <div style={{ display: "grid", gap: "0.6rem", maxWidth: "24rem" }}>
        <StatPill label="build" value="PASS" color="phosphor" />
        <StatPill label="deploy" value="QUEUED" color="magenta" />
        <StatPill label="archive" value="COLD" color="dim" />
      </div>
    );
}
`;

export const Default: StoryObj<StatPillProps> = {
  parameters: { docs: { source: source(defaultSource) } },
};

export const Tones: StoryObj<StatPillProps> = {
  parameters: { docs: { source: source(tonesSource) } },
  render: () => (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem" }}>
      <StatPill label="status" value="STABLE" color="phosphor" />
      <StatPill label="signal" value="ACTIVE" color="magenta" />
      <StatPill label="sync" value="IDLE" color="dim" />
    </div>
  ),
};

export const LongValue: StoryObj<StatPillProps> = {
  parameters: { docs: { source: source(longValueSource) } },
  args: {
    label: "route",
    value: "FIELD-OPERATIONS-EXTENDED",
    color: "phosphor",
  },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: "17rem" }}>
        <Story />
      </div>
    ),
  ],
};

export const StatusRow: StoryObj<StatPillProps> = {
  parameters: { docs: { source: source(statusRowSource) } },
  render: () => (
    <div style={{ display: "grid", gap: "0.6rem", maxWidth: "24rem" }}>
      <StatPill label="build" value="PASS" color="phosphor" />
      <StatPill label="deploy" value="QUEUED" color="magenta" />
      <StatPill label="archive" value="COLD" color="dim" />
    </div>
  ),
};
