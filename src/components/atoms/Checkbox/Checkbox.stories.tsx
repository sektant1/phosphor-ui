import type { Meta, StoryObj } from "@storybook/react";
import { Checkbox } from "./Checkbox";
import type { CheckboxProps } from "./Checkbox";
import { basicUsage } from "../../../stories/basicUsage";

const meta: Meta<CheckboxProps> = {
  title: "Atoms/Checkbox",
  component: Checkbox,
  argTypes: {
    label:          { control: "text" },
    defaultChecked: { control: "boolean" },
    disabled:       { control: "boolean" },
    error:          { control: "boolean" },
  },
  args: {
    label:          "engage shields",
    defaultChecked: false,
    disabled:       false,
    error:          false,
  },
};
export default meta;

export const Default: StoryObj<CheckboxProps> = {
  parameters: { docs: { source: { code: basicUsage.Checkbox } } },
};
