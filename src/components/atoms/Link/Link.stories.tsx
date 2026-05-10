import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import Link from "./Link";
import { source, tsx } from "../../../stories/source";

const meta: Meta<typeof Link> = {
  title: "Atoms/Link",
  component: Link,
};

export default meta;

const defaultSource = tsx`
import { Link } from "@sektant1/phosphor-ui";



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
