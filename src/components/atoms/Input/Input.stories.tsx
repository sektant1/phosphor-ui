import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Input, Textarea } from "./Input";
import type { InputProps, TextareaProps } from "./Input";
import { basicUsage } from "../../../stories/basicUsage";

const meta: Meta<InputProps> = {
  title: "Atoms/Input",
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

export const Default: StoryObj<InputProps> = {
  parameters: { docs: { source: { code: basicUsage.Input } } },
};

export const TextArea: StoryObj<TextareaProps> = {
  parameters: { docs: { source: { code: basicUsage.Textarea } } },
  render: (args) => React.createElement(Textarea, args),
  args: { rows: 4, placeholder: "multi-line transmission..." },
};
