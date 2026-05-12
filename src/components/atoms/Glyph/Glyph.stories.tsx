import type { Meta, StoryObj } from "@storybook/react";
import { Glyph } from "./";
import { Row } from "../../templates/Layout";
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

const namedSource = tsx`
import { Glyph, Row } from "@sektant1/phosphor-ui";

export function Example() {
  return (
    <Row gap="sm" align="center">
      <Glyph name="tri-r" boxed />
      <Glyph name="diamond" tone="accent" boxed />
      <Glyph name="rad" tone="danger" boxed label="radiation" decorative={false} />
    </Row>
  );
}
`;

type Story = StoryObj<typeof Glyph>;

export const Default: Story = {
  parameters: { docs: { source: source(defaultSource) } },
  args: {
    char: "◆",
    size: 24,
  },
};

export const Named: Story = {
  parameters: { docs: { source: source(namedSource) } },
  render: () => (
    <Row gap="sm" align="center">
      <Glyph name="tri-r" boxed />
      <Glyph name="diamond" tone="accent" boxed />
      <Glyph name="rad" tone="danger" boxed label="radiation" decorative={false} />
    </Row>
  ),
};
