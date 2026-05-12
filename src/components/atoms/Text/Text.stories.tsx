import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import Text from "./Text";
import { Column } from "../../templates/Layout";
import { source, tsx } from "../../../stories/source";

const meta: Meta<typeof Text> = {
  title: "Atoms/Text",
  component: Text,
  argTypes: {
    variant: {
      control: "select",
      options: [
        "h1",
        "h2",
        "h3",
        "h4",
        "h5",
        "h6",
        "lead",
        "body",
        "small",
        "caption",
        "mono",
        "code",
        "terminal",
        "stamp",
        "prompt",
        "glow",
        "glow-pale",
        "muted",
        "dim",
        "faded",
      ],
    },
  },
};

export default meta;

const defaultSource = tsx`
import { Text } from "phosphor-ui";

const defaultProps = { variant: "body", children: "// pool reuse open DB connections" };

export function Example() {
  return <Text {...defaultProps} />;
}
`;

const h2Source = tsx`
import { Text } from "phosphor-ui";

const h2Props = { variant: "h2", children: "transmission log" };

export function Example() {
  return <Text {...h2Props} />;
}
`;

const typeScaleSource = tsx`
import React from "react";
import { Text } from "phosphor-ui";

export function Example() {
  return (
      <div style={{ display: "grid", gap: "0.75rem", maxWidth: 760 }}>
        {[
          ["h1", "Primary sector heading with overflow discipline"],
          ["h2", "Transmission log"],
          ["h3", "Artifact recovery"],
          ["h4", "Operational note"],
          ["h5", "Dense subsection"],
          ["h6", "Tertiary metadata"],
          ["lead", "Readable intro copy for posts, wiki entries, and project pages."],
          ["body", "Body text keeps the phosphor tone without glow-heavy fatigue."],
          ["small", "Small supporting copy remains legible in dense interfaces."],
          ["caption", "updated 2026-05-10"],
          ["mono", "const phase = \\"locked\\";"],
          ["code", "npm run validate:package"],
          ["terminal", "signal acquired"],
          ["stamp", "// LAST CONTACT //"],
        ].map(([variant, text]) => (
          <Text key={variant} variant={variant as React.ComponentProps<typeof Text>["variant"]}>
            {text}
          </Text>
        ))}
      </div>
    );
}
`;

const visualRegressionSource = tsx`
import { Text } from "phosphor-ui";

export function Example() {
  return (
      <div style={{ display: "grid", gap: "1rem", maxWidth: 360 }}>
        <Text variant="h1" balance>
          extremely long heading wraps cleanly without crowding adjacent content
        </Text>
        <Text variant="h5">lowercase subsection remains uppercase by style</Text>
        <Text variant="h6">UPPERCASE METADATA LEVEL</Text>
        <Text variant="small">
          Small text remains readable on narrow mobile widths and does not depend
          on raw component font sizes.
        </Text>
        <Text variant="code">const nested = ["prose", "code", "caption"];</Text>
        <Text variant="caption">mobile width · lowercase/uppercase · code blocks</Text>
      </div>
    );
}
`;

const leadSource = tsx`
import { Text } from "phosphor-ui";

const leadProps = {
    variant: "lead",
    children: "Readable intro copy for posts, wiki entries, and project pages.",
  };

export function Example() {
  return <Text {...leadProps} />;
}
`;

const captionSource = tsx`
import { Text } from "phosphor-ui";

const captionProps = { variant: "caption", children: "updated 2026-05-09" };

export function Example() {
  return <Text {...captionProps} />;
}
`;

const stampSource = tsx`
import { Text } from "phosphor-ui";



const stampProps = { variant: "stamp", children: "// LAST CONTACT //" };

export function Example() {
  return <Text {...stampProps} />;
}
`;

const utilitiesSource = tsx`
import { Column, Text } from "phosphor-ui";

export function Example() {
  return (
    <Column gap="sm" style={{ width: "min(420px, 90vw)" }}>
      <Text tone="accent" transform="uppercase" nowrap>
        publish queue
      </Text>
      <Text tone="muted" align="center">
        Centered muted helper text for dense CMS panels.
      </Text>
      <Text variant="caption" tone="danger" truncate>
        destructive action requires an explicit confirmation token
      </Text>
    </Column>
  );
}
`;
type Story = StoryObj<typeof Text>;

export const Default: Story = {
  args: { variant: "body", children: "// pool reuse open DB connections" },
  parameters: { docs: { source: source(defaultSource) } },
};

export const H2: Story = {
  parameters: { docs: { source: source(h2Source) } },
  args: { variant: "h2", children: "transmission log" },
};

export const TypeScale: Story = {
  parameters: { docs: { source: source(typeScaleSource) } },
  render: () => (
    <div style={{ display: "grid", gap: "0.75rem", maxWidth: 760 }}>
      {[
        ["h1", "Primary sector heading with overflow discipline"],
        ["h2", "Transmission log"],
        ["h3", "Artifact recovery"],
        ["h4", "Operational note"],
        ["h5", "Dense subsection"],
        ["h6", "Tertiary metadata"],
        ["lead", "Readable intro copy for posts, wiki entries, and project pages."],
        ["body", "Body text keeps the phosphor tone without glow-heavy fatigue."],
        ["small", "Small supporting copy remains legible in dense interfaces."],
        ["caption", "updated 2026-05-10"],
        ["mono", "const phase = \"locked\";"],
        ["code", "npm run validate:package"],
        ["terminal", "signal acquired"],
        ["stamp", "// LAST CONTACT //"],
      ].map(([variant, text]) => (
        <Text key={variant} variant={variant as React.ComponentProps<typeof Text>["variant"]}>
          {text}
        </Text>
      ))}
    </div>
  ),
};

export const VisualRegression: Story = {
  parameters: { docs: { source: source(visualRegressionSource) } },
  render: () => (
    <div style={{ display: "grid", gap: "1rem", maxWidth: 360 }}>
      <Text variant="h1" balance>
        extremely long heading wraps cleanly without crowding adjacent content
      </Text>
      <Text variant="h5">lowercase subsection remains uppercase by style</Text>
      <Text variant="h6">UPPERCASE METADATA LEVEL</Text>
      <Text variant="small">
        Small text remains readable on narrow mobile widths and does not depend
        on raw component font sizes.
      </Text>
      <Text variant="code">const nested = ["prose", "code", "caption"];</Text>
      <Text variant="caption">mobile width · lowercase/uppercase · code blocks</Text>
    </div>
  ),
};

export const Lead: Story = {
  parameters: { docs: { source: source(leadSource) } },
  args: {
    variant: "lead",
    children: "Readable intro copy for posts, wiki entries, and project pages.",
  },
};

export const Caption: Story = {
  parameters: { docs: { source: source(captionSource) } },
  args: { variant: "caption", children: "updated 2026-05-09" },
};

export const Stamp: Story = {
  parameters: { docs: { source: source(stampSource) } },
  args: { variant: "stamp", children: "// LAST CONTACT //" },
};

export const Utilities: Story = {
  parameters: { docs: { source: source(utilitiesSource) } },
  render: () => (
    <Column gap="sm" style={{ width: "min(420px, 90vw)" }}>
      <Text tone="accent" transform="uppercase" nowrap>
        publish queue
      </Text>
      <Text tone="muted" align="center">
        Centered muted helper text for dense CMS panels.
      </Text>
      <Text variant="caption" tone="danger" truncate>
        destructive action requires an explicit confirmation token
      </Text>
    </Column>
  ),
};
