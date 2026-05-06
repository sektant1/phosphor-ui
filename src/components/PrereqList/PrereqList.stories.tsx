import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { PrereqList } from "./PrereqList";

const meta: Meta<typeof PrereqList> = {
  title: "Components/PrereqList",
  component: PrereqList,
};
export default meta;

type Story = StoryObj<typeof PrereqList>;

export const Default: Story = {
  args: {
    heading: "// prerequisites",
    stamp: "REQ-01",
    items: [
      { title: "Phosphor protocol intro", sub: "module 00", status: "met" },
      { title: "Decoding signals", sub: "module 01", status: "missing" },
      { title: "Lab kit assembled", status: "soft" },
    ],
  },
};
