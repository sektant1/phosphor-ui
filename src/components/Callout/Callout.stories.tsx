import type { Meta, StoryObj } from "@storybook/react";
import { Callout } from "./Callout";
import type { CalloutProps } from "./Callout";

const meta: Meta<CalloutProps> = {
  title: "Components/Callout",
  component: Callout,
  argTypes: {
    variant: { control: "inline-radio", options: ["info", "quote", "warn"] },
    title:   { control: "text" },
  },
  args: {
    variant:  "info",
    title:    "// transmission",
    children: "Signal acquired. Decoding payload.",
  },
};
export default meta;

export const Default: StoryObj<CalloutProps> = {};
