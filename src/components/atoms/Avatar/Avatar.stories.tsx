import type { Meta, StoryObj } from "@storybook/react";
import { Avatar } from "./Avatar";
import type { AvatarProps } from "./Avatar";
import { basicUsage } from "../../../stories/basicUsage";

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

export const Default: StoryObj<AvatarProps> = {
  parameters: { docs: { source: { code: basicUsage.Avatar } } },
};
