import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import Link from "./Link";
import type { LinkProps } from "./Link";
import { source, tsx } from "../../../stories/source";

const meta: Meta<LinkProps> = {
  title: "Atoms/Link",
  component: Link,
  argTypes: {
    href: { control: "text" },
    children: { control: "text" },
    external: { control: "boolean" },
    target: { control: "text" },
    rel: { control: "text" },
  },
  args: { href: "#", external: false },
};

export default meta;

const defaultSource = tsx`
import { Link } from "phosphor-ui";



const defaultProps = { href: "#", children: ">> back to long-wave feed" };

export function Example() {
  return <Link {...defaultProps} />;
}
`;
type Story = StoryObj<typeof Link>;

export const Default: Story = {
  args: { href: "#", children: ">> back to long-wave feed" },
  parameters: { docs: { source: source(defaultSource) } },
};
