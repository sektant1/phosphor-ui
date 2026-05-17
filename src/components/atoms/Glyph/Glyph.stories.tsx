import type { Meta, StoryObj } from "@storybook/react";
import { Glyph } from "./";
import type { GlyphProps } from "./Glyph";
import { Row } from "../../templates/Layout";
import { source, tsx } from "../../../stories/source";

const meta: Meta<GlyphProps> = {
  title: "Atoms/Glyph",
  component: Glyph,
  argTypes: {
    char: { control: "text" },
    name: { control: "text" },
    label: { control: "text" },
    tone: {
      control: "inline-radio",
      options: ["primary", "accent", "danger", "muted", "inherit"],
    },
    boxed: { control: "boolean" },
    decorative: { control: "boolean" },
    size: { control: "number" },
  },
  args: { char: "◆", size: 24, tone: "primary" },
};

export default meta;

const defaultSource = tsx`
import { Glyph } from "phosphor-ui";



const defaultProps = {
    char: "◆",
    size: 24,
  };

export function Example() {
  return <Glyph {...defaultProps} />;
}
`;

const namedSource = tsx`
import { Glyph, Row } from "phosphor-ui";

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
