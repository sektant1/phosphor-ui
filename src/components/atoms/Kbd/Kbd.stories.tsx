import type { Meta, StoryObj } from "@storybook/react";
import { Kbd } from "./Kbd";
import type { KbdProps } from "./Kbd";
import { Row } from "../../templates/Layout";
import { source, tsx } from "../../../stories/source";

const meta: Meta<KbdProps> = {
  title: "Atoms/Kbd",
  component: Kbd,
  argTypes: {
    variant: { control: "inline-radio", options: ["default", "accent", "muted"] },
    children: { control: "text" },
  },
  args: { variant: "default", children: "Cmd K" },
};

export default meta;

const defaultSource = tsx`
import { Kbd } from "phosphor-ui";

export function Example() {
  return <Kbd>Cmd K</Kbd>;
}
`;

const sequenceSource = tsx`
import { Kbd, Row } from "phosphor-ui";

export function Example() {
  return (
    <Row as="p" align="center" gap="xs">
      <Kbd>Ctrl</Kbd>
      <span>+</span>
      <Kbd>K</Kbd>
    </Row>
  );
}
`;

const variantsSource = tsx`
import { Kbd, Row } from "phosphor-ui";

export function Example() {
  return (
    <Row align="center" gap="sm" wrap="wrap">
      <Kbd>Enter</Kbd>
      <Kbd variant="accent">Cmd K</Kbd>
      <Kbd variant="muted">Esc</Kbd>
    </Row>
  );
}
`;

type Story = StoryObj<typeof Kbd>;

export const Default: Story = {
  parameters: { docs: { source: source(defaultSource) } },
  render: () => <Kbd>Cmd K</Kbd>,
};

export const Sequence: Story = {
  parameters: { docs: { source: source(sequenceSource) } },
  render: () => (
    <Row as="p" align="center" gap="xs">
      <Kbd>Ctrl</Kbd>
      <span>+</span>
      <Kbd>K</Kbd>
    </Row>
  ),
};

export const Variants: Story = {
  parameters: { docs: { source: source(variantsSource) } },
  render: () => (
    <Row align="center" gap="sm" wrap="wrap">
      <Kbd>Enter</Kbd>
      <Kbd variant="accent">Cmd K</Kbd>
      <Kbd variant="muted">Esc</Kbd>
    </Row>
  ),
};
