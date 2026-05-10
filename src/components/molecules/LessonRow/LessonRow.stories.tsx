import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { LessonRow, LessonList } from "./LessonRow";
import { source, tsx } from "../../../stories/source";

const meta: Meta<typeof LessonRow> = {
  title: "Molecules/LessonRow",
  component: LessonRow,
};
export default meta;

const defaultSource = tsx`
import { LessonList, LessonRow } from "@sektant1/phosphor-ui";



export function Example() {
  return (
      <LessonList>
        <LessonRow num="01" title="Boot sequence" length="6m" kind="read" state="done" />
        <LessonRow num="02" title="Decode the signal" length="12m" kind="video" state="current" />
        <LessonRow num="03" title="Lab: assemble rig" length="22m" kind="lab" />
        <LessonRow num="04" title="Checkpoint" length="4m" kind="quiz" />
        <LessonRow num="05" title="Encrypted vault" kind="locked" state="locked" />
      </LessonList>
    );
}
`;

type Story = StoryObj<typeof LessonRow>;

export const Default: Story = {
  parameters: { docs: { source: source(defaultSource) } },
  render: () => (
    <LessonList>
      <LessonRow num="01" title="Boot sequence" length="6m" kind="read" state="done" />
      <LessonRow num="02" title="Decode the signal" length="12m" kind="video" state="current" />
      <LessonRow num="03" title="Lab: assemble rig" length="22m" kind="lab" />
      <LessonRow num="04" title="Checkpoint" length="4m" kind="quiz" />
      <LessonRow num="05" title="Encrypted vault" kind="locked" state="locked" />
    </LessonList>
  ),
};
