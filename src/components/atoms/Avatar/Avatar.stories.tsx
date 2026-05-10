import type { Meta, StoryObj } from "@storybook/react";
import { Avatar } from "./Avatar";
import type { AvatarProps } from "./Avatar";
import { source, tsx } from "../../../stories/source";

const meta: Meta<AvatarProps> = {
  title: "Atoms/Avatar",
  component: Avatar,
  argTypes: {
    size: { control: "inline-radio", options: ["sm", "md", "lg"] },
  },
  args: {
    size: "md",
    name: "sektant1",
  },
};
export default meta;

const defaultSource = tsx`
import { Avatar } from "@sektant1/phosphor-ui";



const defaultProps = {
    size: "md",
    name: "sektant1",
  };

export function Example() {
  return <Avatar {...defaultProps} />;
}
`;

export const Default: StoryObj<AvatarProps> = {
  parameters: { docs: { source: source(defaultSource) } },
};
