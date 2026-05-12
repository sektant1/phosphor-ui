import type { Meta, StoryObj } from "@storybook/react";
import { Tag } from "./Tag";
import type { TagProps } from "./Tag";
import { source, tsx } from "../../../stories/source";

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

const defaultSource = tsx`
import { Tag } from "phosphor-ui";



const defaultProps = {
    children: "intro",
    color:    "magenta",
    hover:    false,
  };

export function Example() {
  return <Tag {...defaultProps} />;
}
`;

export const Default: StoryObj<TagProps> = {
  parameters: { docs: { source: source(defaultSource) } },
};
