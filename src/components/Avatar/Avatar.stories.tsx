import type { Meta, StoryObj } from "@storybook/react";
import { Avatar } from "./Avatar";
import type { AvatarProps } from "./Avatar";

const meta: Meta<AvatarProps> = {
  title: "Components/Avatar",
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

export const Default: StoryObj<AvatarProps> = {};
