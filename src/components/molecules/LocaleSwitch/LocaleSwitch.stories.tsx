import type { Meta, StoryObj } from "@storybook/react";
import { LocaleSwitch } from "./LocaleSwitch";
import type { LocaleSwitchItem } from "./LocaleSwitch";
import { basicUsage } from "../../../stories/basicUsage";

const locales: LocaleSwitchItem[] = [
  { code: "en", label: "EN", href: "#en", active: true },
  { code: "pt-BR", label: "PT", href: "#pt" },
  { code: "ru", label: "RU", href: "#ru" },
];

const meta: Meta<typeof LocaleSwitch> = {
  title: "Molecules/LocaleSwitch",
  component: LocaleSwitch,
  argTypes: {
    variant: { control: "inline-radio", options: ["inline", "segmented", "terminal"] },
    size: { control: "inline-radio", options: ["sm", "md"] },
    showPrompt: { control: "boolean" },
  },
  args: {
    locales,
    variant: "segmented",
    size: "md",
  },
};

export default meta;

type Story = StoryObj<typeof LocaleSwitch>;

export const Default: Story = {
  parameters: { docs: { source: { code: basicUsage.LocaleSwitch } } },
};

export const Inline: Story = {
  args: {
    variant: "inline",
  },
};

export const Terminal: Story = {
  args: {
    variant: "terminal",
  },
};

export const MobileWidth: Story = {
  decorators: [
    (Story) => (
      <div style={{ maxWidth: "18rem" }}>
        <Story />
      </div>
    ),
  ],
};
