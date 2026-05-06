import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { CrtShell } from "./CrtShell";

const meta: Meta<typeof CrtShell> = {
  title: "Components/CrtShell",
  component: CrtShell,
  parameters: { layout: "fullscreen" },
};
export default meta;

type Story = StoryObj<typeof CrtShell>;

export const Default: Story = {
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
