import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import {
  AdminShell,
  ArticleList,
  Button,
  Callout,
  ContentEditor,
  CourseCard,
  Form,
  Grid,
  H2,
  HeroFrame,
  ProgressBar,
  SiteShell,
  Stack,
  StatPill,
  Tag,
  Text,
} from "../components";
import { source, tsx } from "./source";

const meta: Meta = {
  title: "Pages/Examples/Composed",
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;

const pageFrame = {
  padding: "1.5rem",
  minHeight: "100vh",
} satisfies React.CSSProperties;

const personalBlogSource = tsx`
import { ArticleList, Callout, H2, SiteShell, Tag } from "phosphor-ui";

export function Example() {
  return (
    <SiteShell
      title="field notes"
      tagline="personal blog / signal archive"
      nav={[
        { label: "notes", href: "#notes" },
        { label: "projects", href: "#projects" },
      ]}
      crt={false}
    >
      <H2 id="notes">Latest transmissions</H2>
      <Callout title="Now decoding" variant="info">
        Memory maps, terminal interfaces, and field research logs.
      </Callout>
      <ArticleList
        items={[
          { title: "Boot sequence notes", href: "#boot", meta: "05.10", description: "A compact map of startup rituals." },
          { title: "CRT layout diary", href: "#crt", meta: "05.04", description: "How the interface stays dense without becoming noisy." },
        ]}
      />
      <Tag>personal wiki</Tag>
    </SiteShell>
  );
}
`;

const wikiPageSource = tsx`
import { ArticleList, H2, ProgressBar, SiteShell, Text } from "phosphor-ui";

export function Example() {
  return (
    <SiteShell title="ops wiki" tagline="knowledge base" crt={false}>
      <H2>Packet capture checklist</H2>
      <Text variant="lead">A reusable runbook for tracing a failing ingestion job.</Text>
      <ProgressBar value={4} total={7} label="Runbook coverage" />
      <ArticleList
        glyph="§"
        items={[
          { title: "Inputs", href: "#inputs", description: "Validate source, clock, and payload shape." },
          { title: "Transforms", href: "#transforms", description: "Compare normalized records against raw capture." },
          { title: "Publish", href: "#publish", description: "Confirm index and cache invalidation." },
        ]}
      />
    </SiteShell>
  );
}
`;

const courseLandingSource = tsx`
import { CourseCard, H2, HeroFrame, SiteShell } from "phosphor-ui";

export function Example() {
  return (
    <SiteShell title="cold boot academy" tagline="course terminal" crt={false}>
      <HeroFrame
        art={"COURSE//01\\nMEMORY MAPS"}
        subtitle="Cold boot operations"
      />
      <H2>Modules</H2>
      <CourseCard
        stamp="MOD-01"
        title="Decode the banner"
        description="Read boot logs, identify handoff points, and mark unknowns."
        stats="8 lessons / 42m"
        progress={{ value: 5, total: 8 }}
        cta={{ label: "continue", href: "#continue" }}
      />
    </SiteShell>
  );
}
`;

const adminDashboardSource = tsx`
import { AdminShell, Button, Grid, StatPill } from "phosphor-ui";

export function Example() {
  return (
    <AdminShell
      title="// admin"
      nav={[
        { label: "Dashboard", href: "#dashboard", active: true, glyph: ">" },
        { label: "Queue", href: "#queue", glyph: "*" },
      ]}
      user={{ name: "operator", role: "editor" }}
      stats={[
        { label: "drafts", value: 12 },
        { label: "review", value: 3, tone: "warn" },
      ]}
      actions={<Button size="sm">New packet</Button>}
    >
      <Grid minItemWidth="12rem" gap="sm">
        <StatPill label="published" value="48" />
        <StatPill label="warnings" value="03" color="magenta" />
      </Grid>
    </AdminShell>
  );
}
`;

const adminEditorSource = tsx`
import { AdminShell, ContentEditor } from "phosphor-ui";

export function Example() {
  return (
    <AdminShell title="// editor" nav={[{ label: "Editor", href: "#editor", active: true }]}>
      <ContentEditor
        kindLabel="field note"
        status
        autoSlug={{ from: "title", to: "slug" }}
        initial={{ title: "Boot sequence notes", slug: "boot-sequence-notes", body: "Trace the first signal." }}
        fields={[
          { kind: "text", key: "title", label: "Title", prompt: "T" },
          { kind: "text", key: "slug", label: "Slug", prompt: "/" },
          { kind: "textarea", key: "body", label: "Body", rows: 5 },
          { kind: "tags", key: "tags", label: "Tags" },
        ]}
      />
    </AdminShell>
  );
}
`;

export const PersonalBlog: StoryObj = {
  parameters: { docs: { source: source(personalBlogSource) } },
  render: () => (
    <div style={pageFrame}>
      <SiteShell
        title="field notes"
        tagline="personal blog / signal archive"
        nav={[
          { label: "notes", href: "#notes" },
          { label: "projects", href: "#projects" },
        ]}
        crt={false}
      >
        <Stack>
          <H2 id="notes">Latest transmissions</H2>
          <Callout title="Now decoding" variant="info">
            Memory maps, terminal interfaces, and field research logs.
          </Callout>
          <ArticleList
            items={[
              { title: "Boot sequence notes", href: "#boot", meta: "05.10", description: "A compact map of startup rituals." },
              { title: "CRT layout diary", href: "#crt", meta: "05.04", description: "How the interface stays dense without becoming noisy." },
            ]}
          />
          <Tag>personal wiki</Tag>
        </Stack>
      </SiteShell>
    </div>
  ),
};

export const WikiPage: StoryObj = {
  parameters: { docs: { source: source(wikiPageSource) } },
  render: () => (
    <div style={pageFrame}>
      <SiteShell title="ops wiki" tagline="knowledge base" crt={false}>
        <Stack>
          <H2>Packet capture checklist</H2>
          <Text variant="lead">A reusable runbook for tracing a failing ingestion job.</Text>
          <ProgressBar value={4} total={7} label="Runbook coverage" />
          <ArticleList
            glyph="§"
            items={[
              { title: "Inputs", href: "#inputs", description: "Validate source, clock, and payload shape." },
              { title: "Transforms", href: "#transforms", description: "Compare normalized records against raw capture." },
              { title: "Publish", href: "#publish", description: "Confirm index and cache invalidation." },
            ]}
          />
        </Stack>
      </SiteShell>
    </div>
  ),
};

export const CourseLanding: StoryObj = {
  parameters: { docs: { source: source(courseLandingSource) } },
  render: () => (
    <div style={pageFrame}>
      <SiteShell title="cold boot academy" tagline="course terminal" crt={false}>
        <Stack>
          <HeroFrame
            art={"COURSE//01\nMEMORY MAPS"}
            subtitle="Cold boot operations"
          />
          <H2>Modules</H2>
          <CourseCard
            stamp="MOD-01"
            title="Decode the banner"
            description="Read boot logs, identify handoff points, and mark unknowns."
            stats="8 lessons / 42m"
            progress={{ value: 5, total: 8 }}
            cta={{ label: "continue", href: "#continue" }}
          />
        </Stack>
      </SiteShell>
    </div>
  ),
};

export const AdminDashboard: StoryObj = {
  parameters: { docs: { source: source(adminDashboardSource) } },
  render: () => (
    <div style={pageFrame}>
      <AdminShell
        title="// admin"
        nav={[
          { label: "Dashboard", href: "#dashboard", active: true, glyph: ">" },
          { label: "Queue", href: "#queue", glyph: "*" },
        ]}
        user={{ name: "operator", role: "editor" }}
        stats={[
          { label: "drafts", value: 12 },
          { label: "review", value: 3, tone: "warn" },
        ]}
        actions={<Button size="sm">New packet</Button>}
      >
        <Grid minItemWidth="12rem" gap="sm">
          <StatPill label="published" value="48" />
          <StatPill label="warnings" value="03" color="magenta" />
          <StatPill label="scheduled" value="07" color="dim" />
        </Grid>
      </AdminShell>
    </div>
  ),
};

export const AdminEditor: StoryObj = {
  parameters: { docs: { source: source(adminEditorSource) } },
  render: () => (
    <div style={pageFrame}>
      <AdminShell title="// editor" nav={[{ label: "Editor", href: "#editor", active: true }]}>
        <ContentEditor
          kindLabel="field note"
          status
          autoSlug={{ from: "title", to: "slug" }}
          initial={{ title: "Boot sequence notes", slug: "boot-sequence-notes", body: "Trace the first signal." }}
          fields={[
            { kind: "text", key: "title", label: "Title", prompt: "T" },
            { kind: "text", key: "slug", label: "Slug", prompt: "/" },
            { kind: "textarea", key: "body", label: "Body", rows: 5 },
            { kind: "tags", key: "tags", label: "Tags" },
          ]}
        />
      </AdminShell>
    </div>
  ),
};
