import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { FormField } from "./FormField";
import { ContentStatusBadge } from "./FormField";
import type { FormFieldProps } from "./FormField";

const meta: Meta<FormFieldProps> = {
  title: "Components/FormField",
  component: FormField,
  argTypes: {
    required: { control: "boolean" },
    hint:     { control: "text" },
    error:    { control: "text" },
    label:    { control: "text" },
  },
  args: {
    label:    "Username",
    hint:     "Letters and numbers only.",
    error:    "",
    required: false,
  },
};
export default meta;

export const Field: StoryObj<FormFieldProps> = {
  render: (args) => (
    <FormField {...args}>
      <input placeholder="e.g. phosphor_user" />
    </FormField>
  ),
};

export const StatusBadges: StoryObj<FormFieldProps> = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
      <ContentStatusBadge status="draft" />
      <ContentStatusBadge status="published" />
      <ContentStatusBadge status="archived" />
    </div>
  ),
};
