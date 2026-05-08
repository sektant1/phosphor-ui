import type { Meta, StoryObj } from "@storybook/react";
import { Tag } from "./Tag";
import type { TagProps } from "./Tag";
import { basicUsage } from "../../../stories/basicUsage";

const meta: Meta<TagProps> = {
  title: "Atoms/Tag",
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

export const Default: StoryObj<TagProps> = {
  parameters: { docs: { source: { code: basicUsage.Tag } } },
};
