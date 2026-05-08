import type { Meta, StoryObj } from "@storybook/react";
import { CourseEditor } from "./CourseEditor";
import type { CourseEditorProps } from "./CourseEditor";
import { basicUsage } from "../../../stories/basicUsage";

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

export const Default: StoryObj<CourseEditorProps> = {
  parameters: { docs: { source: { code: basicUsage.CourseEditor } } },
};
