import type { Meta, StoryObj } from "@storybook/react";
import { AsciiBanner } from "./AsciiBanner";
import type { AsciiBannerProps } from "./AsciiBanner";

const art = `  ____  _   _  ___  ____  ____  _   _  ___  ____
 |  _ \\| | | |/ _ \\/ ___||  _ \\| | | |/ _ \\|  _ \\
 | |_) | |_| | | | \\___ \\| |_) | |_| | | | | |_) |
 |  __/|  _  | |_| |___) |  __/|  _  | |_| |  _ <
 |_|   |_| |_|\\___/|____/|_|   |_| |_|\\___/|_| \\_\\`;

const meta: Meta<AsciiBannerProps> = {
  title: "Components/AsciiBanner",
  component: AsciiBanner,
  argTypes: {
    href:  { control: "text" },
    label: { control: "text" },
  },
  args: { art },
};
export default meta;

export const Default: StoryObj<AsciiBannerProps> = {};
