import type { Meta, StoryObj } from "@storybook/react";
import { EmptyState } from "./EmptyState";
import type { EmptyStateProps } from "./EmptyState";

const meta: Meta<EmptyStateProps> = {
  title: "Components/EmptyState",
  component: EmptyState,
  argTypes: {
    glyph:  { control: "text" },
    title:  { control: "text" },
    body:   { control: "text" },
  },
  args: {
    glyph:  "[ — ]",
    title:  "no transmissions",
    body:   "Nothing here yet. Start writing.",
    action: { label: "new post", href: "#" },
  },
};
export default meta;

export const Default: StoryObj<EmptyStateProps> = {};
