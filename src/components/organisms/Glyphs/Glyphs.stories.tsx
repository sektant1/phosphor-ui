import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Glyphs, Glyph, DEFAULT_GLYPHS } from "./Glyphs";
import type { GlyphsProps } from "./Glyphs";
import { basicUsage } from "../../../stories/basicUsage";

const meta: Meta<GlyphsProps> = {
  title: "Foundations/Glyphs",
  component: Glyphs,
  argTypes: {
    showLabels: { control: "boolean" },
  },
};
export default meta;

type Story = StoryObj<GlyphsProps>;

export const Default: Story = {
  parameters: { docs: { source: { code: basicUsage.Glyphs } } },
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
        <div style={{ fontFamily: "var(--pho-font-terminal)", color: "var(--pho-color-primary-strong)" }}>
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
    <div style={{ fontFamily: "var(--pho-font-body)", color: "var(--pho-color-text)", lineHeight: 1.7 }}>
      transmission <Glyph char="▸" size={18} /> phase lock <Glyph char="◆" size={18} /> end-of-frame{" "}
      <Glyph char="█" size={18} />
    </div>
  ),
};

export const Catalog: Story = {
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
