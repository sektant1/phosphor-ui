import type { Meta, StoryObj } from "@storybook/react";
import { ArticleList } from "./ArticleList";
import { basicUsage } from "../../../stories/basicUsage";

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
  parameters: {
    docs: { source: { code: basicUsage.ArticleList } },
  },
};

export default meta;

type Story = StoryObj<typeof ArticleList>;

export const Default: Story = {};
