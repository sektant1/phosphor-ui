import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "../../atoms/Button";
import { Input, Textarea } from "../../atoms/Input";
import { Select } from "../../atoms/Select";
import { Form } from "./Form";
import { FormField } from "./FormField";
import { ContentStatusBadge } from "./FormField";
import type { FormFieldProps } from "./FormField";
import { source, tsx } from "../../../stories/source";

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

const defaultSource = tsx`
import React from "react";
import { Button, ContentStatusBadge, Form, FormField, Input, Select, Textarea } from "@sektant1/phosphor-ui";

export function Example() {
  const props = {
      label:    "Username",
      hint:     "Letters and numbers only.",
      error:    "",
      required: false,
    };

  return (
      <FormField {...props}>
        <Input prompt="" placeholder="e.g. phosphor_user" />
      </FormField>
    );
}
`;

const withTextareaSource = tsx`
import { Button, ContentStatusBadge, Form, FormField, Input, Select, Textarea } from "@sektant1/phosphor-ui";

export function Example() {
  const props = {
    ...{
      label:    "Username",
      hint:     "Letters and numbers only.",
      error:    "",
      required: false,
    },
    ...{
      label: "summary",
      hint: "One or two short lines.",
    },
  };

  return (
      <FormField {...props}>
        <Textarea rows={4} placeholder="Write a compact summary..." />
      </FormField>
    );
}
`;

const withSelectSource = tsx`
import { Button, ContentStatusBadge, Form, FormField, Input, Select, Textarea } from "@sektant1/phosphor-ui";

export function Example() {
  const props = {
    ...{
      label:    "Username",
      hint:     "Letters and numbers only.",
      error:    "",
      required: false,
    },
    ...{
      label: "status",
      required: true,
    },
  };

  return (
      <FormField {...props}>
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
    );
}
`;

const formExampleSource = tsx`
import { Button, ContentStatusBadge, Form, FormField, Input, Select, Textarea } from "@sektant1/phosphor-ui";

export function Example() {
  return (
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
    );
}
`;

const statusBadgesSource = tsx`
import { Button, ContentStatusBadge, Form, FormField, Input, Select, Textarea } from "@sektant1/phosphor-ui";



export function Example() {
  return (
      <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
        <ContentStatusBadge status="draft" />
        <ContentStatusBadge status="published" />
        <ContentStatusBadge status="archived" />
      </div>
    );
}
`;

export const Default: StoryObj<FormFieldProps> = {
  parameters: { docs: { source: source(defaultSource) } },
  render: (args) => (
    <FormField {...args}>
      <Input prompt="" placeholder="e.g. phosphor_user" />
    </FormField>
  ),
};

export const WithTextarea: StoryObj<FormFieldProps> = {
  parameters: { docs: { source: source(withTextareaSource) } },
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
  parameters: { docs: { source: source(withSelectSource) } },
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
  parameters: { docs: { source: source(formExampleSource) } },
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
  parameters: { docs: { source: source(statusBadgesSource) } },

  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
      <ContentStatusBadge status="draft" />
      <ContentStatusBadge status="published" />
      <ContentStatusBadge status="archived" />
    </div>
  ),
};
