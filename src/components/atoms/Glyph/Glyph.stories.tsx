import type { Meta, StoryObj } from "@storybook/react";
import { Glyph } from "./";
import { source, tsx } from "../../../stories/source";

const meta: Meta<typeof Glyph> = {
  title: "Atoms/Glyph",
  component: Glyph,
};

export default meta;

const defaultSource = tsx`
import { Glyph } from "@sektant1/phosphor-ui";



const defaultProps = {
    char: "◆",
    size: 24,
  };

export function Example() {
  return <Glyph {...defaultProps} />;
}
`;

export const Default: StoryObj<typeof Glyph> = {
  parameters: { docs: { source: source(defaultSource) } },
  args: {
    char: "◆",
    size: 24,
  },
};
