import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { PostPageExample } from "./PostPageExample";
import { demoNav } from "./shared";
import { source, tsx } from "../source";

const meta: Meta<typeof PostPageExample> = {
  title: "Pages/Examples/Post",
  component: PostPageExample,
  parameters: { layout: "fullscreen" },
};

export default meta;

type Story = StoryObj<typeof PostPageExample>;

const code = tsx`
import {
  NerdTreeNav,
  TableOfContents,
  ThreePanelLayout,
} from "phosphor-ui";

const nav = [
  {
    label: "posts",
    defaultOpen: true,
    children: [
      { label: "field-notes.md", href: "/notes/field", active: true },
      { label: "rf-primer.md", href: "/notes/rf" },
    ],
  },
];

const toc = [
  { label: "Carrier wave", href: "#carrier" },
  { label: "Modulation", href: "#modulation" },
  { label: "Antenna geometry", href: "#antenna" },
];

export function PostPage() {
  return (
    <ThreePanelLayout
      left={<NerdTreeNav items={nav} title="~/posts" />}
      leftLabel="Site navigation"
      right={<TableOfContents heading="On this page" items={toc} />}
      rightLabel="On this page"
      main={<article>{/* post body */}</article>}
    />
  );
}
`;

export const Default: Story = {
  args: { nav: demoNav },
  parameters: { docs: { source: source(code) } },
  render: (args) => (
    <div style={{ padding: "1.5rem", minHeight: "100vh" }}>
      <PostPageExample {...args} />
    </div>
  ),
};
