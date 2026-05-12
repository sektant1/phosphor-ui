import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { PostListing, PostRow } from "./PostListing";
import { source, tsx } from "../../../stories/source";

const meta: Meta<typeof PostListing> = {
  title: "Organisms/PostListing",
  component: PostListing,
};
export default meta;

const defaultSource = tsx`
import { PostListing, PostRow } from "phosphor-ui";

export function Example() {
  return (
      <PostListing>
        <PostRow
          date="2026-05-06"
          title="boot the terminal"
          meta="6m"
          href="#"
          thumbSrc="https://picsum.photos/seed/zone-boot/320/200"
          thumbAlt="boot screen"
          index={0}
        />
        <PostRow
          date="2026-05-04"
          title="decode the signal"
          meta="12m"
          href="#"
          thumbSrc="https://media.giphy.com/media/3o6Zt481isNVuQI1l6/giphy.gif"
          thumbAlt="signal gif"
          index={1}
        />
        <PostRow
          date="2026-05-01"
          title="phosphor protocol intro"
          meta="9m"
          href="#"
          index={2}
        />
        <PostRow
          date="2026-04-28"
          title="anomaly catalog"
          meta="14m"
          href="#"
          glyph="◈"
          index={3}
        />
      </PostListing>
    );
}
`;

const allFallbackSource = tsx`
import { PostListing, PostRow } from "phosphor-ui";

export function Example() {
  return (
      <PostListing>
        <PostRow date="2026-05-06" title="boot the terminal" meta="6m" href="#" index={0} />
        <PostRow date="2026-05-04" title="decode the signal" meta="12m" href="#" index={1} glyph="◈" />
        <PostRow date="2026-05-01" title="phosphor protocol intro" meta="9m" href="#" index={2} glyph="▶" />
      </PostListing>
    );
}
`;

const fromDataSource = tsx`
import { PostListing, PostRow } from "phosphor-ui";



const fromDataProps = {
    posts: [
      {
        date: "2026-05-06",
        title: "boot the terminal",
        meta: "6m",
        href: "#boot",
        thumbSrc: "https://picsum.photos/seed/zone-boot/320/200",
        thumbAlt: "boot screen",
      },
      {
        date: "2026-05-04",
        title: "decode the signal",
        meta: "12m",
        href: "#signal",
        glyph: "◈",
      },
      {
        date: "2026-05-01",
        title: "phosphor protocol intro",
        meta: "9m",
        href: "#protocol",
      },
    ],
  };

export function Example() {
  return <PostListing {...fromDataProps} />;
}
`;

type Story = StoryObj<typeof PostListing>;

export const Default: Story = {
  parameters: { docs: { source: source(defaultSource) } },
  render: () => (
    <PostListing>
      <PostRow
        date="2026-05-06"
        title="boot the terminal"
        meta="6m"
        href="#"
        thumbSrc="https://picsum.photos/seed/zone-boot/320/200"
        thumbAlt="boot screen"
        index={0}
      />
      <PostRow
        date="2026-05-04"
        title="decode the signal"
        meta="12m"
        href="#"
        thumbSrc="https://media.giphy.com/media/3o6Zt481isNVuQI1l6/giphy.gif"
        thumbAlt="signal gif"
        index={1}
      />
      <PostRow
        date="2026-05-01"
        title="phosphor protocol intro"
        meta="9m"
        href="#"
        index={2}
      />
      <PostRow
        date="2026-04-28"
        title="anomaly catalog"
        meta="14m"
        href="#"
        glyph="◈"
        index={3}
      />
    </PostListing>
  ),
};

export const AllFallback: Story = {
  parameters: { docs: { source: source(allFallbackSource) } },
  render: () => (
    <PostListing>
      <PostRow date="2026-05-06" title="boot the terminal" meta="6m" href="#" index={0} />
      <PostRow date="2026-05-04" title="decode the signal" meta="12m" href="#" index={1} glyph="◈" />
      <PostRow date="2026-05-01" title="phosphor protocol intro" meta="9m" href="#" index={2} glyph="▶" />
    </PostListing>
  ),
};

export const FromData: Story = {
  parameters: { docs: { source: source(fromDataSource) } },
  args: {
    posts: [
      {
        date: "2026-05-06",
        title: "boot the terminal",
        meta: "6m",
        href: "#boot",
        thumbSrc: "https://picsum.photos/seed/zone-boot/320/200",
        thumbAlt: "boot screen",
      },
      {
        date: "2026-05-04",
        title: "decode the signal",
        meta: "12m",
        href: "#signal",
        glyph: "◈",
      },
      {
        date: "2026-05-01",
        title: "phosphor protocol intro",
        meta: "9m",
        href: "#protocol",
      },
    ],
  },
};
