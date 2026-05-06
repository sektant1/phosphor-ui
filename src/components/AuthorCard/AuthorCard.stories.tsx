import type { Meta, StoryObj } from "@storybook/react";
import { AuthorCard } from "./AuthorCard";
import type { AuthorCardProps } from "./AuthorCard";

const meta: Meta<AuthorCardProps> = {
  title: "Components/AuthorCard",
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

export const Default: StoryObj<AuthorCardProps> = {};
