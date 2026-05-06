import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import Pagination from "./Pagination";

export default {
  title: "Zone/Pagination",
  component: Pagination,
} as ComponentMeta<typeof Pagination>;

const Template: ComponentStory<typeof Pagination> = (args) => (
  <Pagination {...args} />
);

export const Middle = Template.bind({});
Middle.args = { page: 3, totalPages: 7, prevHref: "#", nextHref: "#" };

export const First = Template.bind({});
First.args = { page: 1, totalPages: 5, nextHref: "#" };

export const Last = Template.bind({});
Last.args = { page: 5, totalPages: 5, prevHref: "#" };

export const Single = Template.bind({});
Single.args = { page: 1, totalPages: 1 };

export const Uncontrolled = Template.bind({});
Uncontrolled.args = { defaultPage: 1, totalPages: 6 };
Uncontrolled.parameters = {
  docs: {
    description: {
      story:
        "No `page` prop — Pagination tracks its own state via `defaultPage`. Click prev/next to advance.",
    },
  },
};
