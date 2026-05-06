import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "./Button";
import type { ButtonProps } from "./Button";

const meta: Meta<ButtonProps> = {
  title: "Components/Button",
  component: Button,
  argTypes: {
    variant:  { control: "inline-radio", options: ["primary", "ghost", "danger"] },
    size:     { control: "inline-radio", options: ["sm", "md"] },
    disabled: { control: "boolean" },
    pressed:  { control: "boolean" },
  },
  args: {
    children: "Engage",
    variant:  "primary",
    size:     "md",
    disabled: false,
    pressed:  false,
  },
};
export default meta;

export const Default: StoryObj<ButtonProps> = {};
