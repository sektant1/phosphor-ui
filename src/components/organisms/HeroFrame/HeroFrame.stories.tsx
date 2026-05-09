import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { HeroFrame } from "./HeroFrame";
import { basicUsage } from "../../../stories/basicUsage";

const art = [
  "      .-======-.",
  "   .- PHOSPHOR -.",
  "  /   SIGNAL LOCK \\",
  "  |    CH 0x4C    |",
  "  \\_______________/",
].join("\\n");

const meta: Meta<typeof HeroFrame> = {
  title: "Organisms/HeroFrame",
  component: HeroFrame,
  parameters: { layout: "fullscreen" },
};
export default meta;

type Story = StoryObj<typeof HeroFrame>;

export const Default: Story = {
  parameters: { docs: { source: { code: basicUsage.HeroFrame } } },
  render: () => (
    <HeroFrame
      art={art}
      topHud={
        <>
          <HeroFrame.HudLed variant="rec" />
          <HeroFrame.HudLabel>REC</HeroFrame.HudLabel>
          <HeroFrame.HudSpacer />
          <HeroFrame.HudText>00:42:17</HeroFrame.HudText>
        </>
      }
      bottomHud={
        <>
          <HeroFrame.HudLabel>SIG</HeroFrame.HudLabel>
          <HeroFrame.HudBars value={5} />
          <HeroFrame.HudSpacer />
          <HeroFrame.HudTape text="// PHOSPHOR ZONE //" />
        </>
      }
    />
  ),
};
