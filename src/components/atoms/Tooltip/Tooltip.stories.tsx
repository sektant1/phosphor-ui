import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "../../atoms/Button";
import { Tooltip } from "./Tooltip";
import { basicUsage } from "../../../stories/basicUsage";

const meta: Meta<typeof Tooltip> = {
  title: "Molecules/Tooltip",
  component: Tooltip,
};
export default meta;

type Story = StoryObj<typeof Tooltip>;

export const Default: Story = {
  parameters: { docs: { source: { code: basicUsage.Tooltip } } },
  render: () => (
    <Tooltip content="Syncs the current draft to the field cache.">
      <Button size="sm" variant="ghost">sync</Button>
    </Tooltip>
  ),
};

export const Placements: Story = {
  render: () => (
    <div style={{ display: "flex", gap: 16, padding: 48, flexWrap: "wrap" }}>
      {(["top", "right", "bottom", "left"] as const).map((placement) => (
        <Tooltip key={placement} placement={placement} content={placement}>
          <Button size="sm" variant="ghost">{placement}</Button>
        </Tooltip>
      ))}
    </div>
  ),
};
