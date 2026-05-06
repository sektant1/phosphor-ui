import type { Meta, StoryObj } from "@storybook/react";
import { Exercise } from "./Exercise";
import type { ExerciseProps } from "./Exercise";

const meta: Meta<ExerciseProps> = {
  title: "Components/Exercise",
  component: Exercise,
  argTypes: {
    n:     { control: "number" },
    title: { control: "text" },
  },
  args: {
    n:        1,
    title:    "Binary Search",
    children: "Implement binary search on a sorted integer slice. Click tasks to track progress.",
    tasks: [
      { label: "Handle empty slice edge case", done: true },
      { label: "Implement iterative version",  done: true },
      { label: "Implement recursive version"              },
      { label: "Benchmark against linear search"         },
    ],
  },
};
export default meta;

export const Default: StoryObj<ExerciseProps> = {};
