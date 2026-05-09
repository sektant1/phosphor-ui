import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import Link from "./Link";
import { basicUsage } from "../../../stories/basicUsage";

const meta: Meta<typeof Link> = {
  title: "Atoms/Link",
  component: Link,
};

export default meta;
type Story = StoryObj<typeof Link>;

export const Default: Story = {
  args: { href: "#", children: ">> back to long-wave feed" },
  parameters: { docs: { source: { code: basicUsage.Link } } },
};
