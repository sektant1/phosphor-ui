import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { PdaWindow } from "./PdaWindow";
import { source, tsx } from "../../../stories/source";

const meta: Meta<typeof PdaWindow> = {
  title: "Molecules/PdaWindow",
  component: PdaWindow,
};
export default meta;

const defaultSource = tsx`
import { PdaWindow } from "@sektant1/phosphor-ui";



const defaultProps = {
    title: "PDA-04",
    meta: "v1.2",
    leds: ["rec", "rx", "pwr"],
    children: (
      <div style={{ padding: "1rem", fontFamily: "monospace", color: "#a8ff60" }}>
        decoding incoming transmission...
      </div>
    ),
  };

export function Example() {
  return <PdaWindow {...defaultProps} />;
}
`;

type Story = StoryObj<typeof PdaWindow>;

export const Default: Story = {
  parameters: { docs: { source: source(defaultSource) } },
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
