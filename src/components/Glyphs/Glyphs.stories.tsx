import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Glyphs, Glyph, DEFAULT_GLYPHS } from "./Glyphs";
import type { GlyphsProps } from "./Glyphs";

const meta: Meta<GlyphsProps> = {
  title: "Components/Glyphs",
  component: Glyphs,
  argTypes: {
    showLabels: { control: "boolean" },
  },
};
export default meta;

type Story = StoryObj<GlyphsProps>;

export const Default: Story = {
  args: { showLabels: true },
};

export const NoLabels: Story = {
  args: { showLabels: false },
};

export const Interactive: Story = {
  render: () => {
    const [picked, setPicked] = React.useState<string>("◈");
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        <div style={{ fontFamily: "var(--font-terminal)", color: "var(--phosphor-bright)" }}>
          picked: <Glyph char={picked} size={22} />
        </div>
        <Glyphs onSelect={(g) => setPicked(g.char)} />
      </div>
    );
  },
};

export const Custom: Story = {
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
  render: () => (
    <div style={{ fontFamily: "var(--font-body)", color: "var(--ink)", lineHeight: 1.7 }}>
      transmission <Glyph char="▸" size={18} /> phase lock <Glyph char="◆" size={18} /> end-of-frame{" "}
      <Glyph char="█" size={18} />
    </div>
  ),
};

export const Catalog: Story = {
  render: () => (
    <div style={{ padding: 24, background: "var(--bg)", minHeight: "100vh" }}>
      <h2
        style={{
          fontFamily: "var(--font-heading)",
          color: "var(--phosphor-bright)",
          textShadow: "var(--glow-emerald)",
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
