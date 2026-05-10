import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "../../atoms/Button";
import { Tooltip } from "./Tooltip";
import { source, tsx } from "../../../stories/source";

const meta: Meta<typeof Tooltip> = {
  title: "Molecules/Tooltip",
  component: Tooltip,
};
export default meta;

const defaultSource = tsx`
import { Button, Tooltip } from "@sektant1/phosphor-ui";

export function Example() {
  return (
      <Tooltip content="Syncs the current draft to the field cache.">
        <Button size="sm" variant="ghost">sync</Button>
      </Tooltip>
    );
}
`;

const placementsSource = tsx`
import { Button, Tooltip } from "@sektant1/phosphor-ui";



export function Example() {
  return (
      <div style={{ display: "flex", gap: 16, padding: 48, flexWrap: "wrap" }}>
        {(["top", "right", "bottom", "left"] as const).map((placement) => (
          <Tooltip key={placement} placement={placement} content={placement}>
            <Button size="sm" variant="ghost">{placement}</Button>
          </Tooltip>
        ))}
      </div>
    );
}
`;

type Story = StoryObj<typeof Tooltip>;

export const Default: Story = {
  parameters: { docs: { source: source(defaultSource) } },
  render: () => (
    <Tooltip content="Syncs the current draft to the field cache.">
      <Button size="sm" variant="ghost">sync</Button>
    </Tooltip>
  ),
};

export const Placements: Story = {
  parameters: { docs: { source: source(placementsSource) } },
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
