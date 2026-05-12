import type { Meta, StoryObj } from "@storybook/react";
import { Search } from "./Search";
import type { SearchProps } from "./Search";
import { source, tsx } from "../../../stories/source";

const meta: Meta<SearchProps> = {
  title: "Organisms/Search",
  component: Search,
  argTypes: {
    placeholder: { control: "text" },
    prompt:      { control: "text" },
    label:       { control: "text" },
  },
  args: {
    placeholder:  "search transmissions...",
    prompt:       "/>",
    label:        "search",
    emptyMessage: "no transmissions found.",
    hits: [
      {
        href:    "#",
        title:   "Boot the terminal",
        date:    "2026-01-12",
        tags:    ["linux", "shell"],
        snippet: "Power on, decode the welcome banner, learn the prompt.",
      },
      {
        href:    "#",
        title:   "Binary search in Go",
        date:    "2026-02-08",
        tags:    ["go", "algorithms"],
        snippet: "Implement and benchmark iterative vs recursive binary search.",
      },
      {
        href:    "#",
        title:   "CSS container queries",
        date:    "2026-03-21",
        tags:    ["css", "responsive"],
        snippet: "Responsive components that react to their own width, not the viewport.",
      },
      {
        href:    "#",
        title:   "Shiki syntax highlighting",
        date:    "2026-04-15",
        tags:    ["tooling", "dx"],
        snippet: "Custom TextMate themes for terminal-aesthetic code blocks.",
      },
    ],
  },
};
export default meta;

const defaultSource = tsx`
import { Search } from "phosphor-ui";

export function Example() {
  return (
    <Search
      placeholder="search transmissions..."
      prompt="/>"
      label="search"
      emptyMessage="no transmissions found."
      hits={[
        {
          href: "#",
          title: "Boot the terminal",
          date: "2026-01-12",
          tags: ["linux", "shell"],
          snippet: "Power on, decode the welcome banner, learn the prompt.",
        },
        {
          href: "#",
          title: "Binary search in Go",
          date: "2026-02-08",
          tags: ["go", "algorithms"],
          snippet: "Implement and benchmark iterative vs recursive binary search.",
        },
      ]}
    />
  );
}
`;

export const Default: StoryObj<SearchProps> = {
  parameters: { docs: { source: source(defaultSource) } },
};
