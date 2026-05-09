import type { Meta, StoryObj } from "@storybook/react";
import { CourseCard } from "./CourseCard";
import type { CourseCardProps } from "./CourseCard";
import { basicUsage } from "../../../stories/basicUsage";

const art = `   .--.
  |o_o |
  |:_/ |
 //   \\ \\
(|     | )
/'\\_   _/\`\\
\\___)=(___/`;

const meta: Meta<CourseCardProps> = {
  title: "Molecules/CourseCard",
  component: CourseCard,
  argTypes: {
    locked: { control: "boolean" },
  },
  args: {
    stamp:       "MOD-001",
    art,
    coverMeta:   "// dossier",
    tag:         "intro",
    title:       "Phosphor protocol",
    description: "Boot the terminal. Decode the signal. Engage the zone.",
    stats:       "08 lessons · 1h 42m",
    progress:    { value: 40 },
    cta:         { label: "resume ▸", href: "#" },
    locked:      false,
  },
};
export default meta;

export const Default: StoryObj<CourseCardProps> = {
  parameters: { docs: { source: { code: basicUsage.CourseCard } } },
};

export const Locked: StoryObj<CourseCardProps> = {
  args: {
    stamp: "COURSE-03",
    coverMeta: "restricted",
    tag: "gamma",
    title: "Anomaly triage",
    description: "Reading the perimeter. Threat ladder, response gates.",
    locked: true,
    cta: { label: "locked", href: "#" },
  },
};

export const Compact: StoryObj<CourseCardProps> = {
  args: {
    stamp: "MOD-002",
    art,
    coverMeta: "field · 9 modules",
    tag: "field",
    title: "Signal decoding",
    description: "From carrier to message. Static, gates, baudrates.",
    stats: "9 modules · 3h44m",
    progress: { value: 1, total: 9 },
    cta: { label: "enter", href: "#" },
  },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: "23rem" }}>
        <Story />
      </div>
    ),
  ],
};

export const WithoutArt: StoryObj<CourseCardProps> = {
  args: {
    stamp: "COURSE-01",
    coverMeta: "entry · 6 modules",
    tag: "entry",
    title: "Cold-boot operations",
    description:
      "Bring a dead terminal back online. Wire, light, listen. Six modules of hands-on work.",
    stats: "6 modules · 24 lessons · 2h12m",
    progress: { value: 4, total: 6 },
    cta: { label: "resume", href: "#" },
  },
};
