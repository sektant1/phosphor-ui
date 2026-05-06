import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Input, Textarea } from "./Input";

const meta: Meta<typeof Input> = {
  title: "Components/Input",
  component: Input,
};
export default meta;

type Story = StoryObj<typeof Input>;

export const Default: Story = {
  args: { placeholder: "type command" },
};

export const CustomPrompt: Story = {
  args: { prompt: "root@phosphor #", placeholder: "..." },
};

export const NoCursor: Story = {
  args: { cursor: false, placeholder: "no cursor" },
};

export const TextareaDefault: StoryObj<typeof Textarea> = {
  render: (args) => <Textarea {...args} />,
  args: { rows: 4, placeholder: "multi-line transmission..." },
};
