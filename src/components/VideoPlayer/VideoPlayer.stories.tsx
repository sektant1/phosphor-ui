import type { Meta, StoryObj } from "@storybook/react";
import { VideoPlayer } from "./VideoPlayer";
import type { VideoPlayerProps } from "./VideoPlayer";

const meta: Meta<VideoPlayerProps> = {
  title: "Components/VideoPlayer",
  component: VideoPlayer,
  argTypes: {
    src:      { control: "text" },
    poster:   { control: "text" },
    tag:      { control: "text" },
    timecode: { control: "text" },
    autoplay: { control: "boolean" },
    loop:     { control: "boolean" },
    muted:    { control: "boolean" },
    controls: { control: "boolean" },
  },
  args: {
    src: "https://vjs.zencdn.net/v/oceans.mp4",
    poster: "https://vjs.zencdn.net/v/oceans.png",
    tag: "REC",
    timecode: "00:42:17",
    controls: true,
    muted: true,
  },
};
export default meta;

export const Default: StoryObj<VideoPlayerProps> = {};

export const HlsStream: StoryObj<VideoPlayerProps> = {
  args: {
    src: {
      src: "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8",
      type: "application/x-mpegURL",
    },
    poster: undefined,
    tag: "LIVE",
    timecode: undefined,
  },
};
