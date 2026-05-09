import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "../../atoms/Button";
import { Input, Textarea } from "../../atoms/Input";
import { Select } from "../../atoms/Select";
import { Form } from "./Form";
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
      <Input prompt="" placeholder="e.g. phosphor_user" />
    </FormField>
  ),
};

export const WithTextarea: StoryObj<FormFieldProps> = {
  args: {
    label: "summary",
    hint: "One or two short lines.",
  },
  render: (args) => (
    <FormField {...args}>
      <Textarea rows={4} placeholder="Write a compact summary..." />
    </FormField>
  ),
};

export const WithSelect: StoryObj<FormFieldProps> = {
  args: {
    label: "status",
    required: true,
  },
  render: (args) => (
    <FormField {...args}>
      <Select
        prompt=""
        defaultValue="draft"
        options={[
          { label: "draft", value: "draft" },
          { label: "published", value: "published" },
          { label: "archived", value: "archived" },
        ]}
      />
    </FormField>
  ),
};

export const FormExample: StoryObj<typeof Form> = {
  parameters: { docs: { source: { code: basicUsage.Form } } },
  render: () => (
    <Form
      title="Content form"
      description="Compact form shell using FormField internally."
      columns={2}
      fields={[
        {
          name: "title",
          label: "title",
          required: true,
          inputProps: { prompt: "", placeholder: "Signal report" },
        },
        {
          name: "status",
          label: "status",
          type: "select",
          options: [
            { label: "draft", value: "draft" },
            { label: "published", value: "published" },
          ],
          selectProps: { prompt: "", defaultValue: "draft" },
        },
        {
          name: "summary",
          label: "summary",
          type: "textarea",
          hint: "Used in previews and cards.",
          textareaProps: { rows: 4, placeholder: "Short summary..." },
        },
      ]}
      actions={<Button type="submit">Save</Button>}
    />
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
