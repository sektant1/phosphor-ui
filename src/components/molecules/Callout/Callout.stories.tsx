import type { Meta, StoryObj } from "@storybook/react";
import { Callout, CalloutHeading } from "./Callout";
import type { CalloutProps, CalloutVariant } from "./Callout";
import { basicUsage } from "../../../stories/basicUsage";

const meta: Meta<CalloutProps> = {
  title: "Molecules/Callout",
  component: Callout,
  argTypes: {
    variant: {
      control: "inline-radio",
      options: ["info", "note", "tip", "success", "warn", "danger", "quote", "terminal"],
    },
    size: { control: "inline-radio", options: ["sm", "md", "lg"] },
    title: { control: "text" },
    glyph: { control: "text" },
    hideGlyph: { control: "boolean" },
  },
  args: {
    variant:  "info",
    title:    "// transmission",
    children: "Signal acquired. Decoding payload.",
  },
};
export default meta;

export const Default: StoryObj<CalloutProps> = {
  parameters: { docs: { source: { code: basicUsage.Callout } } },
};

const variants: Array<{
  variant: CalloutVariant;
  title: string;
  children: string;
}> = [
  {
    variant: "info",
    title: "Transmission",
    children: "Signal acquired. Decoding payload.",
  },
  {
    variant: "note",
    title: "Archive note",
    children: "This section maps to the older boot sequence and may reference retired module labels.",
  },
  {
    variant: "tip",
    title: "Field tip",
    children: "Use the checksum before replaying the capture. It catches most drift before it spreads.",
  },
  {
    variant: "success",
    title: "Handshake complete",
    children: "The relay accepted the new key and returned a clean acknowledgement.",
  },
  {
    variant: "warn",
    title: "Volatile",
    children: "This operation changes the live index. Export a snapshot before continuing.",
  },
  {
    variant: "danger",
    title: "Hard stop",
    children: "Do not power-cycle the terminal while the cathode sweep is running.",
  },
  {
    variant: "quote",
    title: "Operator log",
    children: "The screen went bright, then the room went quiet.",
  },
  {
    variant: "terminal",
    title: "Console",
    children: "~/zone-net $ ./decode --channel 0x4c --verify",
  },
];

export const Variants: StoryObj<CalloutProps> = {
  render: () => (
    <div style={{ display: "grid", gap: 10, maxWidth: 760 }}>
      {variants.map((item) => (
        <Callout key={item.variant} variant={item.variant} title={item.title}>
          {item.children}
        </Callout>
      ))}
    </div>
  ),
};

export const Sizes: StoryObj<CalloutProps> = {
  render: () => (
    <div style={{ display: "grid", gap: 10, maxWidth: 760 }}>
      <Callout size="sm" variant="note" title="Small">
        Compact density for sidebars, drawers, and small forms.
      </Callout>
      <Callout size="md" variant="tip" title="Medium">
        Default density for inline guidance and contextual notices.
      </Callout>
      <Callout size="lg" variant="danger" title="Large">
        Higher emphasis for critical information inside page sections.
      </Callout>
    </div>
  ),
};

export const SizeMatrix: StoryObj<CalloutProps> = {
  render: () => (
    <div style={{ display: "grid", gap: 12, maxWidth: 840 }}>
      {(["sm", "md", "lg"] as const).map((size) => (
        <div key={size} style={{ display: "grid", gap: 8 }}>
          <Callout size={size} variant="info" title={`${size} info`}>
            Signal acquired. Decode is running against the current payload.
          </Callout>
          <Callout size={size} variant="warn" title={`${size} warning`}>
            Export a checkpoint before writing new data to the live index.
          </Callout>
          <Callout size={size} variant="terminal" title={`${size} terminal`}>
            ~/zone-net $ ./sync --verify --channel alpha
          </Callout>
        </div>
      ))}
    </div>
  ),
};

export const Narrow: StoryObj<CalloutProps> = {
  args: {
    size: "lg",
    variant: "danger",
    title: "Long mobile warning title",
    children:
      "Critical notices should remain readable when the frame collapses to a narrow column.",
  },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: "18rem" }}>
        <Story />
      </div>
    ),
  ],
};

export const WithActions: StoryObj<CalloutProps> = {
  args: {
    variant: "warn",
    title: "Manual confirmation required",
    children: "The next step modifies published course metadata.",
    actions: (
      <>
        <a href="#confirm">confirm</a>
        <a href="#audit">review log</a>
      </>
    ),
  },
};

export const WithoutGlyph: StoryObj<CalloutProps> = {
  args: {
    variant: "quote",
    title: "Recovered fragment",
    hideGlyph: true,
    children: "Keep the antenna low and the receiver colder than the air.",
  },
};

export const Heading: StoryObj = {
  parameters: { docs: { source: { code: basicUsage.CalloutHeading } } },
  render: () => <CalloutHeading>Signal notes</CalloutHeading>,
};
