import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Modal, Drawer } from "./Modal";
import type { ModalProps, DrawerProps } from "./Modal";
import { source, tsx } from "../../../stories/source";

const meta: Meta<ModalProps> = {
  title: "Molecules/Modal",
  component: Modal,
  argTypes: {
    open: { control: "boolean" },
    title: { control: "text" },
    description: { control: "text" },
    closeLabel: { control: "text" },
    closeOnEscape: { control: "boolean" },
    closeOnOverlayClick: { control: "boolean" },
  },
  args: {
    open: false,
    title: "// transmission",
    closeLabel: "close",
    closeOnEscape: true,
    closeOnOverlayClick: true,
  },
};
export default meta;

const defaultSource = tsx`
import React from "react";
import { Drawer, Modal } from "phosphor-ui";

export function Example() {
  const [open, setOpen] = useState(false);
      return (
        <div>
          <button onClick={() => setOpen(true)}>open modal</button>
          <Modal open={open} onClose={() => setOpen(false)} title="// transmission">
            <p style={{ color: "var(--pho-color-text)" }}>Modal body content here.</p>
          </Modal>
        </div>
      );
}
`;

const drawerRightSource = tsx`
import React from "react";
import { Drawer, Modal } from "phosphor-ui";



export function Example() {
  const [open, setOpen] = useState(false);
      return (
        <div>
          <button onClick={() => setOpen(true)}>open drawer</button>
          <Drawer open={open} onClose={() => setOpen(false)} title="// panel" side="right">
            <p style={{ color: "var(--pho-color-text)" }}>Drawer body content here.</p>
          </Drawer>
        </div>
      );
}
`;

export const Default: StoryObj<ModalProps> = {
  parameters: { docs: { source: source(defaultSource) } },
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <div>
        <button onClick={() => setOpen(true)}>open modal</button>
        <Modal open={open} onClose={() => setOpen(false)} title="// transmission">
          <p style={{ color: "var(--pho-color-text)" }}>Modal body content here.</p>
        </Modal>
      </div>
    );
  },
};

export const DrawerRight: StoryObj<DrawerProps> = {
  parameters: { docs: { source: source(drawerRightSource) } },
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <div>
        <button onClick={() => setOpen(true)}>open drawer</button>
        <Drawer open={open} onClose={() => setOpen(false)} title="// panel" side="right">
          <p style={{ color: "var(--pho-color-text)" }}>Drawer body content here.</p>
        </Drawer>
      </div>
    );
  },
};
