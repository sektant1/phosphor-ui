import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import Text from "./Text";
import { basicUsage } from "../../../stories/basicUsage";

export default {
  title: "Atoms/Text",
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

export const Default = Template.bind({});
Default.args = { variant: "body", children: "// pool reuse open DB connections" };
Default.parameters = { docs: { source: { code: basicUsage.Text } } };

export const H2 = Template.bind({});
H2.args = { variant: "h2", children: "transmission log" };

export const Stamp = Template.bind({});
Stamp.args = { variant: "stamp", children: "// LAST CONTACT //" };
