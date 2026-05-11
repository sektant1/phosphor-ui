import type { Meta, StoryObj } from "@storybook/react";
import { Badge } from "./Badge";
import type { BadgeProps } from "./Badge";
import { source, tsx } from "../../../stories/source";

const meta: Meta<BadgeProps> = {
  title: "Atoms/Badge",
  component: Badge,
  argTypes: {
    tone: {
      control: "inline-radio",
      options: ["primary", "accent", "success", "warn", "danger", "muted"],
    },
    size: { control: "inline-radio", options: ["sm", "md"] },
    leading: { control: "text" },
  },
  args: {
    children: "online",
    tone: "primary",
    size: "md",
  },
};
export default meta;

const defaultSource = tsx`
import { Badge } from "@sektant1/phosphor-ui";

const defaultProps = {
  children: "online",
  tone: "primary",
  size: "md",
};

export function Example() {
  return <Badge {...defaultProps} />;
}
`;

const tonesSource = tsx`
import { Badge } from "@sektant1/phosphor-ui";

export function Example() {
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem" }}>
      <Badge tone="primary">primary</Badge>
      <Badge tone="accent">accent</Badge>
      <Badge tone="success">success</Badge>
      <Badge tone="warn">warn</Badge>
      <Badge tone="danger">danger</Badge>
      <Badge tone="muted">muted</Badge>
    </div>
  );
}
`;

const sizesSource = tsx`
import { Badge } from "@sektant1/phosphor-ui";

export function Example() {
  return (
    <div style={{ alignItems: "center", display: "flex", gap: "0.75rem" }}>
      <Badge size="sm">small</Badge>
      <Badge size="md">medium</Badge>
    </div>
  );
}
`;

const leadingSource = tsx`
import { Badge } from "@sektant1/phosphor-ui";

export function Example() {
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem" }}>
      <Badge tone="success" leading="*">active</Badge>
      <Badge tone="warn" leading="!">queued</Badge>
      <Badge tone="danger" leading="x">failed</Badge>
    </div>
  );
}
`;

const truncationSource = tsx`
import { Badge } from "@sektant1/phosphor-ui";

export function Example() {
  return (
    <div style={{ maxWidth: "12rem" }}>
      <Badge>field-operations-extended</Badge>
    </div>
  );
}
`;

export const Default: StoryObj<BadgeProps> = {
  parameters: { docs: { source: source(defaultSource) } },
};

export const Tones: StoryObj<BadgeProps> = {
  parameters: { docs: { source: source(tonesSource) } },
  render: () => (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem" }}>
      <Badge tone="primary">primary</Badge>
      <Badge tone="accent">accent</Badge>
      <Badge tone="success">success</Badge>
      <Badge tone="warn">warn</Badge>
      <Badge tone="danger">danger</Badge>
      <Badge tone="muted">muted</Badge>
    </div>
  ),
};

export const Sizes: StoryObj<BadgeProps> = {
  parameters: { docs: { source: source(sizesSource) } },
  render: () => (
    <div style={{ alignItems: "center", display: "flex", gap: "0.75rem" }}>
      <Badge size="sm">small</Badge>
      <Badge size="md">medium</Badge>
    </div>
  ),
};

export const WithLeading: StoryObj<BadgeProps> = {
  parameters: { docs: { source: source(leadingSource) } },
  render: () => (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem" }}>
      <Badge tone="success" leading="*">
        active
      </Badge>
      <Badge tone="warn" leading="!">
        queued
      </Badge>
      <Badge tone="danger" leading="x">
        failed
      </Badge>
    </div>
  ),
};

export const Truncation: StoryObj<BadgeProps> = {
  parameters: { docs: { source: source(truncationSource) } },
  args: {
    children: "field-operations-extended",
  },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: "12rem" }}>
        <Story />
      </div>
    ),
  ],
};
