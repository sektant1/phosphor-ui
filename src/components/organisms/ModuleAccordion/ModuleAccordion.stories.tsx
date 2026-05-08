import type { Meta, StoryObj } from "@storybook/react";
import { ModuleAccordion } from "./ModuleAccordion";
import type { ModuleAccordionProps } from "./ModuleAccordion";
import { basicUsage } from "../../../stories/basicUsage";

const meta: Meta<ModuleAccordionProps> = {
  title: "Organisms/ModuleAccordion",
  component: ModuleAccordion,
  argTypes: {
    defaultOpen: { control: "boolean" },
  },
  args: {
    num:         "01",
    title:       "Boot the terminal",
    intro:       "Power on, decode the welcome banner, learn the prompt.",
    defaultOpen: true,
    progress:    { value: 50 },
    lessons: [
      { num: "01", title: "Boot sequence",  length: "6m",  state: "done"   },
      { num: "02", title: "Decode banner",  length: "9m",  state: "done"   },
      { num: "03", title: "First command",  length: "12m"                  },
      { num: "04", title: "Encrypted vault",length: "—",   state: "locked" },
    ],
  },
};
export default meta;

export const Default: StoryObj<ModuleAccordionProps> = {
  parameters: { docs: { source: { code: basicUsage.ModuleAccordion } } },
};
