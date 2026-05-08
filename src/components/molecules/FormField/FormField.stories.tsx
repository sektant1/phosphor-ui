import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { FormField } from "./FormField";
import { ContentStatusBadge } from "./FormField";
import type { FormFieldProps } from "./FormField";
import { basicUsage } from "../../../stories/basicUsage";

const meta: Meta<FormFieldProps> = {
  title: "Molecules/FormField",
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

export const Default: StoryObj<FormFieldProps> = {
  parameters: { docs: { source: { code: basicUsage.FormField } } },
  render: (args) => (
    <FormField {...args}>
      <input placeholder="e.g. phosphor_user" />
    </FormField>
  ),
};

export const StatusBadges: StoryObj<FormFieldProps> = {
  parameters: { docs: { source: { code: basicUsage.ContentStatusBadge } } },
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
      <ContentStatusBadge status="draft" />
      <ContentStatusBadge status="published" />
      <ContentStatusBadge status="archived" />
    </div>
  ),
};
