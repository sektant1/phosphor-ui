import type { Meta, StoryObj } from "@storybook/react";
import { VideoPlayer } from "./VideoPlayer";
import type { VideoPlayerProps } from "./VideoPlayer";

const meta: Meta<VideoPlayerProps> = {
  title: "Components/VideoPlayer",
  component: VideoPlayer,
  argTypes: {
    tag:      { control: "text" },
    timecode: { control: "text" },
    progress: { control: { type: "range", min: 0, max: 100, step: 1 } },
    time:     { control: "text" },
    scanline: { control: "boolean" },
  },
  args: {
    tag:      "REC",
    timecode: "00:42:17",
    progress: 35,
    time:     "01:12 / 03:24",
    scanline: true,
  },
};
export default meta;

export const Default: StoryObj<VideoPlayerProps> = {};
