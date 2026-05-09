import type { Meta, StoryObj } from "@storybook/react";
import { StatPill } from "./StatPill";
import type { StatPillProps } from "./StatPill";
import { basicUsage } from "../../../stories/basicUsage";

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

export const Default: StoryObj<StatPillProps> = {
  parameters: { docs: { source: { code: basicUsage.StatPill } } },
};

export const Tones: StoryObj<StatPillProps> = {
  render: () => (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem" }}>
      <StatPill label="status" value="STABLE" color="phosphor" />
      <StatPill label="signal" value="ACTIVE" color="magenta" />
      <StatPill label="sync" value="IDLE" color="dim" />
    </div>
  ),
};

export const LongValue: StoryObj<StatPillProps> = {
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
  render: () => (
    <div style={{ display: "grid", gap: "0.6rem", maxWidth: "24rem" }}>
      <StatPill label="build" value="PASS" color="phosphor" />
      <StatPill label="deploy" value="QUEUED" color="magenta" />
      <StatPill label="archive" value="COLD" color="dim" />
    </div>
  ),
};
