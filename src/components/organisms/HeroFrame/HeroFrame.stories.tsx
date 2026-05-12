import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { HeroFrame } from "./HeroFrame";
import { source, tsx } from "../../../stories/source";

const meta: Meta<typeof HeroFrame> = {
  title: "Organisms/HeroFrame",
  component: HeroFrame,
  parameters: { layout: "fullscreen" },
};
export default meta;

const defaultSource = tsx`
import { HeroFrame } from "@sektant1/phosphor-ui";

export function Example() {
  return (
      <HeroFrame
        text="PHOSPHOR"
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
    );
}
`;

type Story = StoryObj<typeof HeroFrame>;

export const Default: Story = {
  parameters: { docs: { source: source(defaultSource) } },
  render: () => (
    <HeroFrame
      text="PHOSPHOR"
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
