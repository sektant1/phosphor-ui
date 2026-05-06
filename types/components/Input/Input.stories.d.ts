import type { Meta, StoryObj } from "@storybook/react";
import { Input, Textarea } from "./Input";
declare const meta: Meta<typeof Input>;
export default meta;
declare type Story = StoryObj<typeof Input>;
export declare const Default: Story;
export declare const CustomPrompt: Story;
export declare const NoCursor: Story;
export declare const TextareaDefault: StoryObj<typeof Textarea>;
