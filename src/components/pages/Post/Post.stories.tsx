import type { Meta, StoryObj } from "@storybook/react";
import { Post } from "./Post";
import { basicUsage } from "../../../stories/basicUsage";

const meta: Meta<typeof Post> = {
  title: "Pages/Post",
  component: Post,
};

export default meta;

export const Default: StoryObj<typeof Post> = {
  parameters: { docs: { source: { code: basicUsage.Post } } },
  render: () => (
    <Post title="Field notes">
      <p>Post body content.</p>
    </Post>
  ),
};
