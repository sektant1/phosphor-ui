import type { Meta, StoryObj } from "@storybook/react";
import { Glyph } from "./";
import { basicUsage } from "../../../stories/basicUsage";

const meta: Meta<typeof Glyph> = {
  title: "Atoms/Glyph",
  component: Glyph,
};

export default meta;

export const Default: StoryObj<typeof Glyph> = {
  parameters: { docs: { source: { code: basicUsage.Glyph } } },
  args: {
    char: "◆",
    size: 24,
  },
};
