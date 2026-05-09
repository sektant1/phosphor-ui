import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "./Button";
import type { ButtonProps, ButtonSize, ButtonVariant } from "./Button";
import { basicUsage } from "../../../stories/basicUsage";

const variants: ButtonVariant[] = [
  "primary",
  "secondary",
  "accent",
  "ghost",
  "quiet",
  "danger",
];

const sizes: ButtonSize[] = ["sm", "md", "lg"];

const meta: Meta<ButtonProps> = {
  title: "Atoms/Button",
  component: Button,
  argTypes: {
    variant:  { control: "inline-radio", options: variants },
    size:     { control: "inline-radio", options: sizes },
    disabled: { control: "boolean" },
    loading:  { control: "boolean" },
    pressed:  { control: "boolean" },
    fullWidth: { control: "boolean" },
  },
  args: {
    children: "Engage",
    variant:  "primary",
    size:     "md",
    disabled: false,
    pressed:  false,
  },
};
export default meta;

export const Default: StoryObj<ButtonProps> = {
  parameters: { docs: { source: { code: basicUsage.Button } } },
};

export const Variants: StoryObj<ButtonProps> = {
  render: () => (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
      {variants.map((variant) => (
        <Button key={variant} variant={variant}>
          {variant}
        </Button>
      ))}
    </div>
  ),
};

export const Sizes: StoryObj<ButtonProps> = {
  render: () => (
    <div style={{ alignItems: "center", display: "flex", flexWrap: "wrap", gap: 12 }}>
      {sizes.map((size) => (
        <Button key={size} size={size}>
          {size}
        </Button>
      ))}
    </div>
  ),
};

export const States: StoryObj<ButtonProps> = {
  render: () => (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
      <Button pressed>Pressed</Button>
      <Button loading>Loading</Button>
      <Button disabled>Disabled</Button>
      <Button variant="danger" loading>
        Purging
      </Button>
    </div>
  ),
};

export const Links: StoryObj<ButtonProps> = {
  render: () => (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
      <Button href="#button-link">Anchor</Button>
      <Button href="#disabled-link" disabled variant="ghost">
        Disabled anchor
      </Button>
      <Button href="https://example.com" target="_blank" variant="accent">
        External
      </Button>
    </div>
  ),
};

export const FullWidth: StoryObj<ButtonProps> = {
  args: {
    children: "Confirm transmission",
    fullWidth: true,
    variant: "secondary",
  },
};
