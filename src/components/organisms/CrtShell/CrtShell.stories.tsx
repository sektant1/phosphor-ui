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
import { CrtShell } from "phosphor-ui";

const defaultProps = {
    children: (
      <div style={{ padding: "4rem", color: "var(--pho-color-primary)", fontFamily: "var(--pho-font-terminal)" }}>
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
import { CrtShell } from "phosphor-ui";



const noEffectsProps = {
    disableNoise: true,
    disableScanlines: true,
    disableVignette: true,
    disableTick: true,
    children: (
      <div style={{ padding: "4rem", color: "var(--pho-color-primary)", fontFamily: "var(--pho-font-terminal)" }}>
        plain shell
      </div>
    ),
  };

export function Example() {
  return <CrtShell {...noEffectsProps} />;
}
`;

const amberSource = tsx`
import { CrtShell } from "phosphor-ui";

export function Example() {
  return (
    <div data-theme="amber">
      <CrtShell>
        <div
          style={{
            minHeight: "100vh",
            padding: "4rem",
            color: "var(--pho-color-primary)",
            fontFamily: "var(--pho-font-terminal)",
          }}
        >
          <h1>CRT TERMINAL</h1>
          <p>amber channel online. scanlines, glow, and vignette remain readable.</p>
        </div>
      </CrtShell>
    </div>
  );
}
`;

type Story = StoryObj<typeof CrtShell>;

export const Default: Story = {
  parameters: { docs: { source: source(defaultSource) } },
  args: {
    children: (
      <div style={{ padding: "4rem", color: "var(--pho-color-primary)", fontFamily: "var(--pho-font-terminal)" }}>
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
      <div style={{ padding: "4rem", color: "var(--pho-color-primary)", fontFamily: "var(--pho-font-terminal)" }}>
        plain shell
      </div>
    ),
  },
};

export const Amber: Story = {
  parameters: { docs: { source: source(amberSource) } },
  args: {
    children: (
      <div
        data-theme="amber"
        style={{
          minHeight: "100vh",
          padding: "4rem",
          color: "var(--pho-color-primary)",
          fontFamily: "var(--pho-font-terminal)",
        }}
      >
        <h1>CRT TERMINAL</h1>
        <p>amber channel online. scanlines, glow, and vignette remain readable.</p>
      </div>
    ),
  },
  decorators: [
    (Story) => (
      <div data-theme="amber">
        <Story />
      </div>
    ),
  ],
};
