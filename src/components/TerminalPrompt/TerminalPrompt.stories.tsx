import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { TerminalPrompt } from "./TerminalPrompt";

const meta: Meta<typeof TerminalPrompt> = {
  title: "Components/TerminalPrompt",
  component: TerminalPrompt,
};
export default meta;

type Story = StoryObj<typeof TerminalPrompt>;

export const Default: Story = {
  args: { command: "decode --signal phosphor.zone" },
};

export const WithCursor: Story = {
  args: { command: "ls -la /zone-net", cursor: true },
};

export const CustomPrompt: Story = {
  args: { prompt: "root@phosphor #", command: "shutdown -r now" },
};
