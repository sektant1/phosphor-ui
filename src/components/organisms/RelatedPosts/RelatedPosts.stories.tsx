import type { Meta, StoryObj } from "@storybook/react";
import { RelatedPosts } from "./RelatedPosts";
import type { RelatedPostsProps } from "./RelatedPosts";
import { basicUsage } from "../../../stories/basicUsage";

const meta: Meta<RelatedPostsProps> = {
  title: "Organisms/RelatedPosts",
  component: RelatedPosts,
};
export default meta;

type Story = StoryObj<RelatedPostsProps>;

export const Default: Story = {
  parameters: { docs: { source: { code: basicUsage.RelatedPosts } } },
  args: {
    label: "related transmissions",
    posts: [
      { href: "#", title: "Binary search in Go",       date: "2026-02-08", tags: ["go", "algorithms"] },
      { href: "#", title: "CSS container queries",     date: "2026-03-21", tags: ["css"] },
      { href: "#", title: "Shiki syntax highlighting", date: "2026-04-15", tags: ["tooling"] },
    ],
  },
};
