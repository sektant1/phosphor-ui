import type { Meta, StoryObj } from "@storybook/react";
import { AuthorCard } from "./AuthorCard";
import type { AuthorCardProps } from "./AuthorCard";
import { source, tsx } from "../../../stories/source";

const meta: Meta<AuthorCardProps> = {
  title: "Molecules/AuthorCard",
  component: AuthorCard,
  argTypes: {
    name: { control: "text" },
    role: { control: "text" },
    bio: { control: "text" },
    avatarSrc: { control: "text" },
  },
  args: {
    name: "sektant1",
    role: "software engineer",
    bio: "Writing about systems, algorithms, and the terminal aesthetic.",
    links: [
      { label: "github", href: "#" },
      { label: "rss", href: "#" },
    ],
  },
};
export default meta;

const defaultSource = tsx`
import { AuthorCard } from "phosphor-ui";

const defaultProps = {
    name: "sektant1",
    role: "software engineer",
    bio: "Writing about systems, algorithms, and the terminal aesthetic.",
    links: [
      { label: "github", href: "#" },
      { label: "rss",    href: "#" },
    ],
  };

export function Example() {
  return <AuthorCard {...defaultProps} />;
}
`;

const linkRowsSource = tsx`
import { AuthorCard } from "phosphor-ui";



const linkRowsProps = {
  ...{
    name: "sektant1",
    role: "software engineer",
    bio: "Writing about systems, algorithms, and the terminal aesthetic.",
    links: [
      { label: "github", href: "#" },
      { label: "rss",    href: "#" },
    ],
  },
  ...{
    name: "Ada Signal",
    role: "field operator",
    bio: "Keeps relay notes, repair logs, and diagnostics readable under pressure.",
    links: [
      { label: "github", href: "#" },
      { label: "field notes archive", href: "#" },
      { label: "very long telemetry profile link that should wrap without overflow", href: "#long" },
    ],
  },
};

export function Example() {
  return (
    <div style={{ width: "min(22rem, 100%)" }}>
      <AuthorCard {...linkRowsProps} />
    </div>
  );
}
`;

export const Default: StoryObj<AuthorCardProps> = {
  parameters: { docs: { source: source(defaultSource) } },
};

export const LinkRows: StoryObj<AuthorCardProps> = {
  parameters: { docs: { source: source(linkRowsSource) } },
  args: {
    name: "Ada Signal",
    role: "field operator",
    bio: "Keeps relay notes, repair logs, and diagnostics readable under pressure.",
    links: [
      { label: "github", href: "#" },
      { label: "field notes archive", href: "#" },
      {
        label:
          "very long telemetry profile link that should wrap without overflow",
        href: "#long",
      },
    ],
  },
  decorators: [
    (Story) => (
      <div>
        <Story />
      </div>
    ),
  ],
};
