import type { Meta, StoryObj } from "@storybook/react";
import { Tag } from "./Tag";
import type { TagProps } from "./Tag";

const meta: Meta<TagProps> = {
  title: "Components/Tag",
  component: Tag,
  argTypes: {
    color: { control: "inline-radio", options: ["phosphor", "magenta"] },
    count: { control: "number" },
    href:  { control: "text" },
    hover: { control: "boolean" },
  },
  args: {
    children: "intro",
    color:    "magenta",
    hover:    false,
  },
};
export default meta;

export const Default: StoryObj<TagProps> = {};
