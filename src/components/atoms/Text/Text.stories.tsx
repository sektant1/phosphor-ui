import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import Text from "./Text";
import { basicUsage } from "../../../stories/basicUsage";

const meta: Meta<typeof Text> = {
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
        "lead",
        "body",
        "small",
        "caption",
        "mono",
        "code",
        "terminal",
        "stamp",
        "prompt",
        "glow",
        "glow-pale",
        "muted",
        "dim",
        "faded",
      ],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Text>;

export const Default: Story = {
  args: { variant: "body", children: "// pool reuse open DB connections" },
  parameters: { docs: { source: { code: basicUsage.Text } } },
};

export const H2: Story = {
  args: { variant: "h2", children: "transmission log" },
};

export const Lead: Story = {
  args: {
    variant: "lead",
    children: "Readable intro copy for posts, wiki entries, and project pages.",
  },
};

export const Caption: Story = {
  args: { variant: "caption", children: "updated 2026-05-09" },
};

export const Stamp: Story = {
  args: { variant: "stamp", children: "// LAST CONTACT //" },
};
