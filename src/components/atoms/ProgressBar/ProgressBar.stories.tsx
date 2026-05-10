import type { Meta, StoryObj } from "@storybook/react";
import { ProgressBar } from "./ProgressBar";
import type { ProgressBarProps } from "./ProgressBar";
import { source, tsx } from "../../../stories/source";

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

const defaultSource = tsx`
import { ProgressBar } from "@sektant1/phosphor-ui";



const defaultProps = {
    label:       "decode",
    value:       42,
    total:       100,
    current:     false,
    slim:        false,
    showPercent: true,
  };

export function Example() {
  return <ProgressBar {...defaultProps} />;
}
`;

export const Default: StoryObj<ProgressBarProps> = {
  parameters: { docs: { source: source(defaultSource) } },
};
