import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Stepper, StepperFoot } from "./Stepper";

const meta: Meta<typeof Stepper> = {
  title: "Components/Stepper",
  component: Stepper,
};
export default meta;

type Story = StoryObj<typeof Stepper>;

export const Breadcrumbs: Story = {
  args: {
    items: [
      { label: "home", href: "#", num: "01", done: true },
      { label: "courses", href: "#", num: "02", done: true },
      { label: "phosphor", num: "03", current: true },
    ],
  },
};

export const Foot: StoryObj<typeof StepperFoot> = {
  render: () => (
    <StepperFoot
      prev={{ href: "#", kind: "lesson", name: "boot sequence" }}
      next={{ href: "#", kind: "lesson", name: "decode the signal" }}
    />
  ),
};
