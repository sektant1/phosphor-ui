import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Tabs } from "./Tabs";
import { basicUsage } from "../../../stories/basicUsage";

const meta: Meta<typeof Tabs> = {
  title: "Molecules/Tabs",
  component: Tabs,
};
export default meta;

type Story = StoryObj<typeof Tabs>;

export const Default: Story = {
  parameters: { docs: { source: { code: basicUsage.Tabs } } },
  args: {
    items: [
      { id: "write", label: "write", content: "Draft body and metadata." },
      { id: "preview", label: "preview", content: "Rendered MDX preview." },
      { id: "history", label: "history", content: "Revision log." },
    ],
  },
};
