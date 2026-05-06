import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { FooterStencil } from "./FooterStencil";

const meta: Meta<typeof FooterStencil> = {
  title: "Components/FooterStencil",
  component: FooterStencil,
  parameters: { layout: "fullscreen" },
};
export default meta;

type Story = StoryObj<typeof FooterStencil>;

export const Default: Story = {
  args: {
    tape: "// PHOSPHOR ZONE // BROADCAST //",
    object: {
      trefoil: "  ☢  ",
      stamp: "OBJ-04",
      fields: [
        { label: "ID", value: "PZ-04" },
        { label: "TYPE", value: "transmitter" },
      ],
    },
    dossier: {
      heading: "// dossier",
      fields: [
        { label: "OP", value: "sektant1" },
        { label: "ZONE", value: "07-G" },
      ],
      links: [
        { label: "logs", href: "#" },
        { label: "comms", href: "#", glyph: "▸" },
      ],
    },
    rx: {
      heading: "// rx",
      rows: [
        { label: "SIG", bars: "▮▮▮▮▯▯▯", value: "57%" },
        { label: "NSE", bars: "▮▮▯▯▯▯▯", value: "lo" },
      ],
      status: { label: "LINK", value: "stable" },
    },
    prompt: "~/zone-net $",
    eofText: "transmission complete",
  },
};
