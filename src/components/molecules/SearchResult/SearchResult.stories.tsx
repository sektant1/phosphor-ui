import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import SearchResultList, { SearchResult } from "./SearchResult";
import { basicUsage } from "../../../stories/basicUsage";

const meta: Meta<typeof SearchResultList> = {
  title: "Molecules/SearchResult",
  component: SearchResultList,
};

export default meta;
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
  parameters: { docs: { source: { code: basicUsage.SearchResultList } } },
};

export const Empty: Story = {
  args: { hits: [] },
};

export const Single: StoryObj = {
  parameters: { docs: { source: { code: basicUsage.SearchResult } } },
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
