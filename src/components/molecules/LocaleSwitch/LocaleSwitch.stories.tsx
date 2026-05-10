import type { Meta, StoryObj } from "@storybook/react";
import { LocaleSwitch } from "./LocaleSwitch";
import type { LocaleSwitchItem } from "./LocaleSwitch";
import { source, tsx } from "../../../stories/source";

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

const defaultSource = tsx`
import { LocaleSwitch } from "@sektant1/phosphor-ui";

const defaultProps = {
    locales,
    variant: "segmented",
    size: "md",
  };

export function Example() {
  return <LocaleSwitch {...defaultProps} />;
}
`;

const inlineSource = tsx`
import { LocaleSwitch } from "@sektant1/phosphor-ui";

const inlineProps = {
  ...{
    locales,
    variant: "segmented",
    size: "md",
  },
  ...{
    variant: "inline",
  },
};

export function Example() {
  return <LocaleSwitch {...inlineProps} />;
}
`;

const terminalSource = tsx`
import { LocaleSwitch } from "@sektant1/phosphor-ui";

const terminalProps = {
  ...{
    locales,
    variant: "segmented",
    size: "md",
  },
  ...{
    variant: "terminal",
  },
};

export function Example() {
  return <LocaleSwitch {...terminalProps} />;
}
`;

const mobileWidthSource = tsx`
import { LocaleSwitch } from "@sektant1/phosphor-ui";



const mobileWidthProps = {
    locales,
    variant: "segmented",
    size: "md",
  };

export function Example() {
  return <LocaleSwitch {...mobileWidthProps} />;
}
`;

type Story = StoryObj<typeof LocaleSwitch>;

export const Default: Story = {
  parameters: { docs: { source: source(defaultSource) } },
};

export const Inline: Story = {
  parameters: { docs: { source: source(inlineSource) } },
  args: {
    variant: "inline",
  },
};

export const Terminal: Story = {
  parameters: { docs: { source: source(terminalSource) } },
  args: {
    variant: "terminal",
  },
};

export const MobileWidth: Story = {
  parameters: { docs: { source: source(mobileWidthSource) } },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: "18rem" }}>
        <Story />
      </div>
    ),
  ],
};
