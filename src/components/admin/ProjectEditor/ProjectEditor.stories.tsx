import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { ProjectEditor } from "./ProjectEditor";
import type { ProjectEditorProps } from "./ProjectEditor";
import { source, tsx } from "../../../stories/source";

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

const defaultSource = tsx`
import React from "react";
import { ProjectEditor } from "@sektant1/phosphor-ui";



export function Example() {
  const props = {
      initial: {
        title: "Phosphor UI",
        slug: "phosphor-ui",
        description: "CRT component library",
        status: "draft",
        tags: ["react", "typescript"],
        links: [{ label: "github", url: "https://github.com" }],
        featured: false,
      },
    };

  return React.createElement(ProjectEditor, props);
}
`;

export const Default: StoryObj<ProjectEditorProps> = {
  parameters: { docs: { source: source(defaultSource) } },
  render: (args) => React.createElement(ProjectEditor, args),
};
