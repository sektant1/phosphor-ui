import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Breadcrumbs } from "./Breadcrumbs";
import { basicUsage } from "../../../stories/basicUsage";

const meta: Meta<typeof Breadcrumbs> = {
  title: "Molecules/Breadcrumbs",
  component: Breadcrumbs,
};
export default meta;

type Story = StoryObj<typeof Breadcrumbs>;

export const Default: Story = {
  parameters: { docs: { source: { code: basicUsage.Breadcrumbs } } },
  args: {
    items: [
      { label: "home", href: "#/" },
      { label: "posts", href: "#/posts" },
      { label: "boot the terminal", current: true },
    ],
  },
};
