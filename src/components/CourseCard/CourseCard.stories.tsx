import type { Meta, StoryObj } from "@storybook/react";
import { CourseCard } from "./CourseCard";
import type { CourseCardProps } from "./CourseCard";

const art = `   .--.
  |o_o |
  |:_/ |
 //   \\ \\
(|     | )
/'\\_   _/\`\\
\\___)=(___/`;

const meta: Meta<CourseCardProps> = {
  title: "Components/CourseCard",
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

export const Default: StoryObj<CourseCardProps> = {};
