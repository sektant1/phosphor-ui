import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "./Button";
import type { ButtonProps, ButtonSize, ButtonVariant } from "./Button";
import { source, tsx } from "../../../stories/source";

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
    children: { control: "text" },
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

const defaultSource = tsx`
import { Button } from "@sektant1/phosphor-ui";

const defaultProps = {
    children: "Engage",
    variant:  "primary",
    size:     "md",
    disabled: false,
    pressed:  false,
  };

export function Example() {
  return <Button {...defaultProps} />;
}
`;

const variantsSource = tsx`
import { Button } from "@sektant1/phosphor-ui";

const variants= [
  "primary",
  "secondary",
  "accent",
  "ghost",
  "quiet",
  "danger",
];

export function Example() {
  return (
      <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
        {variants.map((variant) => (
          <Button key={variant} variant={variant}>
            {variant}
          </Button>
        ))}
      </div>
    );
}
`;

const sizesSource = tsx`
import { Button } from "@sektant1/phosphor-ui";

const sizes= ["sm", "md", "lg"];

export function Example() {
  return (
      <div style={{ alignItems: "center", display: "flex", flexWrap: "wrap", gap: 12 }}>
        {sizes.map((size) => (
          <Button key={size} size={size}>
            {size}
          </Button>
        ))}
      </div>
    );
}
`;

const statesSource = tsx`
import { Button } from "@sektant1/phosphor-ui";

export function Example() {
  return (
      <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
        <Button pressed>Pressed</Button>
        <Button loading>Loading</Button>
        <Button disabled>Disabled</Button>
        <Button variant="danger" loading>
          Purging
        </Button>
      </div>
    );
}
`;

const linksSource = tsx`
import { Button } from "@sektant1/phosphor-ui";

export function Example() {
  return (
      <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
        <Button href="#button-link">Anchor</Button>
        <Button href="#disabled-link" disabled variant="ghost">
          Disabled anchor
        </Button>
        <Button href="https://example.com" target="_blank" variant="accent">
          External
        </Button>
      </div>
    );
}
`;

const fullWidthSource = tsx`
import { Button } from "@sektant1/phosphor-ui";



const fullWidthProps = {
  ...{
    children: "Engage",
    variant:  "primary",
    size:     "md",
    disabled: false,
    pressed:  false,
  },
  ...{
    children: "Confirm transmission",
    fullWidth: true,
    variant: "secondary",
  },
};

export function Example() {
  return <Button {...fullWidthProps} />;
}
`;

export const Default: StoryObj<ButtonProps> = {
  parameters: { docs: { source: source(defaultSource) } },
};

export const Variants: StoryObj<ButtonProps> = {
  parameters: { docs: { source: source(variantsSource) } },
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
  parameters: { docs: { source: source(sizesSource) } },
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
  parameters: { docs: { source: source(statesSource) } },
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
  parameters: { docs: { source: source(linksSource) } },
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
  parameters: { docs: { source: source(fullWidthSource) } },
  args: {
    children: "Confirm transmission",
    fullWidth: true,
    variant: "secondary",
  },
};
