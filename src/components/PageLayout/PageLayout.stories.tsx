import type { Meta, StoryObj } from "@storybook/react";
import { Callout } from "../Callout";
import { PostBody } from "../MdxComponents";
import { TableOfContents } from "../TableOfContents";
import { Tag } from "../Tag";
import { H1 } from "../Headings";
import { Flex } from "../Layout";
import { PageLayout } from "./PageLayout";

const meta: Meta<typeof PageLayout> = {
  title: "Components/PageLayout",
  component: PageLayout,
  parameters: {
    layout: "centered",
  },
};

export default meta;

type Story = StoryObj<typeof PageLayout>;

const tocItems = [
  { label: "Cold start", href: "#cold-start", glyph: "▸" },
  { label: "Signal lock", href: "#signal-lock", glyph: "▸" },
  { label: "EOF", href: "#eof", glyph: "▸" },
];

export const PostPage: Story = {
  render: () => (
    <PageLayout
      variant="post"
      header={
        <Flex direction="column" align="flex-start" gap="sm">
          <Flex gap="xs" wrap="wrap">
            <Tag>operations</Tag>
            <Tag color="magenta">field</Tag>
          </Flex>

          <H1 glyph="▌" style={{ margin: 0 }}>
            boot the terminal
          </H1>

          <p
            className="t-stamp"
            style={{ color: "var(--phosphor-dim)", margin: 0 }}
          >
            2026-05-06 · 6m read · log#0042
          </p>
        </Flex>
      }
      sidebar={<TableOfContents heading="ON THIS PAGE" items={tocItems} />}
      footer={<Callout title="EOF">Transmission archived.</Callout>}
    >
      <PostBody
        frontmatter={{
          title: "boot the terminal",
          date: "2026-05-06",
          readTime: "6m",
          log: "0042",
          tags: ["operations", "field"],
        }}
      >
        <h2 id="cold-start">Cold start</h2>
        <p>
          The terminal arrived in a sealed crate, tube-out and stenciled γ-2 /
          SECTOR-7.
        </p>

        <Callout variant="info" title="Pre-flight">
          Check ground continuity before plugging anything in.
        </Callout>

        <h2 id="signal-lock">Signal lock</h2>
        <p>
          Sweep the carrier band slowly. The signal usually appears between the
          wallpaper hum and the broadcast skirt.
        </p>

        <h2 id="eof">EOF</h2>
        <p>Log the channel, time, and anomalies in the field book.</p>
      </PostBody>
    </PageLayout>
  ),
};

export const ProjectPage: Story = {
  render: () => (
    <PageLayout
      variant="project"
      header={
        <Flex direction="column" align="flex-start" gap="sm">
          <Flex gap="xs" wrap="wrap">
            <Tag color="phosphor">project</Tag>
            <Tag>private</Tag>
            <Tag color="magenta">wip</Tag>
          </Flex>

          <H1 glyph="▣" style={{ margin: 0 }}>
            sektant&apos;s hideout
          </H1>

          <p
            className="t-body"
            style={{ color: "var(--phosphor-dim)", margin: 0 }}
          >
            Personal blog, portfolio, notes, and project transmissions.
          </p>
        </Flex>
      }
      sidebar={
        <Callout title="STATUS">
          Build the blog shell first. Admin and auth can stay local-only for
          now.
        </Callout>
      }
    >
      <PostBody>
        <h2>README</h2>
        <p>
          A phosphor-themed personal site using the component library as the
          visual system.
        </p>

        <h2>Scope</h2>
        <p>
          Posts, projects, short portfolio cards, media thumbnails, and
          handwritten README-style pages.
        </p>
      </PostBody>
    </PageLayout>
  ),
};
