import type { Meta, StoryObj } from "@storybook/react";
import { SiteShell } from "./SiteShell";
import { Post } from "../../pages/Post";
import { Callout } from "../../molecules/Callout";
import { PostListing } from "../../organisms/PostListing";

const meta = {
  title: "Presets/SiteShell",
  component: SiteShell,
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof SiteShell>;

export default meta;

type Story = StoryObj<typeof meta>;

export const PersonalWiki: Story = {
  args: {
    title: "field notes",
    tagline: "personal wiki / build log / second brain",
    nav: [
      { label: "notes", href: "#notes", active: true },
      { label: "projects", href: "#projects" },
      { label: "archive", href: "#archive" },
    ],
    footerLinks: [
      { label: "rss", href: "#rss" },
      { label: "github", href: "#github" },
    ],
    children: (
      <Post
        title="Signal map"
        headerProps={{
          eyebrow: "wiki / index",
          meta: {
            date: "2026-05-09",
            readTime: "4 min",
            tags: ["notes", "systems", "garden"],
          },
        }}
        sidebar={
          <PostListing
            posts={[
              { title: "Workbench protocol", href: "#workbench", date: "05.02", meta: "8m" },
              { title: "Reading queue", href: "#reading", date: "04.27", meta: "5m" },
              { title: "Archive map", href: "#archive-map", date: "04.19", meta: "11m" },
            ]}
          />
        }
      >
        <p>
          A compact shell for a personal knowledge base: header, readable post
          body, sidebar, skip link, and footer wired with the CRT treatment.
        </p>
        <Callout title="note" variant="info">
          Import one CSS file, then compose pages from the stable root exports.
        </Callout>
      </Post>
    ),
  },
};
