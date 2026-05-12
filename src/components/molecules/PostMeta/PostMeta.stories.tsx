import type { Meta, StoryObj } from "@storybook/react";
import { PostMeta } from "./PostMeta";
import type { PostMetaProps } from "./PostMeta";
import { source, tsx } from "../../../stories/source";

const meta: Meta<PostMetaProps> = {
  title: "Molecules/PostMeta",
  component: PostMeta,
  argTypes: {
    date:      { control: "text" },
    readTime:  { control: "text" },
    wordCount: { control: "number" },
    updated:   { control: "text" },
    tags:      { control: "object" },
    className: { control: "text" },
  },
  args: {
    date:      "2026-05-06",
    readTime:  "8 min",
    wordCount: 1420,
    updated:   "2026-05-10",
    tags:      ["go", "algorithms", "binary-search"],
  },
};
export default meta;

const defaultSource = tsx`
import { PostMeta } from "phosphor-ui";



const defaultProps = {
    date:      "2026-05-06",
    readTime:  "8 min",
    wordCount: 1420,
    updated:   "2026-05-10",
    tags:      ["go", "algorithms", "binary-search"],
  };

export function Example() {
  return <PostMeta {...defaultProps} />;
}
`;

export const Default: StoryObj<PostMetaProps> = {
  parameters: { docs: { source: source(defaultSource) } },
};
