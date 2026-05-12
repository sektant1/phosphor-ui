import type { Meta, StoryObj } from "@storybook/react";
import { FeatureList } from "./FeatureList";

const FEATURES = [
  {
    title: "No rounded corners",
    body: "border-radius: 0 everywhere except LED dots.",
  },
  {
    title: "No emoji",
    body: "Box-drawing glyphs only: ▌ ▸ ▾ █ ▓ ▒ ░ ☢ ◇.",
  },
  {
    title: "Glow over shadows",
    body: "Emphasis = text-shadow: var(--glow-emerald).",
  },
  {
    title: "Inverted block hover",
    body: "background: var(--phosphor); color: var(--bg) — no transitions.",
  },
  {
    title: "Mono fonts only",
    body: "Bender, VCR OSD Mono, JetBrains Mono.",
  },
];

const meta = {
  title: "Molecules/FeatureList",
  component: FeatureList,
  args: {
    items: FEATURES,
  },
} satisfies Meta<typeof FeatureList>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
