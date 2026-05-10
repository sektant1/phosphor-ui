import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import SearchResultList, { SearchResult } from "./SearchResult";
import { source, tsx } from "../../../stories/source";

const meta: Meta<typeof SearchResultList> = {
  title: "Molecules/SearchResult",
  component: SearchResultList,
};

export default meta;

const defaultSource = tsx`
import { SearchResult, SearchResultList } from "@sektant1/phosphor-ui";

const defaultProps = {
    hits: [
      {
        href: "/posts/vim-quickstart",
        title: "Vim quickstart",
        date: "2025-08-12",
        tags: ["vim", "setup"],
        snippet: (
          <>
            Configure <mark>vim</mark> with sane defaults and a minimal init.lua.
          </>
        ),
      },
      {
        href: "/posts/zone-design",
        title: "Zone design notes",
        date: "2025-09-01",
        tags: ["design"],
        snippet: <>CRT phosphor + magenta accents on dark background.</>,
      },
    ],
  };

export function Example() {
  return <SearchResultList {...defaultProps} />;
}
`;

const emptySource = tsx`
import { SearchResult, SearchResultList } from "@sektant1/phosphor-ui";

const emptyProps = { hits: [] };

export function Example() {
  return <SearchResultList {...emptyProps} />;
}
`;

const singleSource = tsx`
import { SearchResult, SearchResultList } from "@sektant1/phosphor-ui";



export function Example() {
  return (
      <ul className="pho-search-list search-list">
        <SearchResult
          hit={{
            href: "/posts/vim-quickstart",
            title: "Vim quickstart",
            snippet: "Configure vim with sane defaults.",
          }}
        />
      </ul>
    );
}
`;
type Story = StoryObj<typeof SearchResultList>;

export const Default: Story = {
  args: {
    hits: [
      {
        href: "/posts/vim-quickstart",
        title: "Vim quickstart",
        date: "2025-08-12",
        tags: ["vim", "setup"],
        snippet: (
          <>
            Configure <mark>vim</mark> with sane defaults and a minimal init.lua.
          </>
        ),
      },
      {
        href: "/posts/zone-design",
        title: "Zone design notes",
        date: "2025-09-01",
        tags: ["design"],
        snippet: <>CRT phosphor + magenta accents on dark background.</>,
      },
    ],
  },
  parameters: { docs: { source: source(defaultSource) } },
};

export const Empty: Story = {
  parameters: { docs: { source: source(emptySource) } },
  args: { hits: [] },
};

export const Single: StoryObj = {
  parameters: { docs: { source: source(singleSource) } },
  render: () => (
    <ul className="pho-search-list search-list">
      <SearchResult
        hit={{
          href: "/posts/vim-quickstart",
          title: "Vim quickstart",
          snippet: "Configure vim with sane defaults.",
        }}
      />
    </ul>
  ),
};
