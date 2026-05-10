import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { NoteEditor } from "./NoteEditor";
import type { NoteEditorProps } from "./NoteEditor";
import { source, tsx } from "../../../stories/source";

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

const defaultSource = tsx`
import React from "react";
import { NoteEditor } from "@sektant1/phosphor-ui";



export function Example() {
  const props = {
      initial: {
        title: "Quick thought",
        body: "Something worth capturing before it slips away.",
        tags: ["idea", "go"],
        status: "draft",
      },
    };

  return React.createElement(NoteEditor, props);
}
`;

export const Default: StoryObj<NoteEditorProps> = {
  parameters: { docs: { source: source(defaultSource) } },
  render: (args) => React.createElement(NoteEditor, args),
};
