import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { PdaWindow } from "./PdaWindow";

const meta: Meta<typeof PdaWindow> = {
  title: "Components/PdaWindow",
  component: PdaWindow,
};
export default meta;

type Story = StoryObj<typeof PdaWindow>;

export const Default: Story = {
  args: {
    title: "PDA-04",
    meta: "v1.2",
    leds: ["rec", "rx", "pwr"],
    children: (
      <div style={{ padding: "1rem", fontFamily: "monospace", color: "#a8ff60" }}>
        decoding incoming transmission...
      </div>
    ),
  },
};
