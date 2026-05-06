import type { Meta, StoryObj } from "@storybook/react";
import { TerminalPrompt } from "./TerminalPrompt";
import type { TerminalPromptProps } from "./TerminalPrompt";

const meta: Meta<TerminalPromptProps> = {
  title: "Components/TerminalPrompt",
  component: TerminalPrompt,
  argTypes: {
    prompt:  { control: "text" },
    command: { control: "text" },
    cursor:  { control: "boolean" },
  },
  args: {
    prompt:  "~/$",
    command: "decode --signal phosphor.zone",
    cursor:  true,
  },
};
export default meta;

export const Default: StoryObj<TerminalPromptProps> = {};
