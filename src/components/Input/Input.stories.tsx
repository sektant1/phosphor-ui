import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Input, Textarea } from "./Input";
import type { InputProps, TextareaProps } from "./Input";

const meta: Meta<InputProps> = {
  title: "Components/Input",
  component: Input,
  argTypes: {
    prompt:      { control: "text" },
    placeholder: { control: "text" },
    cursor:      { control: "boolean" },
  },
  args: {
    prompt:      "~/$",
    placeholder: "type command",
    cursor:      true,
  },
};
export default meta;

export const Default: StoryObj<InputProps> = {};

export const TextArea: StoryObj<TextareaProps> = {
  render: (args) => React.createElement(Textarea, args),
  args: { rows: 4, placeholder: "multi-line transmission..." },
};
