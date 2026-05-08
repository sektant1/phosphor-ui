import type { Meta, StoryObj } from "@storybook/react";
import { AsciiBanner } from "./AsciiBanner";
import type { AsciiBannerProps } from "./AsciiBanner";
import { basicUsage } from "../../../stories/basicUsage";

const art = `  ____  _   _  ___  ____  ____  _   _  ___  ____
 |  _ \\| | | |/ _ \\/ ___||  _ \\| | | |/ _ \\|  _ \\
 | |_) | |_| | | | \\___ \\| |_) | |_| | | | | |_) |
 |  __/|  _  | |_| |___) |  __/|  _  | |_| |  _ <
 |_|   |_| |_|\\___/|____/|_|   |_| |_|\\___/|_| \\_\\`;

const meta: Meta<AsciiBannerProps> = {
  title: "Molecules/AsciiBanner",
  component: AsciiBanner,
  argTypes: {
    href:  { control: "text" },
    label: { control: "text" },
  },
  args: { art },
};
export default meta;

export const Default: StoryObj<AsciiBannerProps> = {};
Default.parameters = {
  docs: {
    source: { code: basicUsage.AsciiBanner },
  },
};

export const WithFallback: StoryObj<AsciiBannerProps> = {
  args: {
    fallback: "PHOSPHOR",
    label: "Phosphor home",
  },
};
WithFallback.parameters = {
  docs: {
    source: {
      code: `<AsciiBanner
  art={art}
  fallback="PHOSPHOR"
  label="Phosphor home"
/>`,
    },
  },
};
