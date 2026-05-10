import type { Meta, StoryObj } from "@storybook/react";
import { Heading, H1, H2, H3, H4, H5, H6 } from "./Headings";
import type { HeadingProps } from "./Headings";
import { basicUsage } from "../../../stories/basicUsage";

const meta: Meta<HeadingProps> = {
  title: "Foundations/Typography",
  component: Heading,
  argTypes: {
    level: { control: "inline-radio", options: [1, 2, 3, 4, 5, 6] },
    glyph: { control: "text" },
    glyphPosition: { control: "inline-radio", options: ["start", "end"] },
    children: { control: "text" },
  },
  args: {
    level: 1,
    glyph: "◆",
    children: "SECTOR-7 АНОМАЛЬНАЯ АКТИВНОСТЬ",
  },
};
export default meta;

type Story = StoryObj<HeadingProps>;

export const Default: Story = {
  parameters: { docs: { source: { code: basicUsage.Heading } } },
};

export const Levels: Story = {
  parameters: { docs: { source: { code: basicUsage.HeadingLevels } } },
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
      <H1 glyph="◆">SECTOR-7 АНОМАЛЬНАЯ АКТИВНОСТЬ</H1>
      <H2>transmission log</H2>
      <H3 glyph="▸">artifact recovery</H3>
      <H4 glyph="└─">side note</H4>
      <H5 glyph=">">dense subsection</H5>
      <H6 glyph="//">tertiary metadata</H6>
    </div>
  ),
};

export const Stack: Story = {
  render: () => (
    <article style={{ maxWidth: 720 }}>
      <H1>cold-start the cathode</H1>
      <p className="t-body">
        Pool reuse open DB connections. No new connection per request.
      </p>
      <H2>wiring</H2>
      <p className="t-body">Carrier sweep first. Phase lock after.</p>
      <H3 glyph="▸">phase lock</H3>
      <p className="t-body">Watch for drift on channel 0x4C.</p>
      <H4 glyph="└─">note</H4>
      <p className="t-body">EOF marker is mandatory.</p>
      <H5>calibration</H5>
      <p className="t-body">Small headings now keep their own visual level.</p>
      <H6>metadata</H6>
      <p className="t-caption">lowercase and uppercase scan test</p>
    </article>
  ),
};

export const LongHeadings: Story = {
  render: () => (
    <article style={{ display: "grid", gap: 14, maxWidth: 380 }}>
      <H1 glyph="◆">
        extremely long sector heading wraps across a mobile-width column
      </H1>
      <H2>lowercase section heading keeps display rhythm</H2>
      <H3 glyph="▸">UPPERCASE SUBSECTION CHECK</H3>
      <H4>mixed Case operational note</H4>
      <H5>small lowercase calibration heading</H5>
      <H6>TERTIARY METADATA WRAP CHECK</H6>
    </article>
  ),
};

export const AsOverride: Story = {
  render: () => (
    <H1 as="div" aria-label="display banner">
      rendered as &lt;div&gt; with h1 styling
    </H1>
  ),
};
