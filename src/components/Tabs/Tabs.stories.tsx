import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Tabs } from "./Tabs";

const meta: Meta<typeof Tabs> = {
  title: "Components/Tabs",
  component: Tabs,
};
export default meta;

type Story = StoryObj<typeof Tabs>;

export const Default: Story = {
  args: {
    items: [
      { id: "write", label: "write", content: "Draft body and metadata." },
      { id: "preview", label: "preview", content: "Rendered MDX preview." },
      { id: "history", label: "history", content: "Revision log." },
    ],
  },
};
