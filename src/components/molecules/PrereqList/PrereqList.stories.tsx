import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { PrereqList } from "./PrereqList";
import { source, tsx } from "../../../stories/source";

const meta: Meta<typeof PrereqList> = {
  title: "Molecules/PrereqList",
  component: PrereqList,
};
export default meta;

const defaultSource = tsx`
import { PrereqList } from "@sektant1/phosphor-ui";



const defaultProps = {
    heading: "// prerequisites",
    stamp: "REQ-01",
    items: [
      { title: "Phosphor protocol intro", sub: "module 00", status: "met" },
      { title: "Decoding signals", sub: "module 01", status: "missing" },
      { title: "Lab kit assembled", status: "soft" },
    ],
  };

export function Example() {
  return <PrereqList {...defaultProps} />;
}
`;

type Story = StoryObj<typeof PrereqList>;

export const Default: Story = {
  parameters: { docs: { source: source(defaultSource) } },
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
