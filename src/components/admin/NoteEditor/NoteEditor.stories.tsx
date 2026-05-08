import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { NoteEditor } from "./NoteEditor";
import type { NoteEditorProps } from "./NoteEditor";
import { basicUsage } from "../../../stories/basicUsage";

const meta: Meta<NoteEditorProps> = {
  title: "Organisms/NoteEditor",
  component: NoteEditor,
  args: {
    initial: {
      title: "Quick thought",
      body: "Something worth capturing before it slips away.",
      tags: ["idea", "go"],
      status: "draft",
    },
  },
};
export default meta;

export const Default: StoryObj<NoteEditorProps> = {
  parameters: { docs: { source: { code: basicUsage.NoteEditor } } },
  render: (args) => React.createElement(NoteEditor, args),
};
