import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Modal, Drawer } from "./Modal";
import type { ModalProps, DrawerProps } from "./Modal";
import { basicUsage } from "../../../stories/basicUsage";

const meta: Meta<ModalProps> = {
  title: "Molecules/Modal",
  component: Modal,
};
export default meta;

export const Default: StoryObj<ModalProps> = {
  parameters: { docs: { source: { code: basicUsage.Modal } } },
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
  parameters: { docs: { source: { code: basicUsage.Drawer } } },
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
