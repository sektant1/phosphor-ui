import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Breadcrumbs } from "./Breadcrumbs";
import { source, tsx } from "../../../stories/source";

const meta: Meta<typeof Breadcrumbs> = {
  title: "Molecules/Breadcrumbs",
  component: Breadcrumbs,
};
export default meta;

const defaultSource = tsx`
import { Breadcrumbs } from "phosphor-ui";



const defaultProps = {
    items: [
      { label: "home", href: "#/" },
      { label: "posts", href: "#/posts" },
      { label: "boot the terminal", current: true },
    ],
  };

export function Example() {
  return <Breadcrumbs {...defaultProps} />;
}
`;

type Story = StoryObj<typeof Breadcrumbs>;

export const Default: Story = {
  parameters: { docs: { source: source(defaultSource) } },
  args: {
    items: [
      { label: "home", href: "#/" },
      { label: "posts", href: "#/posts" },
      { label: "boot the terminal", current: true },
    ],
  },
};
