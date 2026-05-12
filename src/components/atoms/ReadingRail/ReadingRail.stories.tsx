import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { ReadingRail } from "./ReadingRail";
import { source, tsx } from "../../../stories/source";

const meta: Meta<typeof ReadingRail> = {
  title: "Atoms/ReadingRail",
  component: ReadingRail,
};

export default meta;

const defaultSource = tsx`
import { ReadingRail } from "phosphor-ui";



export function Example() {
  const props = { value: 0.35 };

  return (
      <div style={{ minHeight: 200, padding: 20, color: "var(--pho-color-text)" }}>
        <ReadingRail {...props} />
        <p style={{ color: "var(--pho-color-text-muted)" }}>fixed at 35%</p>
      </div>
    );
}
`;

export const Default: StoryObj<typeof ReadingRail> = {
  parameters: { docs: { source: source(defaultSource) } },
  args: { value: 0.35 },
  render: (args) => (
    <div style={{ minHeight: 200, padding: 20, color: "var(--pho-color-text)" }}>
      <ReadingRail {...args} />
      <p style={{ color: "var(--pho-color-text-muted)" }}>fixed at 35%</p>
    </div>
  ),
};
