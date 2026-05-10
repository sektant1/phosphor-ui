import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { PostFrontmatter } from "./PostFrontmatter";
import { source, tsx } from "../../../stories/source";

const meta: Meta<typeof PostFrontmatter> = {
  title: "Content/PostFrontmatter",
  component: PostFrontmatter,
};
export default meta;

const defaultSource = tsx`
import { PostFrontmatter } from "@sektant1/phosphor-ui";

const defaultProps = {
    data: {
      title: "boot the terminal",
      date: "2026-05-06",
      readTime: "6m",
      log: "0042",
      tags: ["operations", "field"],
      draft: false,
    },
  };

export function Example() {
  return <PostFrontmatter {...defaultProps} />;
}
`;

const withCustomLabelSource = tsx`
import { PostFrontmatter } from "@sektant1/phosphor-ui";



export function Example() {
  return (
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
    );
}
`;

type Story = StoryObj<typeof PostFrontmatter>;

export const Default: Story = {
  parameters: { docs: { source: source(defaultSource) } },
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
  parameters: { docs: { source: source(withCustomLabelSource) } },
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
