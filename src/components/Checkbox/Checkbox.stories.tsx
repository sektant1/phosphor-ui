import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Checkbox } from "./Checkbox";

const meta: Meta<typeof Checkbox> = {
  title: "Components/Checkbox",
  component: Checkbox,
};
export default meta;

type Story = StoryObj<typeof Checkbox>;

export const Default: Story = { args: { label: "engage shields" } };
export const Checked: Story = { args: { label: "shields up", defaultChecked: true } };
export const Disabled: Story = { args: { label: "offline", disabled: true } };
export const Error: Story = { args: { label: "fault", error: true } };
