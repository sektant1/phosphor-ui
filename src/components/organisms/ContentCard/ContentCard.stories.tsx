import type { Meta, StoryObj } from "@storybook/react";
import { ContentCard } from "./ContentCard";
import type { ContentCardProps } from "./ContentCard";
import { source, tsx } from "../../../stories/source";

const meta: Meta<ContentCardProps> = {
  title: "Organisms/ContentCard",
  component: ContentCard,
  args: {
    eyebrow: "PROJECT",
    media: { src: "/assets/og-image.png", alt: "Phosphor terminal interface" },
    coverMeta: "TypeScript · React · MDX",
    title: "Hideout field console",
    description: "A reusable dossier card for projects, posts, tools, releases, and course previews.",
    stats: "updated 2026-05-28",
    actions: [
      { label: "website", href: "#", variant: "primary" },
      { label: "repo", href: "#", variant: "ghost" },
    ],
    variant: "dossier",
  },
};

export default meta;

const defaultSource = tsx`
import { ContentCard } from "phosphor-ui";

export function Example() {
  return (
    <ContentCard
      eyebrow="PROJECT"
      media={{ src: "/assets/og-image.png", alt: "Phosphor terminal interface" }}
      coverMeta="TypeScript · React · MDX"
      title="Hideout field console"
      description="A reusable dossier card for projects, posts, tools, releases, and course previews."
      stats="updated 2026-05-28"
      actions={[
        { label: "website", href: "#", variant: "primary" },
        { label: "repo", href: "#", variant: "ghost" },
      ]}
      variant="dossier"
    />
  );
}
`;

const compactSource = tsx`
import { ContentCard } from "phosphor-ui";

export function Example() {
  return (
    <ContentCard
      eyebrow="POST"
      title="Learning with Claude Code"
      description="Notes from using agentic coding in a real repository."
      stats="12 min read"
      variant="compact"
      chrome="minimal"
    />
  );
}
`;

export const Default: StoryObj<ContentCardProps> = {
  parameters: { docs: { source: source(defaultSource) } },
};

export const Compact: StoryObj<ContentCardProps> = {
  parameters: { docs: { source: source(compactSource) } },
  args: {
    eyebrow: "POST",
    media: undefined,
    coverMeta: undefined,
    title: "Learning with Claude Code",
    description: "Notes from using agentic coding in a real repository.",
    stats: "12 min read",
    actions: undefined,
    variant: "compact",
    chrome: "minimal",
  },
};
