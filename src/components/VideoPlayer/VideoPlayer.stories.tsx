import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { VideoPlayer } from "./VideoPlayer";

const meta: Meta<typeof VideoPlayer> = {
  title: "Components/VideoPlayer",
  component: VideoPlayer,
};
export default meta;

type Story = StoryObj<typeof VideoPlayer>;

export const Default: Story = {
  args: {
    tag: "REC",
    timecode: "00:42:17",
    progress: 35,
    time: "01:12 / 03:24",
  },
};

export const NoScanline: Story = {
  args: {
    tag: "PLAY",
    progress: 80,
    time: "02:42 / 03:24",
    scanline: false,
  },
};
