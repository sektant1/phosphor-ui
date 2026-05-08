import type { Meta, StoryObj } from "@storybook/react";
import { ShareBar } from "./ShareBar";
import type { ShareBarProps } from "./ShareBar";
import { basicUsage } from "../../../stories/basicUsage";

const meta: Meta<ShareBarProps> = {
  title: "Molecules/ShareBar",
  component: ShareBar,
  args: {
    label: "share",
    url: "https://example.com/posts/boot-the-terminal",
    links: [
      { label: "x", href: "https://x.com/intent/tweet?url=https://example.com" },
      { label: "hn", href: "https://news.ycombinator.com/submitlink?u=https://example.com" },
      { label: "bluesky", href: "https://bsky.app" },
    ],
  },
};
export default meta;

export const Default: StoryObj<ShareBarProps> = {
  parameters: { docs: { source: { code: basicUsage.ShareBar } } },
};
