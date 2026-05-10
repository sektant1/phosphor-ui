import type { Meta, StoryObj } from "@storybook/react";
import { CourseCard } from "./CourseCard";
import type { CourseCardProps } from "./CourseCard";
import { source, tsx } from "../../../stories/source";

const meta: Meta<CourseCardProps> = {
  title: "Molecules/CourseCard",
  component: CourseCard,
  argTypes: {
    locked: { control: "boolean" },
  },
  args: {
    stamp: "MOD-001",
    thumbSrc: "/assets/og-image.png",
    thumbAlt: "Phosphor terminal interface",
    coverMeta: "// dossier",
    tag: "intro",
    title: "Phosphor protocol",
    description: "Boot the terminal. Decode the signal. Engage the zone.",
    stats: "08 lessons · 1h 42m",
    progress: { value: 40 },
    cta: { label: "resume ▸", href: "#" },
    locked: false,
  },
};
export default meta;

const defaultSource = tsx`
import { CourseCard } from "@sektant1/phosphor-ui";

const defaultProps = {
    stamp: "MOD-001",
    thumbSrc: "/assets/og-image.png",
    thumbAlt: "Phosphor terminal interface",
    coverMeta: "// dossier",
    tag: "intro",
    title: "Phosphor protocol",
    description: "Boot the terminal. Decode the signal. Engage the zone.",
    stats: "08 lessons · 1h 42m",
    progress: { value: 40 },
    cta: { label: "resume ▸", href: "#" },
    locked: false,
  };

export function Example() {
  return <CourseCard {...defaultProps} />;
}
`;

const lockedSource = tsx`
import { CourseCard } from "@sektant1/phosphor-ui";

const lockedProps = {
  ...{
    stamp: "MOD-001",
    thumbSrc: "/assets/og-image.png",
    thumbAlt: "Phosphor terminal interface",
    coverMeta: "// dossier",
    tag: "intro",
    title: "Phosphor protocol",
    description: "Boot the terminal. Decode the signal. Engage the zone.",
    stats: "08 lessons · 1h 42m",
    progress: { value: 40 },
    cta: { label: "resume ▸", href: "#" },
    locked: false,
  },
  ...{
    stamp: "COURSE-03",
    thumbSrc: "/assets/og-image.png",
    thumbAlt: "",
    coverMeta: "restricted",
    tag: "gamma",
    title: "Anomaly triage",
    description: "Reading the perimeter. Threat ladder, response gates.",
    locked: true,
    cta: { label: "locked", href: "#" },
  },
};

export function Example() {
  return <CourseCard {...lockedProps} />;
}
`;

const compactSource = tsx`
import { CourseCard } from "@sektant1/phosphor-ui";

const compactProps = {
  ...{
    stamp: "MOD-001",
    thumbSrc: "/assets/og-image.png",
    thumbAlt: "Phosphor terminal interface",
    coverMeta: "// dossier",
    tag: "intro",
    title: "Phosphor protocol",
    description: "Boot the terminal. Decode the signal. Engage the zone.",
    stats: "08 lessons · 1h 42m",
    progress: { value: 40 },
    cta: { label: "resume ▸", href: "#" },
    locked: false,
  },
  ...{
    stamp: "MOD-002",
    thumbSrc: "/assets/og-image.png",
    thumbAlt: "",
    coverMeta: "field · 9 modules",
    tag: "field",
    title: "Signal decoding",
    description: "From carrier to message. Static, gates, baudrates.",
    stats: "9 modules · 3h44m",
    progress: { value: 1, total: 9 },
    cta: { label: "enter", href: "#" },
  },
};

export function Example() {
  return <CourseCard {...compactProps} />;
}
`;

const withoutArtSource = tsx`
import { CourseCard } from "@sektant1/phosphor-ui";



const withoutArtProps = {
  ...{
    stamp: "MOD-001",
    thumbSrc: "/assets/og-image.png",
    thumbAlt: "Phosphor terminal interface",
    coverMeta: "// dossier",
    tag: "intro",
    title: "Phosphor protocol",
    description: "Boot the terminal. Decode the signal. Engage the zone.",
    stats: "08 lessons · 1h 42m",
    progress: { value: 40 },
    cta: { label: "resume ▸", href: "#" },
    locked: false,
  },
  ...{
    showCover: false,
    tag: "entry",
    title: "Cold-boot operations",
    description:
      "Bring a dead terminal back online. Wire, light, listen. Six modules of hands-on work.",
    stats: "6 modules · 24 lessons · 2h12m",
    progress: { value: 4, total: 6 },
    cta: { label: "resume", href: "#" },
  },
};

export function Example() {
  return <CourseCard {...withoutArtProps} />;
}
`;

export const Default: StoryObj<CourseCardProps> = {
  parameters: { docs: { source: source(defaultSource) } },
};

export const Locked: StoryObj<CourseCardProps> = {
  parameters: { docs: { source: source(lockedSource) } },
  args: {
    stamp: "COURSE-03",
    thumbSrc: "/assets/og-image.png",
    thumbAlt: "",
    coverMeta: "restricted",
    tag: "gamma",
    title: "Anomaly triage",
    description: "Reading the perimeter. Threat ladder, response gates.",
    locked: true,
    cta: { label: "locked", href: "#" },
  },
};

export const Compact: StoryObj<CourseCardProps> = {
  parameters: { docs: { source: source(compactSource) } },
  args: {
    stamp: "MOD-002",
    thumbSrc: "/assets/og-image.png",
    thumbAlt: "",
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
  parameters: { docs: { source: source(withoutArtSource) } },
  args: {
    showCover: false,
    tag: "entry",
    title: "Cold-boot operations",
    description:
      "Bring a dead terminal back online. Wire, light, listen. Six modules of hands-on work.",
    stats: "6 modules · 24 lessons · 2h12m",
    progress: { value: 4, total: 6 },
    cta: { label: "resume", href: "#" },
  },
};
