import type { Meta, StoryObj } from "@storybook/react";
import { Timeline } from "./Timeline";
import type { TimelineProps } from "./Timeline";
import { source, tsx } from "../../../stories/source";

const meta: Meta<TimelineProps> = {
  title: "Molecules/Timeline",
  component: Timeline,
};
export default meta;

const defaultSource = tsx`
import { Timeline } from "@sektant1/phosphor-ui";



const defaultProps = {
    items: [
      { date: "2026-01-12", title: "Boot sequence decoded",    status: "done",     body: "First module complete." },
      { date: "2026-02-08", title: "Memory layout mapped",     status: "done" },
      { date: "2026-03-21", title: "Virtual memory deep dive", status: "active",   body: "Currently in progress." },
      { date: "2026-04-15", title: "Page table internals",     status: "upcoming" },
      { date: "2026-05-20", title: "TLB shootdowns and IPI",   status: "upcoming" },
    ],
  };

export function Example() {
  return <Timeline {...defaultProps} />;
}
`;

type Story = StoryObj<TimelineProps>;

export const Default: Story = {
  parameters: { docs: { source: source(defaultSource) } },
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
