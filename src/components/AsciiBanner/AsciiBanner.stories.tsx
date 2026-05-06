import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { AsciiBanner } from "./AsciiBanner";

const art = `  ____  _   _  ___  ____  ____  _   _  ___  ____
 |  _ \\| | | |/ _ \\/ ___||  _ \\| | | |/ _ \\|  _ \\
 | |_) | |_| | | | \\___ \\| |_) | |_| | | | | |_) |
 |  __/|  _  | |_| |___) |  __/|  _  | |_| |  _ <
 |_|   |_| |_|\\___/|____/|_|   |_| |_|\\___/|_| \\_\\`;

const meta: Meta<typeof AsciiBanner> = {
  title: "Components/AsciiBanner",
  component: AsciiBanner,
};
export default meta;

type Story = StoryObj<typeof AsciiBanner>;

export const Default: Story = {
  args: { art },
};

export const Linked: Story = {
  args: { art, href: "#", label: "Phosphor home" },
};
