import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Callout, CalloutHeading } from "./Callout";

const meta: Meta<typeof Callout> = {
  title: "Components/Callout",
  component: Callout,
  argTypes: {
    variant: { control: "inline-radio", options: ["info", "quote", "warn"] },
  },
};
export default meta;

type Story = StoryObj<typeof Callout>;

export const Info: Story = {
  args: {
    variant: "info",
    title: "// transmission",
    children: "Signal acquired. Decoding payload.",
  },
};

export const Quote: Story = {
  args: {
    variant: "quote",
    children: "The only winning move is not to play.",
  },
};

export const Warn: Story = {
  args: {
    variant: "warn",
    title: "// caution",
    children: "Containment breach in sector 7G.",
  },
};

export const WithHeading: Story = {
  render: () => (
    <Callout variant="info">
      <CalloutHeading>Phosphor protocol</CalloutHeading>
      <p>Engage with care.</p>
    </Callout>
  ),
};
