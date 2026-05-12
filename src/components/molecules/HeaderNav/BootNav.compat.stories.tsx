import type { Meta, StoryObj } from "@storybook/react";
import { HeaderNav } from "./HeaderNav";
import { source, tsx } from "../../../stories/source";

const meta: Meta<typeof HeaderNav> = {
  title: "Molecules/BootNav",
  component: HeaderNav,
  parameters: {
    docs: {
      description: {
        component: "Compatibility story for old BootNav docs links. Use HeaderNav in code.",
      },
    },
  },
};
export default meta;

const defaultSource = tsx`
import { HeaderNav } from "phosphor-ui";



const defaultProps = {
    items: [
      { label: "home", href: "#", active: true },
      { label: "log", href: "#log" },
      { label: "courses", href: "#courses" },
      { label: "about", href: "#about", glyph: "*" },
    ],
  };

export function Example() {
  return <HeaderNav {...defaultProps} />;
}
`;

type Story = StoryObj<typeof HeaderNav>;

export const Default: Story = {
  name: "HeaderNav",
  parameters: { docs: { source: source(defaultSource) } },
  args: {
    items: [
      { label: "home", href: "#", active: true },
      { label: "log", href: "#log" },
      { label: "courses", href: "#courses" },
      { label: "about", href: "#about", glyph: "*" },
    ],
  },
};
