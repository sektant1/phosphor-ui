import type { Meta, StoryObj } from "@storybook/react";
import { AsciiBanner } from "./AsciiBanner";
import type { AsciiBannerProps } from "./AsciiBanner";
import { source, tsx } from "../../../stories/source";

const meta: Meta<AsciiBannerProps> = {
  title: "Molecules/AsciiBanner",
  component: AsciiBanner,
  argTypes: {
    href:  { control: "text" },
    label: { control: "text" },
    text: { control: "text" },
    font: { control: "text" },
  },
  args: { text: "PHOSPHOR" },
};
export default meta;

const defaultSource = tsx`
import { AsciiBanner } from "phosphor-ui";

const defaultProps = { text: "PHOSPHOR" };

export function Example() {
  return <AsciiBanner {...defaultProps} />;
}
`;

const withFallbackSource = tsx`
import { AsciiBanner } from "phosphor-ui";

const withFallbackProps = {
  text: "PHOSPHOR",
  ...{
    fallback: "PHOSPHOR",
    label: "Phosphor home",
  },
};

export function Example() {
  return <AsciiBanner {...withFallbackProps} />;
}
`;

export const Default: StoryObj<AsciiBannerProps> = {
  parameters: { docs: { source: source(defaultSource) } },};

export const WithFallback: StoryObj<AsciiBannerProps> = {
  parameters: { docs: { source: source(withFallbackSource) } },
  args: {
    fallback: "PHOSPHOR",
    label: "Phosphor home",
  },
};
WithFallback.parameters = {
  docs: {
    source: {
      code: `<AsciiBanner
  text="PHOSPHOR"
  fallback="PHOSPHOR"
  label="Phosphor home"
/>`,
    },
  },
};
