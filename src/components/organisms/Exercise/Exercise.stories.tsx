import type { Meta, StoryObj } from "@storybook/react";
import { Exercise } from "./Exercise";
import type { ExerciseProps } from "./Exercise";
import { source, tsx } from "../../../stories/source";

const meta: Meta<ExerciseProps> = {
  title: "Organisms/Exercise",
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

const defaultSource = tsx`
import { Exercise } from "@sektant1/phosphor-ui";



const defaultProps = {
    n:        1,
    title:    "Binary Search",
    children: "Implement binary search on a sorted integer slice. Click tasks to track progress.",
    tasks: [
      { label: "Handle empty slice edge case", done: true },
      { label: "Implement iterative version",  done: true },
      { label: "Implement recursive version"              },
      { label: "Benchmark against linear search"         },
    ],
  };

export function Example() {
  return <Exercise {...defaultProps} />;
}
`;

export const Default: StoryObj<ExerciseProps> = {
  parameters: { docs: { source: source(defaultSource) } },
};
