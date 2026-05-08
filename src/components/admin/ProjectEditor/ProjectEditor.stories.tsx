import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { ProjectEditor } from "./ProjectEditor";
import type { ProjectEditorProps } from "./ProjectEditor";
import { basicUsage } from "../../../stories/basicUsage";

const meta: Meta<ProjectEditorProps> = {
  title: "Organisms/ProjectEditor",
  component: ProjectEditor,
  args: {
    initial: {
      title: "Phosphor UI",
      slug: "phosphor-ui",
      description: "CRT component library",
      status: "draft",
      tags: ["react", "typescript"],
      links: [{ label: "github", url: "https://github.com" }],
      featured: false,
    },
  },
};
export default meta;

export const Default: StoryObj<ProjectEditorProps> = {
  parameters: { docs: { source: { code: basicUsage.ProjectEditor } } },
  render: (args) => React.createElement(ProjectEditor, args),
};
