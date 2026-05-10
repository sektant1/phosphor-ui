import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import Pagination from "./Pagination";
import { source, tsx } from "../../../stories/source";

const meta: Meta<typeof Pagination> = {
  title: "Molecules/Pagination",
  component: Pagination,
};

export default meta;

const defaultSource = tsx`
import { Pagination } from "@sektant1/phosphor-ui";

const defaultProps = { page: 3, totalPages: 7, prevHref: "#", nextHref: "#" };

export function Example() {
  return <Pagination {...defaultProps} />;
}
`;

const firstSource = tsx`
import { Pagination } from "@sektant1/phosphor-ui";

const firstProps = { page: 1, totalPages: 5, nextHref: "#" };

export function Example() {
  return <Pagination {...firstProps} />;
}
`;

const lastSource = tsx`
import { Pagination } from "@sektant1/phosphor-ui";

const lastProps = { page: 5, totalPages: 5, prevHref: "#" };

export function Example() {
  return <Pagination {...lastProps} />;
}
`;

const singleSource = tsx`
import { Pagination } from "@sektant1/phosphor-ui";

const singleProps = { page: 1, totalPages: 1 };

export function Example() {
  return <Pagination {...singleProps} />;
}
`;

const uncontrolledSource = tsx`
import { Pagination } from "@sektant1/phosphor-ui";



const uncontrolledProps = { defaultPage: 1, totalPages: 6 };

export function Example() {
  return <Pagination {...uncontrolledProps} />;
}
`;
type Story = StoryObj<typeof Pagination>;

export const Default: Story = {
  args: { page: 3, totalPages: 7, prevHref: "#", nextHref: "#" },
  parameters: { docs: { source: source(defaultSource) } },
};

export const First: Story = {
  parameters: { docs: { source: source(firstSource) } },
  args: { page: 1, totalPages: 5, nextHref: "#" },
};

export const Last: Story = {
  parameters: { docs: { source: source(lastSource) } },
  args: { page: 5, totalPages: 5, prevHref: "#" },
};

export const Single: Story = {
  parameters: { docs: { source: source(singleSource) } },
  args: { page: 1, totalPages: 1 },
};

export const Uncontrolled: Story = {
  args: { defaultPage: 1, totalPages: 6 },
  parameters: {
    docs: { source: source(uncontrolledSource),
      description: {
        story:
          "No `page` prop — Pagination tracks its own state via `defaultPage`. Click prev/next to advance.",
      },
    },
  },
};
