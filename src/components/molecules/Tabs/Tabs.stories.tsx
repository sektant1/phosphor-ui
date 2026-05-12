import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Tabs } from "./Tabs";
import { source, tsx } from "../../../stories/source";

const meta: Meta<typeof Tabs> = {
  title: "Molecules/Tabs",
  component: Tabs,
};
export default meta;

const defaultSource = tsx`
import { Tabs } from "phosphor-ui";



const defaultProps = {
    items: [
      { id: "write", label: "write", content: "Draft body and metadata." },
      { id: "preview", label: "preview", content: "Rendered MDX preview." },
      { id: "history", label: "history", content: "Revision log." },
    ],
  };

export function Example() {
  return <Tabs {...defaultProps} />;
}
`;

type Story = StoryObj<typeof Tabs>;

export const Default: Story = {
  parameters: { docs: { source: source(defaultSource) } },
  args: {
    items: [
      { id: "write", label: "write", content: "Draft body and metadata." },
      { id: "preview", label: "preview", content: "Rendered MDX preview." },
      { id: "history", label: "history", content: "Revision log." },
    ],
  },
};
