import type { Meta, StoryObj } from "@storybook/react";
import { LessonEditor } from "./LessonEditor";
import type { LessonEditorProps } from "./LessonEditor";
import { source, tsx } from "../../../stories/source";

const meta: Meta<LessonEditorProps> = {
  title: "Organisms/LessonEditor",
  component: LessonEditor,
  args: {
    initial: {
      title: "Decode the signal",
      slug: "decode-the-signal",
      duration: "12m",
      videoUrl: "https://example.com/video.mp4",
      body: "Tune the receiver, then record the payload.",
      tags: ["signals"],
      resources: [{ label: "worksheet", url: "https://example.com" }],
      free: true,
      status: "draft",
    },
  },
};

export default meta;

const defaultSource = tsx`
import { LessonEditor } from "phosphor-ui";



const defaultProps = {
    initial: {
      title: "Decode the signal",
      slug: "decode-the-signal",
      duration: "12m",
      videoUrl: "https://example.com/video.mp4",
      body: "Tune the receiver, then record the payload.",
      tags: ["signals"],
      resources: [{ label: "worksheet", url: "https://example.com" }],
      free: true,
      status: "draft",
    },
  };

export function Example() {
  return <LessonEditor {...defaultProps} />;
}
`;

export const Default: StoryObj<LessonEditorProps> = {
  parameters: { docs: { source: source(defaultSource) } },
};
