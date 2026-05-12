import type { Meta, StoryObj } from "@storybook/react";
import { Checkbox, CheckboxControl } from "./Checkbox";
import type { CheckboxProps } from "./Checkbox";
import { source, tsx } from "../../../stories/source";

const meta: Meta<CheckboxProps> = {
  title: "Atoms/Checkbox",
  component: Checkbox,
  argTypes: {
    label:          { control: "text" },
    defaultChecked: { control: "boolean" },
    disabled:       { control: "boolean" },
    error:          { control: "boolean" },
    strikethrough:  { control: "boolean" },
  },
  args: {
    label:          "engage shields",
    defaultChecked: false,
    disabled:       false,
    error:          false,
    strikethrough:  true,
  },
};
export default meta;

const defaultSource = tsx`
import { Checkbox } from "phosphor-ui";

const defaultProps = {
    label:          "engage shields",
    defaultChecked: false,
    disabled:       false,
    error:          false,
    strikethrough:  true,
  };

export function Example() {
  return <Checkbox {...defaultProps} />;
}
`;

const errorCheckedSource = tsx`
import { Checkbox } from "phosphor-ui";



const errorCheckedProps = {
  ...{
    label:          "engage shields",
    defaultChecked: false,
    disabled:       false,
    error:          false,
    strikethrough:  true,
  },
  ...{
    label:          "checksum mismatch",
    defaultChecked: true,
    error:          true,
  },
};

export function Example() {
  return <Checkbox {...errorCheckedProps} />;
}
`;

const controlSource = tsx`
import { CheckboxControl } from "phosphor-ui";

export function Example() {
  return <CheckboxControl aria-label="Engage shields" defaultChecked />;
}
`;

export const Default: StoryObj<CheckboxProps> = {
  parameters: { docs: { source: source(defaultSource) } },
};

export const ErrorChecked: StoryObj<CheckboxProps> = {
  args: {
    label:          "checksum mismatch",
    defaultChecked: true,
    error:          true,
  },
  parameters: {
    docs: {
      source: source(errorCheckedSource),
    },
  },
};

export const Control: StoryObj = {
  parameters: { docs: { source: source(controlSource) } },
  render: () => <CheckboxControl aria-label="Engage shields" defaultChecked />,
};
