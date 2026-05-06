import type { Meta, StoryObj } from "@storybook/react";
import { Checkbox } from "./Checkbox";
import type { CheckboxProps } from "./Checkbox";

const meta: Meta<CheckboxProps> = {
  title: "Components/Checkbox",
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

export const Default: StoryObj<CheckboxProps> = {};
