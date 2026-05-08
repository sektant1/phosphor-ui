import type { Meta, StoryObj } from "@storybook/react";
import { SeriesNav } from "./SeriesNav";
import type { SeriesNavProps } from "./SeriesNav";
import { basicUsage } from "../../../stories/basicUsage";

const meta: Meta<SeriesNavProps> = {
  title: "Molecules/SeriesNav",
  component: SeriesNav,
  args: {
    seriesTitle: "Systems from Scratch",
    current: 2,
    total: 5,
    prev: { title: "Boot sequence and memory layout", href: "#" },
    next: { title: "Virtual memory and page tables", href: "#" },
  },
};
export default meta;

export const Default: StoryObj<SeriesNavProps> = {
  parameters: { docs: { source: { code: basicUsage.SeriesNav } } },
};
