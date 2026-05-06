import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import Text from "./Text";

export default {
  title: "Zone/Text",
  component: Text,
  argTypes: {
    variant: {
      control: "select",
      options: [
        "h1",
        "h2",
        "h3",
        "h4",
        "body",
        "mono",
        "terminal",
        "stamp",
        "prompt",
        "glow",
        "glow-pale",
        "dim",
        "faded",
      ],
    },
  },
} as ComponentMeta<typeof Text>;

const Template: ComponentStory<typeof Text> = (args) => <Text {...args} />;

export const Body = Template.bind({});
Body.args = { variant: "body", children: "// pool reuse open DB connections" };

export const H2 = Template.bind({});
H2.args = { variant: "h2", children: "transmission log" };

export const Stamp = Template.bind({});
Stamp.args = { variant: "stamp", children: "// LAST CONTACT //" };
