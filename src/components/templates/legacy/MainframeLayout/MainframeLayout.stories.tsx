import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { Button } from "../../../atoms/Button";
import { ProgressBar } from "../../../atoms/ProgressBar";
import { Tag } from "../../../atoms/Tag";
import { Callout } from "../../../molecules/Callout";
import { TableOfContents } from "../../../molecules/TableOfContents";
import { ModuleAccordion } from "../../../organisms/ModuleAccordion";
import { PostListing } from "../../../organisms/PostListing";
import { PostHeader } from "../../../organisms/PostHeader";
import { PostBody } from "../../../content/MdxComponents";
import { Post } from "../../PostTemplate";
import {
  AdminLayout,
  ContextPanel,
  CourseLayout,
  MainframeLayout,
  NerdTreeSidebar,
  WikiLayout,
} from "./MainframeLayout";
import { source, tsx } from "../../../../stories/source";

const meta: Meta<typeof MainframeLayout> = {
  title: "Legacy/MainframeLayout",
  component: MainframeLayout,
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;

const tree = [
  {
    kind: "dir" as const,
    label: "content",
    defaultOpen: true,
    children: [
      { kind: "leaf" as const, label: "boot-the-terminal.mdx", href: "#", active: true },
      { kind: "leaf" as const, label: "signal-decoding.mdx", href: "#" },
      { kind: "leaf" as const, label: "anomaly-triage.mdx", href: "#" },
    ],
  },
  {
    kind: "dir" as const,
    label: "wiki",
    defaultOpen: true,
    children: [
      { kind: "leaf" as const, label: "radio-stack", href: "#" },
      { kind: "leaf" as const, label: "field-kit", href: "#" },
    ],
  },
];

const tocItems = [
  { label: "Cold start", href: "#cold-start", glyph: "▸", active: true },
  { label: "Wiring the cathode", href: "#wiring", glyph: "▸" },
  { label: "Listening pass", href: "#listening", glyph: "▸" },
  { label: "EOF", href: "#eof", glyph: "▸" },
];

const SideTree = () => (
  <NerdTreeSidebar
    tree={tree}
    title="~/field-notes"
    bufferLabel="[mainframe/]"
    command=":Mainframe"
    footerMeta="4 buffers"
  />
);

const ProjectPanel = () => (
  <ContextPanel title="project telemetry" meta="rev 04">
    <div style={{ display: "grid", gap: "0.65rem" }}>
      <Tag color="phosphor">react</Tag>
      <Tag>mdx</Tag>
      <Tag color="dim">storybook</Tag>
      <p style={{ margin: 0 }}>links: repo / changelog / deploy log</p>
    </div>
  </ContextPanel>
);

const MainframeArticle = ({
  title,
  eyebrow,
  children,
}: {
  title: React.ReactNode;
  eyebrow: React.ReactNode;
  children: React.ReactNode;
}) => (
  <>
    <PostHeader title={title} eyebrow={eyebrow} />
    <PostBody>{children}</PostBody>
  </>
);

type Story = StoryObj<typeof MainframeLayout>;

const blogPostSource = tsx`
import { NerdTreeSidebar, Post, TableOfContents } from "phosphor-ui";

export function Example() {
  return (
    <Post
      title="boot the terminal"
      leftPanel={<NerdTreeSidebar tree={tree} />}
      rightPanel={<TableOfContents heading="ON THIS PAGE" items={tocItems} />}
    >
      <p>Readable post body.</p>
    </Post>
  );
}
`;

export const BlogPostWithToc: Story = {
  parameters: { docs: { source: source(blogPostSource) } },
  render: () => (
    <div style={{ padding: "var(--pho-layout-gutter)" }}>
      <Post
        title="boot the terminal"
        leftPanel={<SideTree />}
        rightPanel={<TableOfContents heading="ON THIS PAGE" items={tocItems} />}
        headerProps={{
          tags: ["operations", "field"],
          date: "2026-05-06",
          readTime: "6m read",
        }}
      >
        <p>
          The mainframe layout keeps the explorer rail, article body, and context rail in a
          stable grid. The prose column keeps a comfortable measure while the rails collapse
          before the body becomes cramped.
        </p>
        <h2 id="cold-start">Cold start</h2>
        <p>
          Start with the quietest surface: one active file, one reading path, and only the
          operational metadata needed for the current page.
        </p>
        <Callout title="layout rule" variant="info">
          Code blocks and tables are constrained by the content column and scroll horizontally
          instead of forcing the page wider.
        </Callout>
        <pre><code>{`const channel = "mainframe";\nconsole.log(channel);`}</code></pre>
      </Post>
    </div>
  ),
};

const wikiPageSource = tsx`
import { ContextPanel, NerdTreeSidebar, PostBody, PostHeader, PostListing, WikiLayout } from "phosphor-ui";

export function Example() {
  return (
    <WikiLayout
      leftPanel={<NerdTreeSidebar tree={tree} />}
      rightPanel={<ContextPanel title="linked notes"><PostListing posts={posts} /></ContextPanel>}
    >
      <PostHeader title="Signal map" eyebrow="wiki / index" />
      <PostBody>Wiki body</PostBody>
    </WikiLayout>
  );
}
`;

export const WikiPageRelatedNotes: Story = {
  parameters: { docs: { source: source(wikiPageSource) } },
  render: () => (
    <div style={{ padding: "var(--pho-layout-gutter)" }}>
      <WikiLayout
        leftPanel={<SideTree />}
        rightPanel={
          <ContextPanel title="linked notes" meta="backlinks 03">
            <PostListing
              posts={[
                { title: "Radio stack", href: "#radio", date: "05.01", meta: "wiki" },
                { title: "Field kit", href: "#kit", date: "04.22", meta: "note" },
                { title: "Power rails", href: "#power", date: "04.12", meta: "ref" },
              ]}
            />
          </ContextPanel>
        }
      >
        <MainframeArticle title="Signal map" eyebrow="wiki / index">
          <p>
            Wiki pages use the same shell, but the right rail can mix contents, backlinks,
            and related notes instead of only a table of contents.
          </p>
          <h2>Current map</h2>
          <p>Every page keeps enough room for dense notes without losing the terminal frame.</p>
        </MainframeArticle>
      </WikiLayout>
    </div>
  ),
};

const coursePageSource = tsx`
import { ContextPanel, CourseLayout, ModuleAccordion, NerdTreeSidebar, PostBody, PostHeader, ProgressBar } from "phosphor-ui";

export function Example() {
  return (
    <CourseLayout
      leftPanel={<NerdTreeSidebar tree={tree} />}
      rightPanel={<ContextPanel title="course modules"><ProgressBar value={4} total={6} /><ModuleAccordion num="01" title="Cold boot" /></ContextPanel>}
    >
      <PostHeader title="Cold-Boot Operations" eyebrow="course / lesson" />
      <PostBody>Lesson body</PostBody>
    </CourseLayout>
  );
}
`;

export const CoursePageModules: Story = {
  parameters: { docs: { source: source(coursePageSource) } },
  render: () => (
    <div style={{ padding: "var(--pho-layout-gutter)" }}>
      <CourseLayout
        leftPanel={<SideTree />}
        rightPanel={
          <ContextPanel title="course modules" meta="4 / 6 complete">
            <ProgressBar value={4} total={6} label="progress" />
            <ModuleAccordion
              num="01"
              title="Cold boot"
              progress={{ value: 4, total: 6 }}
              lessons={[
                { num: "01", title: "Power rails", length: "08m", state: "done" },
                { num: "02", title: "Cathode wake", length: "12m" },
              ]}
            />
          </ContextPanel>
        }
      >
        <MainframeArticle title="Cold-Boot Operations" eyebrow="course / lesson">
          <p>
            Course pages reserve the right rail for modules, lessons, and progress while the
            center column remains wide enough for exercises and embedded media.
          </p>
        </MainframeArticle>
      </CourseLayout>
    </div>
  ),
};

const adminActionSource = tsx`
import { AdminLayout, Button, ContextPanel, NerdTreeSidebar, PostBody, PostHeader } from "phosphor-ui";

export function Example() {
  return (
    <AdminLayout
      leftPanel={<NerdTreeSidebar tree={tree} />}
      rightPanel={<ContextPanel title="publish controls"><Button>save draft</Button></ContextPanel>}
    >
      <PostHeader title="Edit transmission" eyebrow="admin / cms" />
      <PostBody>Editor surface</PostBody>
    </AdminLayout>
  );
}
`;

export const AdminActionPanel: Story = {
  parameters: { docs: { source: source(adminActionSource) } },
  render: () => (
    <div style={{ padding: "var(--pho-layout-gutter)" }}>
      <AdminLayout
        leftPanel={<SideTree />}
        rightPanel={
          <ContextPanel title="publish controls" meta="draft">
            <Button size="sm">save draft</Button>
            <Button size="sm" variant="accent">publish</Button>
            <Button size="sm" variant="ghost">preview</Button>
          </ContextPanel>
        }
      >
        <MainframeArticle title="Edit transmission" eyebrow="admin / cms">
          <p>
            Admin pages use the same three-zone mainframe with status and action controls on
            the right. At tablet width the controls move below the editor surface.
          </p>
        </MainframeArticle>
      </AdminLayout>
    </div>
  ),
};

const mobileReadableSource = tsx`
import { NerdTreeSidebar, Post, TableOfContents } from "phosphor-ui";

export function Example() {
  return (
    <Post
      title="narrow viewport"
      leftPanel={<NerdTreeSidebar tree={tree} />}
      rightPanel={<TableOfContents heading="ON THIS PAGE" items={tocItems} />}
    >
      <p>Mobile keeps the full readable content width.</p>
    </Post>
  );
}
`;

export const MobileReadable: Story = {
  parameters: {
    docs: { source: source(mobileReadableSource) },
    viewport: {
      defaultViewport: "mobile1",
    },
  },
  render: () => (
    <div style={{ padding: "0.85rem" }}>
      <Post
        title="narrow viewport"
        leftPanel={<SideTree />}
        rightPanel={<TableOfContents heading="ON THIS PAGE" items={tocItems} />}
      >
        <p>
          On small screens the explorer becomes the NerdTree drawer, the context panel moves
          below the story, and this text keeps the full available width.
        </p>
      </Post>
    </div>
  ),
};

const projectMetadataSource = tsx`
import { ContextPanel, MainframeLayout, NerdTreeSidebar, PostBody, PostHeader, Tag } from "phosphor-ui";

export function Example() {
  return (
    <MainframeLayout
      variant="project"
      leftPanel={<NerdTreeSidebar tree={tree} />}
      rightPanel={<ContextPanel title="project telemetry"><Tag>react</Tag></ContextPanel>}
    >
      <PostHeader title="Phosphor UI" eyebrow="project / library" />
      <PostBody>Project body</PostBody>
    </MainframeLayout>
  );
}
`;

export const ProjectMetadata: Story = {
  parameters: { docs: { source: source(projectMetadataSource) } },
  render: () => (
    <div style={{ padding: "var(--pho-layout-gutter)" }}>
      <MainframeLayout
        variant="project"
        leftPanel={<SideTree />}
        rightPanel={<ProjectPanel />}
      >
        <MainframeArticle title="Phosphor UI" eyebrow="project / library">
          <p>
            Project pages can turn the context rail into metadata, stack, external links, and
            a compact changelog without changing the left navigation or reading rules.
          </p>
        </MainframeArticle>
      </MainframeLayout>
    </div>
  ),
};
