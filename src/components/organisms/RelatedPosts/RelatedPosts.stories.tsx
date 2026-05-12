import type { Meta, StoryObj } from "@storybook/react";
import { RelatedPosts } from "./RelatedPosts";
import type { RelatedPostsProps } from "./RelatedPosts";
import { source, tsx } from "../../../stories/source";

const meta: Meta<RelatedPostsProps> = {
  title: "Organisms/RelatedPosts",
  component: RelatedPosts,
};
export default meta;

const defaultSource = tsx`
import { RelatedPosts } from "phosphor-ui";



const defaultProps = {
    label: "related transmissions",
    posts: [
      { href: "#", title: "Binary search in Go",       date: "2026-02-08", tags: ["go", "algorithms"] },
      { href: "#", title: "CSS container queries",     date: "2026-03-21", tags: ["css"] },
      { href: "#", title: "Shiki syntax highlighting", date: "2026-04-15", tags: ["tooling"] },
    ],
  };

export function Example() {
  return <RelatedPosts {...defaultProps} />;
}
`;

type Story = StoryObj<RelatedPostsProps>;

export const Default: Story = {
  parameters: { docs: { source: source(defaultSource) } },
  args: {
    label: "related transmissions",
    posts: [
      { href: "#", title: "Binary search in Go",       date: "2026-02-08", tags: ["go", "algorithms"] },
      { href: "#", title: "CSS container queries",     date: "2026-03-21", tags: ["css"] },
      { href: "#", title: "Shiki syntax highlighting", date: "2026-04-15", tags: ["tooling"] },
    ],
  },
};
