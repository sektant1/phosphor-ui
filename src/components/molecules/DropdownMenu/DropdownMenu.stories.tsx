import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { DropdownMenu } from "./DropdownMenu";
import { source, tsx } from "../../../stories/source";

const meta: Meta<typeof DropdownMenu> = {
  title: "Molecules/DropdownMenu",
  component: DropdownMenu,
};
export default meta;

const defaultSource = tsx`
import { DropdownMenu } from "@sektant1/phosphor-ui";



const defaultProps = {
    label: "actions",
    items: [
      { label: "preview", value: "preview" },
      { label: "duplicate", value: "duplicate" },
      { label: "archive", value: "archive" },
      { label: "delete", value: "delete", destructive: true },
    ],
  };

export function Example() {
  return <DropdownMenu {...defaultProps} />;
}
`;

type Story = StoryObj<typeof DropdownMenu>;

export const Default: Story = {
  parameters: { docs: { source: source(defaultSource) } },
  args: {
    label: "actions",
    items: [
      { label: "preview", value: "preview" },
      { label: "duplicate", value: "duplicate" },
      { label: "archive", value: "archive" },
      { label: "delete", value: "delete", destructive: true },
    ],
  },
};
