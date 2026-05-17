import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { CoursePageExample } from "./CoursePageExample";
import { demoNav } from "./shared";
import { source, tsx } from "../source";

const meta: Meta<typeof CoursePageExample> = {
  title: "Pages/Examples/Course",
  component: CoursePageExample,
  parameters: { layout: "fullscreen" },
};

export default meta;

type Story = StoryObj<typeof CoursePageExample>;

const code = tsx`
import {
  ContextPanel,
  NerdTreeNav,
  Tabs,
  ThreePanelLayout,
} from "phosphor-ui";

const tabs = [
  { id: "modules", label: "Modules", content: <ModuleList /> },
  { id: "exercises", label: "Exercises", content: <ExerciseList /> },
  { id: "resources", label: "Resources", content: <ResourceList /> },
];

export function CoursePage() {
  return (
    <ThreePanelLayout
      left={<NerdTreeNav items={nav} title="~/courses" />}
      leftLabel="Course tree"
      right={
        <ContextPanel title="Lesson 02">
          <Tabs items={tabs} defaultValue="modules" />
        </ContextPanel>
      }
      rightLabel="Lesson sidebar"
      main={<article>{/* lesson body */}</article>}
    />
  );
}
`;

export const Default: Story = {
  args: { nav: demoNav },
  parameters: { docs: { source: source(code) } },
  render: (args) => (
    <div style={{ padding: "1.5rem", minHeight: "100vh" }}>
      <CoursePageExample {...args} />
    </div>
  ),
};
