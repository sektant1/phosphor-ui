import type { Meta, StoryObj } from "@storybook/react";
import { CourseEditor } from "./CourseEditor";
import type { CourseEditorProps } from "./CourseEditor";
import { source, tsx } from "../../../stories/source";

const meta: Meta<CourseEditorProps> = {
  title: "Organisms/CourseEditor",
  component: CourseEditor,
  args: {
    initial: {
      title: "Cold-Boot Operations",
      slug: "cold-boot-operations",
      tagline: "Bring a dead terminal back online.",
      description: "A practical course for field operators.",
      price: "49.00",
      tags: ["terminal", "field"],
      modules: [{ id: "m1", title: "Boot sequence" }],
      featured: false,
      status: "draft",
    },
  },
};

export default meta;

const defaultSource = tsx`
import { CourseEditor } from "@sektant1/phosphor-ui";



const defaultProps = {
    initial: {
      title: "Cold-Boot Operations",
      slug: "cold-boot-operations",
      tagline: "Bring a dead terminal back online.",
      description: "A practical course for field operators.",
      price: "49.00",
      tags: ["terminal", "field"],
      modules: [{ id: "m1", title: "Boot sequence" }],
      featured: false,
      status: "draft",
    },
  };

export function Example() {
  return <CourseEditor {...defaultProps} />;
}
`;

export const Default: StoryObj<CourseEditorProps> = {
  parameters: { docs: { source: source(defaultSource) } },
};
