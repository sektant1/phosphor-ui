import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Hr } from "./Hr";
import { source, tsx } from "../../../stories/source";

const meta: Meta<typeof Hr> = {
  title: "Atoms/Hr",
  component: Hr,
};
export default meta;

const defaultSource = tsx`
import { Hr } from "@sektant1/phosphor-ui";



export function Example() {
  return (
      <div style={{ width: 480 }}>
        <p>above</p>
        <Hr />
        <p>below</p>
      </div>
    );
}
`;

type Story = StoryObj<typeof Hr>;

export const Default: Story = {
  parameters: { docs: { source: source(defaultSource) } },
  render: () => (
    <div style={{ width: 480 }}>
      <p>above</p>
      <Hr />
      <p>below</p>
    </div>
  ),
};
