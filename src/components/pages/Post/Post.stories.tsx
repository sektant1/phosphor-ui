import type { Meta, StoryObj } from "@storybook/react";
import { Post } from "./Post";
import { source, tsx } from "../../../stories/source";

const meta: Meta<typeof Post> = {
  title: "Pages/Post",
  component: Post,
};

export default meta;

const defaultSource = tsx`
import { Post } from "@sektant1/phosphor-ui";



export function Example() {
  return (
      <Post title="Field notes">
        <p>Post body content.</p>
      </Post>
    );
}
`;

export const Default: StoryObj<typeof Post> = {
  parameters: { docs: { source: source(defaultSource) } },
  render: () => (
    <Post title="Field notes">
      <p>Post body content.</p>
    </Post>
  ),
};
