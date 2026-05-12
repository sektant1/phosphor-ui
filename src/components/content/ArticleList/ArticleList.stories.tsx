import type { Meta, StoryObj } from "@storybook/react";
import { ArticleList } from "./ArticleList";
import { source, tsx } from "../../../stories/source";

const meta: Meta<typeof ArticleList> = {
  title: "Content/ArticleList",
  component: ArticleList,
  args: {
    items: [
      {
        title: "Daily note",
        href: "#daily-note",
        meta: "updated today",
      },
      {
        title: "Project log",
        href: "#project-log",
        meta: "active",
        description: "Open questions, shipped work, and the next useful move.",
      },
      {
        title: "Reading queue",
        href: "#reading-queue",
        description: "References collected from the current research pass.",
      },
    ],
  },
};

export default meta;

const defaultSource = tsx`
import { ArticleList } from "phosphor-ui";



const defaultProps = {
    items: [
      {
        title: "Daily note",
        href: "#daily-note",
        meta: "updated today",
      },
      {
        title: "Project log",
        href: "#project-log",
        meta: "active",
        description: "Open questions, shipped work, and the next useful move.",
      },
      {
        title: "Reading queue",
        href: "#reading-queue",
        description: "References collected from the current research pass.",
      },
    ],
  };

export function Example() {
  return <ArticleList {...defaultProps} />;
}
`;

type Story = StoryObj<typeof ArticleList>;

export const Default: Story = {
  parameters: { docs: { source: source(defaultSource) } },};
