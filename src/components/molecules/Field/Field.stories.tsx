import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { InputControl, TextareaControl } from "../../atoms/Input";
import { SelectControl } from "../../atoms/Select";
import { ControlFrame, Field, FieldError, FieldHint, FieldLabel } from "./Field";
import type { FieldProps } from "./Field";
import { source, tsx } from "../../../stories/source";

const meta: Meta<FieldProps> = {
  title: "Molecules/Field",
  component: Field,
  parameters: {
    docs: {
      description: {
        component:
          "Composes labels, control framing, hints, and errors around atom controls.",
      },
    },
  },
};

export default meta;

const defaultSource = tsx`
import { Field, InputControl } from "@sektant1/phosphor-ui";

export function Example() {
  return (
    <Field label="Command" htmlFor="command" hint="Press enter to transmit.">
      <InputControl id="command" placeholder="type command" prompt="~/$" cursor />
    </Field>
  );
}
`;

const errorSource = tsx`
import { Field, SelectControl, TextareaControl } from "@sektant1/phosphor-ui";

export function Example() {
  return (
    <div style={{ display: "grid", gap: "0.9rem" }}>
      <Field label="Channel" htmlFor="channel" required error="Channel is required.">
        <SelectControl
          id="channel"
          prompt="CH"
          options={[
            { label: "Select channel", value: "" },
            { label: "0x4C", value: "0x4c" },
            { label: "0x7A", value: "0x7a" },
          ]}
        />
      </Field>
      <Field label="Packet" htmlFor="packet" hint="Keep the message under 120 bytes.">
        <TextareaControl id="packet" rows={3} placeholder="compose packet..." />
      </Field>
    </div>
  );
}
`;

const anatomySource = tsx`
import { ControlFrame, FieldError, FieldHint, FieldLabel, InputControl } from "@sektant1/phosphor-ui";

export function Example() {
  return (
    <div style={{ display: "grid", gap: "0.35rem" }}>
      <FieldLabel htmlFor="operator" required>
        Operator
      </FieldLabel>
      <ControlFrame invalid>
        <InputControl id="operator" placeholder="call sign" />
      </ControlFrame>
      <FieldHint>Visible when there is no error.</FieldHint>
      <FieldError>Call sign is required.</FieldError>
    </div>
  );
}
`;

export const Default: StoryObj<FieldProps> = {
  parameters: { docs: { source: source(defaultSource) } },
  render: () => (
    <Field label="Command" htmlFor="command" hint="Press enter to transmit.">
      <InputControl id="command" placeholder="type command" prompt="~/$" cursor />
    </Field>
  ),
};

export const ErrorState: StoryObj<FieldProps> = {
  parameters: { docs: { source: source(errorSource) } },
  render: () => (
    <div style={{ display: "grid", gap: "0.9rem" }}>
      <Field label="Channel" htmlFor="channel" required error="Channel is required.">
        <SelectControl
          id="channel"
          prompt="CH"
          options={[
            { label: "Select channel", value: "" },
            { label: "0x4C", value: "0x4c" },
            { label: "0x7A", value: "0x7a" },
          ]}
        />
      </Field>
      <Field label="Packet" htmlFor="packet" hint="Keep the message under 120 bytes.">
        <TextareaControl id="packet" rows={3} placeholder="compose packet..." />
      </Field>
    </div>
  ),
};

export const Anatomy: StoryObj = {
  parameters: { docs: { source: source(anatomySource) } },
  render: () => (
    <div style={{ display: "grid", gap: "0.35rem" }}>
      <FieldLabel htmlFor="operator" required>
        Operator
      </FieldLabel>
      <ControlFrame invalid>
        <InputControl id="operator" placeholder="call sign" />
      </ControlFrame>
      <FieldHint>Visible when there is no error.</FieldHint>
      <FieldError>Call sign is required.</FieldError>
    </div>
  ),
};
