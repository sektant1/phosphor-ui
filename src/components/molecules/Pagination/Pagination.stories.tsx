import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import Pagination from "./Pagination";
import { basicUsage } from "../../../stories/basicUsage";

const meta: Meta<typeof Pagination> = {
  title: "Molecules/Pagination",
  component: Pagination,
};

export default meta;
type Story = StoryObj<typeof Pagination>;

export const Default: Story = {
  args: { page: 3, totalPages: 7, prevHref: "#", nextHref: "#" },
  parameters: { docs: { source: { code: basicUsage.Pagination } } },
};

export const First: Story = {
  args: { page: 1, totalPages: 5, nextHref: "#" },
};

export const Last: Story = {
  args: { page: 5, totalPages: 5, prevHref: "#" },
};

export const Single: Story = {
  args: { page: 1, totalPages: 1 },
};

export const Uncontrolled: Story = {
  args: { defaultPage: 1, totalPages: 6 },
  parameters: {
    docs: {
      description: {
        story:
          "No `page` prop — Pagination tracks its own state via `defaultPage`. Click prev/next to advance.",
      },
    },
  },
};
