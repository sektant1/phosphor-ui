import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Stepper, StepperFoot } from "./Stepper";
import { source, tsx } from "../../../stories/source";

const meta: Meta<typeof Stepper> = {
  title: "Molecules/Stepper",
  component: Stepper,
};
export default meta;

const defaultSource = tsx`
import { Stepper, StepperFoot } from "@sektant1/phosphor-ui";

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
import { Stepper, StepperFoot } from "@sektant1/phosphor-ui";



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
