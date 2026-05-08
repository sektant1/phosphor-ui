import React, { useEffect, useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { ReadingRail } from "./ReadingRail";
import { basicUsage } from "../../../stories/basicUsage";

const meta: Meta<typeof ReadingRail> = {
  title: "Atoms/ReadingRail",
  component: ReadingRail,
};
export default meta;

type Story = StoryObj<typeof ReadingRail>;

const Animated: React.FC = () => {
  const [v, setV] = useState(0);
  useEffect(() => {
    const id = window.setInterval(
      () => setV((x) => (x >= 1 ? 0 : +(x + 0.04).toFixed(2))),
      200
    );
    return () => window.clearInterval(id);
  }, []);
  return (
    <div style={{ minHeight: 200, padding: 20, color: "var(--ink)" }}>
      <ReadingRail value={v} />
      <p>Auto-cycling progress: {(v * 100).toFixed(0)}%</p>
    </div>
  );
};

export const Default: Story = {
  parameters: { docs: { source: { code: basicUsage.ReadingRail } } },
  render: () => (
    <div style={{ minHeight: 120, padding: 20 }}>
      <ReadingRail value={0.35} />
      <p style={{ color: "var(--phosphor-dim)" }}>fixed at 35%</p>
    </div>
  ),
};

export const AutoCycle: Story = { render: () => <Animated /> };
