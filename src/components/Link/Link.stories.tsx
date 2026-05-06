import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import Link from "./Link";

export default {
  title: "Zone/Link",
  component: Link,
} as ComponentMeta<typeof Link>;

const Template: ComponentStory<typeof Link> = (args) => <Link {...args} />;

export const Default = Template.bind({});
Default.args = { href: "#", children: ">> back to long-wave feed" };
