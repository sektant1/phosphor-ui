import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import SearchResultList, { SearchResult } from "./SearchResult";
import { basicUsage } from "../../../stories/basicUsage";

export default {
  title: "Molecules/SearchResult",
  component: SearchResultList,
} as ComponentMeta<typeof SearchResultList>;

const Template: ComponentStory<typeof SearchResultList> = (args) => (
  <SearchResultList {...args} />
);

export const Default = Template.bind({});
Default.args = {
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
Default.parameters = { docs: { source: { code: basicUsage.SearchResultList } } };

export const Empty = Template.bind({});
Empty.args = { hits: [] };

export const Single = {
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
