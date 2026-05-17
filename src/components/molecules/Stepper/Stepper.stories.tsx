import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Stepper, StepperFoot } from "./Stepper";
import type { StepperProps } from "./Stepper";
import { source, tsx } from "../../../stories/source";

const meta: Meta<StepperProps> = {
  title: "Molecules/Stepper",
  component: Stepper,
  argTypes: {
    items: { control: "object" },
    separator: { control: "text" },
    ariaLabel: { control: "text" },
  },
};
export default meta;

const defaultSource = tsx`
import { Stepper, StepperFoot } from "phosphor-ui";

const defaultProps = {
    items: [
      { label: "home", href: "#", num: "01", done: true },
      { label: "courses", href: "#", num: "02", done: true },
      { label: "phosphor", num: "03", current: true },
    ],
  };

export function Example() {
  return <Stepper {...defaultProps} />;
}
`;

const footSource = tsx`
import { Stepper, StepperFoot } from "phosphor-ui";



export function Example() {
  return (
      <StepperFoot
        prev={{ href: "#", kind: "lesson", name: "boot sequence" }}
        next={{ href: "#", kind: "lesson", name: "decode the signal" }}
      />
    );
}
`;

type Story = StoryObj<typeof Stepper>;

export const Default: Story = {
  parameters: { docs: { source: source(defaultSource) } },
  args: {
    items: [
      { label: "home", href: "#", num: "01", done: true },
      { label: "courses", href: "#", num: "02", done: true },
      { label: "phosphor", num: "03", current: true },
    ],
  },
};

export const Foot: StoryObj<typeof StepperFoot> = {
  parameters: { docs: { source: source(footSource) } },
  render: () => (
    <StepperFoot
      prev={{ href: "#", kind: "lesson", name: "boot sequence" }}
      next={{ href: "#", kind: "lesson", name: "decode the signal" }}
    />
  ),
};
