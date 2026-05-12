import type { Meta, StoryObj } from "@storybook/react";
import { VideoPlayer } from "./VideoPlayer";
import type { VideoPlayerProps } from "./VideoPlayer";
import { source, tsx } from "../../../stories/source";

const meta: Meta<VideoPlayerProps> = {
  title: "Organisms/VideoPlayer",
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

const defaultSource = tsx`
import { VideoPlayer } from "phosphor-ui";

export function Example() {
  return (
    <VideoPlayer
      src="https://vjs.zencdn.net/v/oceans.mp4"
      poster="https://vjs.zencdn.net/v/oceans.png"
      tag="REC"
      timecode="00:42:17"
      muted
    />
  );
}
`;

const hlsStreamSource = tsx`
import { VideoPlayer } from "phosphor-ui";

export function Example() {
  return (
    <VideoPlayer
      src={{
        src: "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8",
        type: "application/x-mpegURL",
      }}
      tag="LIVE"
      muted
    />
  );
}
`;

export const Default: StoryObj<VideoPlayerProps> = {
  parameters: { docs: { source: source(defaultSource) } },
};

export const HlsStream: StoryObj<VideoPlayerProps> = {
  parameters: { docs: { source: source(hlsStreamSource) } },
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
