import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { ReadingRail } from "./ReadingRail";

const meta: Meta<typeof ReadingRail> = {
  title: "Atoms/ReadingRail",
  component: ReadingRail,
};

export default meta;

export const Default: StoryObj<typeof ReadingRail> = {
  args: { value: 0.35 },
  render: (args) => (
    <div style={{ minHeight: 200, padding: 20, color: "var(--pho-color-text)" }}>
      <ReadingRail {...args} />
      <p style={{ color: "var(--pho-color-text-muted)" }}>fixed at 35%</p>
    </div>
  ),
};
