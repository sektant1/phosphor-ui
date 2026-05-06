import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { ModuleAccordion } from "./ModuleAccordion";

const meta: Meta<typeof ModuleAccordion> = {
  title: "Components/ModuleAccordion",
  component: ModuleAccordion,
};
export default meta;

type Story = StoryObj<typeof ModuleAccordion>;

export const Default: Story = {
  args: {
    num: "01",
    title: "Boot the terminal",
    intro: "Power on, decode the welcome banner, learn the prompt.",
    progress: { value: 50 },
    lessons: [
      { num: "01", title: "Boot sequence", length: "6m", state: "done" },
      { num: "02", title: "Decode banner", length: "9m", state: "done" },
      { num: "03", title: "First command", length: "12m" },
      { num: "04", title: "Encrypted vault", length: "—", state: "locked" },
    ],
  },
};

export const Collapsed: Story = {
  args: {
    num: "02",
    title: "Signal interception",
    defaultOpen: false,
    progress: { value: 0 },
  },
};
