import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { CrtShell } from "./CrtShell";
import { source, tsx } from "../../../stories/source";

const meta: Meta<typeof CrtShell> = {
  title: "Templates/CrtShell",
  component: CrtShell,
  parameters: { layout: "fullscreen" },
};
export default meta;

const defaultSource = tsx`
import { CrtShell } from "@sektant1/phosphor-ui";

const defaultProps = {
    children: (
      <div style={{ padding: "4rem", color: "#a8ff60", fontFamily: "monospace" }}>
        <h1>~/zone-net $</h1>
        <p>signal locked. phosphor stable.</p>
      </div>
    ),
  };

export function Example() {
  return <CrtShell {...defaultProps} />;
}
`;

const noEffectsSource = tsx`
import { CrtShell } from "@sektant1/phosphor-ui";



const noEffectsProps = {
    disableNoise: true,
    disableScanlines: true,
    disableVignette: true,
    disableTick: true,
    children: (
      <div style={{ padding: "4rem", color: "#a8ff60", fontFamily: "monospace" }}>
        plain shell
      </div>
    ),
  };

export function Example() {
  return <CrtShell {...noEffectsProps} />;
}
`;

type Story = StoryObj<typeof CrtShell>;

export const Default: Story = {
  parameters: { docs: { source: source(defaultSource) } },
  args: {
    children: (
      <div style={{ padding: "4rem", color: "#a8ff60", fontFamily: "monospace" }}>
        <h1>~/zone-net $</h1>
        <p>signal locked. phosphor stable.</p>
      </div>
    ),
  },
};

export const NoEffects: Story = {
  parameters: { docs: { source: source(noEffectsSource) } },
  args: {
    disableNoise: true,
    disableScanlines: true,
    disableVignette: true,
    disableTick: true,
    children: (
      <div style={{ padding: "4rem", color: "#a8ff60", fontFamily: "monospace" }}>
        plain shell
      </div>
    ),
  },
};
