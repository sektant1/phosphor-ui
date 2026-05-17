import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Breadcrumbs } from "./Breadcrumbs";
import type { BreadcrumbsProps } from "./Breadcrumbs";
import { source, tsx } from "../../../stories/source";

const meta: Meta<BreadcrumbsProps> = {
  title: "Molecules/Breadcrumbs",
  component: Breadcrumbs,
  argTypes: {
    items: { control: "object" },
    separator: { control: "text" },
    ariaLabel: { control: "text" },
  },
  args: { separator: "/", ariaLabel: "breadcrumbs" },
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
