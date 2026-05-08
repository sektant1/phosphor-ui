import type { Meta, StoryObj } from "@storybook/react";
import { ProgressBar } from "./ProgressBar";
import type { ProgressBarProps } from "./ProgressBar";
import { basicUsage } from "../../../stories/basicUsage";

const meta: Meta<ProgressBarProps> = {
  title: "Atoms/ProgressBar",
  component: ProgressBar,
  argTypes: {
    label:       { control: "text" },
    value:       { control: { type: "range", min: 0, max: 100, step: 1 } },
    total:       { control: "number" },
    current:     { control: "boolean" },
    slim:        { control: "boolean" },
    showPercent: { control: "boolean" },
    meta:        { control: "text" },
  },
  args: {
    label:       "decode",
    value:       42,
    total:       100,
    current:     false,
    slim:        false,
    showPercent: true,
  },
};
export default meta;

export const Default: StoryObj<ProgressBarProps> = {
  parameters: { docs: { source: { code: basicUsage.ProgressBar } } },
};
