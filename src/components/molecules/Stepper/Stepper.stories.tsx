import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Stepper, StepperFoot } from "./Stepper";
import { basicUsage } from "../../../stories/basicUsage";

const meta: Meta<typeof Stepper> = {
  title: "Molecules/Stepper",
  component: Stepper,
};
export default meta;

type Story = StoryObj<typeof Stepper>;

export const Default: Story = {
  parameters: { docs: { source: { code: basicUsage.Stepper } } },
  args: {
    items: [
      { label: "home", href: "#", num: "01", done: true },
      { label: "courses", href: "#", num: "02", done: true },
      { label: "phosphor", num: "03", current: true },
    ],
  },
};

export const Foot: StoryObj<typeof StepperFoot> = {
  parameters: { docs: { source: { code: basicUsage.StepperFoot } } },
  render: () => (
    <StepperFoot
      prev={{ href: "#", kind: "lesson", name: "boot sequence" }}
      next={{ href: "#", kind: "lesson", name: "decode the signal" }}
    />
  ),
};
