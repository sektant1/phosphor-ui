import type { Meta, StoryObj } from "@storybook/react";
import { HeaderNav } from "./HeaderNav";
import { basicUsage } from "../../../stories/basicUsage";

const meta: Meta<typeof HeaderNav> = {
  title: "Molecules/BootNav",
  component: HeaderNav,
  parameters: {
    docs: {
      description: {
        component: "Compatibility story for old BootNav docs links. Use HeaderNav in code.",
      },
    },
  },
};
export default meta;

type Story = StoryObj<typeof HeaderNav>;

export const Default: Story = {
  name: "HeaderNav",
  parameters: { docs: { source: { code: basicUsage.HeaderNav } } },
  args: {
    items: [
      { label: "home", href: "#", active: true },
      { label: "log", href: "#log" },
      { label: "courses", href: "#courses" },
      { label: "about", href: "#about", glyph: "*" },
    ],
  },
};
