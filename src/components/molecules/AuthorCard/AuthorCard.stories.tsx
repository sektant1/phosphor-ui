import type { Meta, StoryObj } from "@storybook/react";
import { AuthorCard } from "./AuthorCard";
import type { AuthorCardProps } from "./AuthorCard";
import { basicUsage } from "../../../stories/basicUsage";

const meta: Meta<AuthorCardProps> = {
  title: "Molecules/AuthorCard",
  component: AuthorCard,
  argTypes: {
    name:      { control: "text" },
    role:      { control: "text" },
    bio:       { control: "text" },
    avatarSrc: { control: "text" },
  },
  args: {
    name: "sektant1",
    role: "software engineer",
    bio: "Writing about systems, algorithms, and the terminal aesthetic.",
    links: [
      { label: "github", href: "#" },
      { label: "rss",    href: "#" },
    ],
  },
};
export default meta;

export const Default: StoryObj<AuthorCardProps> = {
  parameters: { docs: { source: { code: basicUsage.AuthorCard } } },
};

export const LinkRows: StoryObj<AuthorCardProps> = {
  args: {
    name: "Ada Signal",
    role: "field operator",
    bio: "Keeps relay notes, repair logs, and diagnostics readable under pressure.",
    links: [
      { label: "github", href: "#" },
      { label: "field notes archive", href: "#" },
      { label: "very long telemetry profile link that should stay in one row", href: "#long" },
    ],
  },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: "22rem" }}>
        <Story />
      </div>
    ),
  ],
};
