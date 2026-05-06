import type { Meta, StoryObj } from "@storybook/react";
import { SeriesNav } from "./SeriesNav";
import type { SeriesNavProps } from "./SeriesNav";

const meta: Meta<SeriesNavProps> = {
  title: "Components/SeriesNav",
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

export const Default: StoryObj<SeriesNavProps> = {};
