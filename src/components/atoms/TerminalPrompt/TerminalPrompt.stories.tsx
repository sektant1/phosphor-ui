import type { Meta, StoryObj } from "@storybook/react";
import { TerminalPrompt } from "./TerminalPrompt";
import type { TerminalPromptProps } from "./TerminalPrompt";
import { source, tsx } from "../../../stories/source";

const meta: Meta<TerminalPromptProps> = {
  title: "Atoms/TerminalPrompt",
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

const defaultSource = tsx`
import { TerminalPrompt } from "@sektant1/phosphor-ui";



const defaultProps = {
    prompt:  "~/$",
    command: "decode --signal phosphor.zone",
    cursor:  true,
  };

export function Example() {
  return <TerminalPrompt {...defaultProps} />;
}
`;

export const Default: StoryObj<TerminalPromptProps> = {
  parameters: { docs: { source: source(defaultSource) } },
};
