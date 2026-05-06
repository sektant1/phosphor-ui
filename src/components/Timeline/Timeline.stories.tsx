import type { Meta, StoryObj } from "@storybook/react";
import { Timeline } from "./Timeline";
import type { TimelineProps } from "./Timeline";

const meta: Meta<TimelineProps> = {
  title: "Components/Timeline",
  component: Timeline,
};
export default meta;

type Story = StoryObj<TimelineProps>;

export const Default: Story = {
  args: {
    items: [
      { date: "2026-01-12", title: "Boot sequence decoded",    status: "done",     body: "First module complete." },
      { date: "2026-02-08", title: "Memory layout mapped",     status: "done" },
      { date: "2026-03-21", title: "Virtual memory deep dive", status: "active",   body: "Currently in progress." },
      { date: "2026-04-15", title: "Page table internals",     status: "upcoming" },
      { date: "2026-05-20", title: "TLB shootdowns and IPI",   status: "upcoming" },
    ],
  },
};
