import type { Meta, StoryObj } from "@storybook/react";
import { EmptyState } from "./EmptyState";
import type { EmptyStateProps } from "./EmptyState";
import { source, tsx } from "../../../stories/source";

const meta: Meta<EmptyStateProps> = {
  title: "Molecules/EmptyState",
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

const defaultSource = tsx`
import { EmptyState } from "phosphor-ui";



const defaultProps = {
    glyph:  "[ — ]",
    title:  "no transmissions",
    body:   "Nothing here yet. Start writing.",
    action: { label: "new post", href: "#" },
  };

export function Example() {
  return <EmptyState {...defaultProps} />;
}
`;

export const Default: StoryObj<EmptyStateProps> = {
  parameters: { docs: { source: source(defaultSource) } },
};
