import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import SearchResultList from "./SearchResult";

export default {
  title: "Zone/SearchResult",
  component: SearchResultList,
} as ComponentMeta<typeof SearchResultList>;

const Template: ComponentStory<typeof SearchResultList> = (args) => (
  <SearchResultList {...args} />
);

export const WithHits = Template.bind({});
WithHits.args = {
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

export const Empty = Template.bind({});
Empty.args = { hits: [] };
