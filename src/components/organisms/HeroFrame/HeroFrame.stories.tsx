import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Container } from "../../templates/Layout";
import { HeroFrame } from "./HeroFrame";
import { Button } from "../../atoms/Button";
import { source, tsx } from "../../../stories/source";

const meta: Meta<typeof HeroFrame> = {
  title: "Organisms/HeroFrame",
  component: HeroFrame,
  parameters: { layout: "fullscreen" },
};
export default meta;

type Story = StoryObj<typeof HeroFrame>;

const defaultSource = tsx`
import { HeroFrame, Button } from "phosphor-ui";

export function Example() {
  return (
    <HeroFrame
      text="PHOSPHOR"
      subtitle="// terminal-grade UI primitives for the post-CRT web"
      actions={
        <>
          <Button>Get started</Button>
          <Button variant="ghost">Docs</Button>
        </>
      }
    />
  );
}
`;

export const Default: Story = {
  parameters: { docs: { source: source(defaultSource) } },
  render: () => (
    <HeroFrame
      text="PHOSPHOR"
      subtitle="// terminal-grade UI primitives for the post-CRT web"
      actions={
        <>
          <Button>Get started</Button>
          <Button variant="ghost">Docs</Button>
        </>
      }
    />
  ),
};

export const TextOnly: Story = {
  render: () => <HeroFrame text="ZONE" />,
};

export const WithSubtitle: Story = {
  render: () => (
    <HeroFrame
      text="SECTOR 7"
      subtitle="single-channel transmissions · CH 0x4C"
    />
  ),
};

export const CustomArt: Story = {
  render: () => (
    <HeroFrame
      art={`  ___  _  _  ___  ___ \n / _ \\| || |/ _ \\/ __|\n| (_) | || | (_) \\__ \\\n \\___/ \\__/ \\___/|___/`}
      subtitle="raw ASCII passthrough"
    />
  ),
};

const constrainedSource = tsx`
import { Container, HeroFrame } from "phosphor-ui";

export function Example() {
  return (
    <Container width="32rem">
      <HeroFrame text="PHOSPHOR" subtitle="responsive scales via container queries" />
    </Container>
  );
}
`;

export const Constrained: Story = {
  parameters: { docs: { source: source(constrainedSource) } },
  render: () => (
    <Container width="32rem">
      <HeroFrame
        text="PHOSPHOR"
        subtitle="responsive scales via container queries"
      />
    </Container>
  ),
};
