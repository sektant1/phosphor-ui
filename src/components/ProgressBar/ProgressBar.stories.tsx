import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { ProgressBar } from "./ProgressBar";

const meta: Meta<typeof ProgressBar> = {
  title: "Components/ProgressBar",
  component: ProgressBar,
};
export default meta;

type Story = StoryObj<typeof ProgressBar>;

export const Default: Story = {
  args: { label: "decode", value: 42 },
};

export const Current: Story = {
  args: { label: "lesson", value: 60, current: true },
};

export const Slim: Story = {
  args: { value: 80, slim: true, showPercent: false },
};

export const WithMeta: Story = {
  args: { label: "module 02", value: 7, total: 12, meta: "7 of 12 lessons" },
};
