import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { Button } from "../atoms/Button";
import { H1, H2 } from "../atoms/Headings";
import { Hr } from "../atoms/Hr";
import { Tag } from "../atoms/Tag";
import { PostBody } from "../content/MdxComponents";
import { Callout } from "../molecules/Callout";
import { CourseCard } from "../molecules/CourseCard";
import { EmptyState } from "../molecules/EmptyState";
import { PostMeta } from "../molecules/PostMeta";
import { PrereqList } from "../molecules/PrereqList";
import { Search } from "../organisms/Search";
import { Footer } from "../organisms/Footer";
import { PostListing, PostRow } from "../organisms/PostListing";
import { RelatedPosts } from "../organisms/RelatedPosts";
import { Page } from "../templates/Page";
import { Flex, Grid } from "../templates/Layout";

const meta: Meta = {
  title: "Pages/Site Pages",
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;

type Story = StoryObj;

const tagRow = (...tags: string[]) => (
  <Flex gap="xs" wrap="wrap" align="center">
    {tags.map((tag, index) => (
      <Tag key={tag} color={index % 2 === 0 ? "phosphor" : "magenta"}>
        {tag}
      </Tag>
    ))}
  </Flex>
);

const searchHits = [
  {
    title: "boot the terminal",
    href: "#/posts/boot-the-terminal",
    snippet: "Cold cathode setup, discharge routine, and first signal lock.",
    date: "2026-05-06",
    tags: ["operations", "field"],
  },
  {
    title: "signal decoding primer",
    href: "#/courses/signal-decoding",
    snippet: "A compact course for reading carrier drift and phase lock.",
    date: "2026-04-20",
    tags: ["course", "radio"],
  },
  {
    title: "hideout project log",
    href: "#/projects/hideout",
    snippet: "Portfolio shell, post archive, and phosphor interface notes.",
    date: "2026-03-28",
    tags: ["project", "wip"],
  },
];

export const Home: Story = {
  render: () => (
    <main>
      <Page
        variant="project"
        header={
          <Flex direction="column" gap="sm" align="flex-start">
            {tagRow("home", "transmissions", "archive")}
            <H1 glyph="▌" style={{ margin: 0 }}>
              phosphor field desk
            </H1>
            <p className="t-body" style={{ color: "var(--phosphor-dim)", margin: 0 }}>
              Posts, project logs, and course notes from a single-channel CRT interface.
            </p>
          </Flex>
        }
        hero={
          <Callout title="LATEST SIGNAL" variant="info">
            The terminal is online. Three fresh entries are indexed and ready for review.
          </Callout>
        }
        sidebar={
          <PrereqList
            items={[
              { title: "CRT shell", status: "met" },
              { title: "MDX renderer", status: "met" },
              { title: "Admin workflow", status: "soft" },
            ]}
          />
        }
        footer={<Footer brand="phosphor ui" year={2026} />}
      >
        <Grid minItemWidth="18rem" gap="md">
          <CourseCard
            stamp="COURSE"
            tag="START HERE"
            title="cold boot protocol"
            description="Learn the interface vocabulary and navigation rhythm."
            stats="6 modules · 42 min"
            progress={{ value: 40 }}
            cta={{ label: "open", href: "#/courses/cold-boot" }}
          />
          <CourseCard
            stamp="PROJECT"
            tag="WIP"
            title="sektant hideout"
            description="Personal site shell, content archive, and project notes."
            stats="React · MDX · Storybook"
            cta={{ label: "inspect", href: "#/projects/hideout" }}
          />
        </Grid>
      </Page>
    </main>
  ),
};

export const Course: Story = {
  render: () => (
    <main>
      <Page
        variant="project"
        header={
          <Flex direction="column" gap="sm" align="flex-start">
            {tagRow("course", "signal", "beginner")}
            <H1 glyph="▣" style={{ margin: 0 }}>
              signal decoding primer
            </H1>
            <PostMeta date="2026-04-20" readTime="42 min" />
          </Flex>
        }
        sidebar={
          <Callout title="PROGRESS">
            2 of 6 modules complete. Next: carrier sweep.
          </Callout>
        }
      >
        <PostBody>
          <h2>Overview</h2>
          <p>
            A practical path through carrier sweep, phase lock, and field-note capture.
          </p>
          <h2>Modules</h2>
          <ol>
            <li>Boot discipline</li>
            <li>Reading the dial</li>
            <li>Carrier sweep</li>
            <li>Phase lock</li>
          </ol>
        </PostBody>
      </Page>
    </main>
  ),
};

export const About: Story = {
  render: () => (
    <main>
      <Page
        variant="project"
        header={
          <Flex direction="column" gap="sm" align="flex-start">
            {tagRow("about", "operator", "manifest")}
            <H1 glyph="◆" style={{ margin: 0 }}>
              about the station
            </H1>
          </Flex>
        }
        sidebar={<Callout title="CONTACT">operator@phosphor.invalid</Callout>}
      >
        <PostBody>
          <p>
            Phosphor UI is a compact React component library for terminal-heavy
            personal sites, field notes, courseware, and project logs.
          </p>
          <Hr />
          <h2>Principles</h2>
          <p>
            Dense information, restrained glow, readable typography, and reusable
            page primitives over one-off decorative layouts.
          </p>
        </PostBody>
      </Page>
    </main>
  ),
};

export const SearchPage: Story = {
  render: () => (
    <main>
      <Page
        variant="post"
        header={
          <Flex direction="column" gap="sm" align="flex-start">
            {tagRow("search", "index")}
            <H1 glyph="⌕" style={{ margin: 0 }}>
              search transmissions
            </H1>
          </Flex>
        }
        sidebar={
          <EmptyState
            title="Query required"
            body="Type a term into the prompt to reveal matching entries."
          />
        }
      >
        <Search hits={searchHits} placeholder="try signal, project, course..." />
      </Page>
    </main>
  ),
};

export const Archive: Story = {
  render: () => (
    <main>
      <Page
        variant="post"
        header={
          <Flex direction="column" gap="sm" align="flex-start">
            {tagRow("archive", "posts")}
            <H1 glyph="▤" style={{ margin: 0 }}>
              transmission archive
            </H1>
          </Flex>
        }
        footer={
          <RelatedPosts
            label="RELATED"
            posts={[
              { title: "cold cathode notes", href: "#", tags: ["hardware"] },
              { title: "field tape index", href: "#", tags: ["archive"] },
            ]}
          />
        }
      >
        <PostListing>
          <PostRow
            index={1}
            date="2026-05-06"
            title="boot the terminal"
            meta="6m"
            href="#/posts/boot-the-terminal"
          />
          <PostRow
            index={2}
            date="2026-04-20"
            title="signal decoding primer"
            meta="course"
            href="#/courses/signal-decoding"
          />
          <PostRow
            index={3}
            date="2026-03-28"
            title="hideout project log"
            meta="project"
            href="#/projects/hideout"
          />
        </PostListing>
      </Page>
    </main>
  ),
};
