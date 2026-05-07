import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { PostFrontmatter } from "./PostFrontmatter";

const meta: Meta<typeof PostFrontmatter> = {
  title: "Components/PostFrontmatter",
  component: PostFrontmatter,
};
export default meta;

type Story = StoryObj<typeof PostFrontmatter>;

export const Default: Story = {
  args: {
    data: {
      title: "boot the terminal",
      date: "2026-05-06",
      readTime: "6m",
      log: "0042",
      tags: ["operations", "field"],
      draft: false,
    },
  },
};

export const WithCustomLabel: Story = {
  render: () => (
    <PostFrontmatter
      label="metadata"
      marker="+++"
      data={{
        title: "carrier sweep",
        channel: "0x42",
        priority: 2,
        archived: false,
      }}
    />
  ),
};
