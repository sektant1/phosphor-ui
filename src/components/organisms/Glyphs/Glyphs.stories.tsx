import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Glyphs, DEFAULT_GLYPHS } from "./Glyphs";
import { Glyph } from "../../atoms/Glyph";
import type { GlyphsProps } from "./Glyphs";
import { source, tsx } from "../../../stories/source";

const meta: Meta<GlyphsProps> = {
  title: "Foundations/Glyphs",
  component: Glyphs,
  argTypes: {
    showLabels: { control: "boolean" },
  },
};
export default meta;

const defaultSource = tsx`
import { DEFAULT_GLYPHS, Glyph, Glyphs } from "phosphor-ui";

const defaultProps = { showLabels: true };

export function Example() {
  return <Glyphs {...defaultProps} />;
}
`;

const noLabelsSource = tsx`
import { DEFAULT_GLYPHS, Glyph, Glyphs } from "phosphor-ui";

const noLabelsProps = { showLabels: false };

export function Example() {
  return <Glyphs {...noLabelsProps} />;
}
`;

const interactiveSource = tsx`
import React from "react";
import { DEFAULT_GLYPHS, Glyph, Glyphs } from "phosphor-ui";

export function Example() {
  const [picked, setPicked] = React.useState<string>("◈");
      return (
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <div style={{ fontFamily: "var(--pho-font-terminal)", color: "var(--pho-color-primary-strong)" }}>
            picked: <Glyph char={picked} size={22} />
          </div>
          <Glyphs onSelect={(g) => setPicked(g.char)} />
        </div>
      );
}
`;

const customSource = tsx`
import { DEFAULT_GLYPHS, Glyph, Glyphs } from "phosphor-ui";

const customProps = {
    items: [
      { char: "◈", name: "node" },
      { char: "▶", name: "play" },
      { char: "■", name: "halt" },
      { char: "▌", name: "rail" },
    ],
  };

export function Example() {
  return <Glyphs {...customProps} />;
}
`;

const inlineGlyphSource = tsx`
import { DEFAULT_GLYPHS, Glyph, Glyphs } from "phosphor-ui";

export function Example() {
  return (
      <div style={{ fontFamily: "var(--pho-font-body)", color: "var(--pho-color-text)", lineHeight: 1.7 }}>
        transmission <Glyph char="▸" size={18} /> phase lock <Glyph char="◆" size={18} /> end-of-frame{" "}
        <Glyph char="█" size={18} />
      </div>
    );
}
`;

const catalogSource = tsx`
import { DEFAULT_GLYPHS, Glyph, Glyphs } from "phosphor-ui";



export function Example() {
  return (
      <div style={{ padding: 24, background: "var(--pho-color-background)", minHeight: "100vh" }}>
        <h2
          style={{
            fontFamily: "var(--pho-font-heading)",
            color: "var(--pho-color-primary-strong)",
            textShadow: "var(--pho-glow-primary)",
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            marginBottom: 16,
          }}
        >
          // glyph catalog ({DEFAULT_GLYPHS.length})
        </h2>
        <Glyphs />
      </div>
    );
}
`;

type Story = StoryObj<GlyphsProps>;

export const Default: Story = {
  parameters: { docs: { source: source(defaultSource) } },
  args: { showLabels: true },
};

export const NoLabels: Story = {
  parameters: { docs: { source: source(noLabelsSource) } },
  args: { showLabels: false },
};

export const Interactive: Story = {
  parameters: { docs: { source: source(interactiveSource) } },
  render: () => {
    const [picked, setPicked] = React.useState<string>("◈");
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        <div style={{ fontFamily: "var(--pho-font-terminal)", color: "var(--pho-color-primary-strong)" }}>
          picked: <Glyph char={picked} size={22} />
        </div>
        <Glyphs onSelect={(g) => setPicked(g.char)} />
      </div>
    );
  },
};

export const Custom: Story = {
  parameters: { docs: { source: source(customSource) } },
  args: {
    items: [
      { char: "◈", name: "node" },
      { char: "▶", name: "play" },
      { char: "■", name: "halt" },
      { char: "▌", name: "rail" },
    ],
  },
};

export const InlineGlyph: Story = {
  parameters: { docs: { source: source(inlineGlyphSource) } },
  render: () => (
    <div style={{ fontFamily: "var(--pho-font-body)", color: "var(--pho-color-text)", lineHeight: 1.7 }}>
      transmission <Glyph char="▸" size={18} /> phase lock <Glyph char="◆" size={18} /> end-of-frame{" "}
      <Glyph char="█" size={18} />
    </div>
  ),
};

export const Catalog: Story = {
  parameters: { docs: { source: source(catalogSource) } },
  render: () => (
    <div style={{ padding: 24, background: "var(--pho-color-background)", minHeight: "100vh" }}>
      <h2
        style={{
          fontFamily: "var(--pho-font-heading)",
          color: "var(--pho-color-primary-strong)",
          textShadow: "var(--pho-glow-primary)",
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          marginBottom: 16,
        }}
      >
        // glyph catalog ({DEFAULT_GLYPHS.length})
      </h2>
      <Glyphs />
    </div>
  ),
};
