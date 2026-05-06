import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { PostListing, PostRow } from "./PostListing";

const meta: Meta<typeof PostListing> = {
  title: "Components/PostListing",
  component: PostListing,
};
export default meta;

type Story = StoryObj<typeof PostListing>;

export const Default: Story = {
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
  render: () => (
    <PostListing>
      <PostRow date="2026-05-06" title="boot the terminal" meta="6m" href="#" index={0} />
      <PostRow date="2026-05-04" title="decode the signal" meta="12m" href="#" index={1} glyph="◈" />
      <PostRow date="2026-05-01" title="phosphor protocol intro" meta="9m" href="#" index={2} glyph="▶" />
    </PostListing>
  ),
};
