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

const withDescriptionSource = tsx`
import { PostListing } from "phosphor-ui";

export function Example() {
  return (
    <PostListing
      showDescription
      posts={[
        {
          date: "2026-05-06",
          title: "boot the terminal",
          description: "Wake the CRT, calibrate the phosphor decay, and bring the deck online.",
          meta: "6m",
          href: "#boot",
          thumbSrc: "https://picsum.photos/seed/zone-boot/320/200",
        },
        {
          date: "2026-05-04",
          title: "decode the signal",
          description: "A field guide to spectral interference and recovering broadcasts from the noise floor.",
          meta: "12m",
          href: "#signal",
          glyph: "◈",
        },
        {
          date: "2026-05-01",
          title: "phosphor protocol intro",
          description: "Why the zone runs green: history, hardware, and the look we're after.",
          meta: "9m",
          href: "#protocol",
        },
      ]}
    />
  );
}
`;

const searchHitsSource = tsx`
import { PostListing } from "phosphor-ui";

// Consumer search layer feeds <mark> highlighted snippets as description.
export function Example() {
  return (
    <PostListing
      showDescription
      posts={[
        {
          date: "2026-05-06",
          title: "boot the terminal",
          description: (
            <>... wake the <mark>phosphor</mark> stack and calibrate the decay curve ...</>
          ),
          meta: "6m",
          href: "#boot",
        },
        {
          date: "2026-05-01",
          title: "phosphor protocol intro",
          description: (
            <>... why the zone runs green: <mark>phosphor</mark> history and hardware ...</>
          ),
          meta: "9m",
          href: "#protocol",
        },
      ]}
    />
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

export const WithDescription: Story = {
  parameters: { docs: { source: source(withDescriptionSource) } },
  args: {
    showDescription: true,
    posts: [
      {
        date: "2026-05-06",
        title: "boot the terminal",
        description: "Wake the CRT, calibrate the phosphor decay, and bring the deck online.",
        meta: "6m",
        href: "#boot",
        thumbSrc: "https://picsum.photos/seed/zone-boot/320/200",
        thumbAlt: "boot screen",
      },
      {
        date: "2026-05-04",
        title: "decode the signal",
        description:
          "A field guide to spectral interference and recovering broadcasts from the noise floor.",
        meta: "12m",
        href: "#signal",
        glyph: "◈",
      },
      {
        date: "2026-05-01",
        title: "phosphor protocol intro",
        description: "Why the zone runs green: history, hardware, and the look we're after.",
        meta: "9m",
        href: "#protocol",
      },
    ],
  },
};

export const SearchHits: Story = {
  parameters: { docs: { source: source(searchHitsSource) } },
  args: {
    showDescription: true,
    posts: [
      {
        date: "2026-05-06",
        title: "boot the terminal",
        description: (
          <>
            ... wake the <mark>phosphor</mark> stack and calibrate the decay curve ...
          </>
        ),
        meta: "6m",
        href: "#boot",
      },
      {
        date: "2026-05-01",
        title: "phosphor protocol intro",
        description: (
          <>
            ... why the zone runs green: <mark>phosphor</mark> history and hardware ...
          </>
        ),
        meta: "9m",
        href: "#protocol",
      },
    ],
  },
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
