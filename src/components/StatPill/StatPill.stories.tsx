import type { Meta, StoryObj } from "@storybook/react";
import { StatPill } from "./StatPill";
import type { StatPillProps } from "./StatPill";

const meta: Meta<StatPillProps> = {
  title: "Components/StatPill",
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

export const Default: StoryObj<StatPillProps> = {};
