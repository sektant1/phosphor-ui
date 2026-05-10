import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Input, Textarea } from "./Input";
import type { InputProps, TextareaProps } from "./Input";
import { source, tsx } from "../../../stories/source";

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

const defaultSource = tsx`
import { Input, Textarea } from "@sektant1/phosphor-ui";

const defaultProps = {
    prompt:      "~/$",
    placeholder: "type command",
    cursor:      true,
  };

export function Example() {
  return <Input {...defaultProps} />;
}
`;

const textAreaSource = tsx`
import React from "react";
import { Input, Textarea } from "@sektant1/phosphor-ui";



export function Example() {
  const props = {
    ...{
      prompt:      "~/$",
      placeholder: "type command",
      cursor:      true,
    },
    ...{ rows: 4, placeholder: "multi-line transmission..." },
  };

  return React.createElement(Textarea, props);
}
`;

export const Default: StoryObj<InputProps> = {
  parameters: { docs: { source: source(defaultSource) } },
};

export const TextArea: StoryObj<TextareaProps> = {
  parameters: { docs: { source: source(textAreaSource) } },
  render: (args) => React.createElement(Textarea, args),
  args: { rows: 4, placeholder: "multi-line transmission..." },
};
