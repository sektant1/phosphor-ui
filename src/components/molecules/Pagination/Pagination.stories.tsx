import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import Pagination from "./Pagination";
import { basicUsage } from "../../../stories/basicUsage";

export default {
  title: "Molecules/Pagination",
  component: Pagination,
} as ComponentMeta<typeof Pagination>;

const Template: ComponentStory<typeof Pagination> = (args) => (
  <Pagination {...args} />
);

export const Default = Template.bind({});
Default.args = { page: 3, totalPages: 7, prevHref: "#", nextHref: "#" };
Default.parameters = { docs: { source: { code: basicUsage.Pagination } } };

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
