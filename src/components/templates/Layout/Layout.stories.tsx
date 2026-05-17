import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "../../atoms/Button";
import { CourseCard } from "../../organisms/CourseCard";
import { Tag } from "../../atoms/Tag";
import {
  AutoGrid,
  ContentFrame,
  ContentShell,
  Cluster,
  Column,
  Container,
  DashboardGrid,
  Flex,
  Grid,
  Inline,
  PageShell,
  Panel,
  Row,
  Section,
  SidebarLayout,
  SplitLayout,
  Stack,
} from "./Layout";
import { source, tsx } from "../../../stories/source";

const meta: Meta = {
  title: "Templates/Layout",
  parameters: {
    layout: "centered",
  },
};

export default meta;

const defaultSource = tsx`
import { Button, Cluster, Column, Container, CourseCard, Flex, Grid, Row, Stack, Tag } from "phosphor-ui";

export function Example() {
  return (
      <Row align="center" justify="center" wrap="wrap" gap="sm">
        <Tag>react</Tag>
        <Tag>typescript</Tag>
        <Tag color="magenta">storybook</Tag>
        <Button size="sm">Engage</Button>
      </Row>
    );
}
`;

const flexColumnSource = tsx`
import { Button, Cluster, Column, Container, CourseCard, Flex, Grid, Row, Stack, Tag } from "phosphor-ui";

export function Example() {
  return (
      <Column
        align="stretch"
        gap="md"
        style={{ width: "min(420px, 90vw)" }}
      >
        <Button>Primary action</Button>
        <Button variant="ghost">Ghost action</Button>
        <Button variant="danger">Danger action</Button>
      </Column>
    );
}
`;

const rowSource = tsx`
import { Button, Row, Tag } from "phosphor-ui";

export function Example() {
  return (
    <Row align="center" justify="space-between" gap="md" stackOnMobile fullWidth style={{ maxWidth: "620px" }}>
      <Tag>draft</Tag>
      <Row gap="xs" wrap="wrap" fullWidth>
        <Button size="sm" variant="ghost">Preview</Button>
        <Button size="sm">Publish</Button>
      </Row>
    </Row>
  );
}
`;

const columnSource = tsx`
import { Button, Column, Tag } from "phosphor-ui";

export function Example() {
  return (
    <Column gap="sm" align="stretch" style={{ width: "min(360px, 90vw)" }}>
      <Tag>cms panel</Tag>
      <Button>Save draft</Button>
      <Button variant="ghost">Schedule</Button>
    </Column>
  );
}
`;

const clusteredActionsSource = tsx`
import { Button, Cluster, Column, Container, CourseCard, Flex, Grid, Row, Stack, Tag } from "phosphor-ui";

export function Example() {
  return (
      <Cluster gap="xs" justify="center" style={{ width: "min(520px, 90vw)" }}>
        <Tag>notes</Tag>
        <Tag>daily-log</Tag>
        <Tag color="magenta">published</Tag>
        <Button size="sm">Open</Button>
      </Cluster>
    );
}
`;

const boundedContainerSource = tsx`
import { Button, Cluster, Column, Container, CourseCard, Flex, Grid, Row, Stack, Tag } from "phosphor-ui";

export function Example() {
  return (
      <Container width="prose">
        <Stack gap="sm">
          <Tag>container</Tag>
          <p style={{ margin: 0 }}>
            A bounded layout shell for posts, indexes, project notes, and wiki pages.
          </p>
        </Stack>
      </Container>
    );
}
`;

const responsiveGridSource = tsx`
import { AutoGrid, CourseCard } from "phosphor-ui";



export function Example() {
  return (
      <AutoGrid
        minItemWidth="18rem"
        gap="lg"
        style={{ width: "min(980px, 92vw)" }}
      >
        <CourseCard
          stamp="COURSE-01"
          coverMeta="entry · 6 modules"
          tag="ENTRY"
          title="Cold-Boot Operations"
          description="Bring a dead terminal back online."
          stats="6 modules · 2h12m"
          progress={{ value: 4, total: 6 }}
          cta={{ label: "RESUME →", href: "#" }}
        />

        <CourseCard
          stamp="COURSE-02"
          coverMeta="field · 9 modules"
          tag="FIELD"
          title="Signal Decoding"
          description="From carrier to message. Static, gates, baudrates."
          stats="9 modules · 3h44m"
          progress={{ value: 1, total: 9 }}
          cta={{ label: "ENTER →", href: "#" }}
        />

        <CourseCard
          stamp="COURSE-03"
          coverMeta="restricted"
          tag="γ-3"
          title="Anomaly Triage"
          description="Reading the perimeter. Threat ladder, response gates."
          locked
          cta={{ label: "LOCKED", href: "#" }}
        />
      </AutoGrid>
    );
}
`;

const narrowGridSource = tsx`
import { Grid, Stack, Tag } from "phosphor-ui";

export function Example() {
  return (
    <Stack gap="sm" style={{ width: "min(18rem, 100%)" }}>
      <Tag>narrow parent</Tag>
      <Grid minItemWidth="20rem" gap="sm">
        <div style={{ border: "1px dashed var(--pho-color-primary-faint)", padding: "var(--pho-space-3)" }}>
          A custom grid min should collapse to the parent width instead of forcing horizontal scroll.
        </div>
        <div style={{ border: "1px dashed var(--pho-color-primary-faint)", padding: "var(--pho-space-3)" }}>
          The second item stacks cleanly below it.
        </div>
      </Grid>
    </Stack>
  );
}
`;

const pageShellSource = tsx`
import { ContentFrame, Inline, PageShell, Panel, SidebarLayout, Stack, Tag } from "phosphor-ui";

export function Example() {
  return (
    <PageShell
      eyebrow="wiki"
      title="Packet capture checklist"
      description="A reusable runbook with navigation and local context."
      actions={<Inline gap="xs"><Tag>ops</Tag><Tag>runbook</Tag></Inline>}
    >
      <SidebarLayout
        left={<Panel density="compact" title="Tree">notes / packets / capture</Panel>}
        sidebarLabel="content tree"
        right={<Panel density="compact" title="On this page">inputs / transforms / publish</Panel>}
        asideLabel="table of contents"
        collapseAt="lg"
        mobileLayout="main-first"
      >
        <ContentFrame framed padding="md">
          <Stack gap="sm">
            <h2>Validate source clock</h2>
            <p>Confirm payload shape, source identity, and publish timing before indexing.</p>
          </Stack>
        </ContentFrame>
      </SidebarLayout>
    </PageShell>
  );
}
`;

const sectionPanelSource = tsx`
import { DashboardGrid, Panel, Section } from "phosphor-ui";

export function Example() {
  return (
    <Section title="Dashboard" description="Reusable panels for admin and portfolio pages.">
      <DashboardGrid minItemWidth="14rem">
        <Panel title="Drafts" meta="12">Waiting for review.</Panel>
        <Panel title="Published" meta="48" tone="accent">Live entries.</Panel>
        <Panel title="Alerts" meta="03" tone="danger">Needs operator attention.</Panel>
      </DashboardGrid>
    </Section>
  );
}
`;

const splitPaneSource = tsx`
import { Panel, SplitLayout } from "phosphor-ui";

export function Example() {
  return (
    <SplitLayout
      startWidth="minmax(0, 1.15fr)"
      start={<Panel title="Editor">Markdown controls and form fields.</Panel>}
      end={<Panel title="Preview">Rendered post preview.</Panel>}
    />
  );
}
`;

const contentShellSource = tsx`
import { ContentShell, Stack, Tag } from "phosphor-ui";

export function Example() {
  return (
    <ContentShell
      eyebrow="article"
      title="Readable command log"
      description="A prose-width shell for posts, wiki notes, and docs pages."
    >
      <Stack gap="sm">
        <Tag>content</Tag>
        <p>Body content keeps a readable max-width without custom page CSS.</p>
      </Stack>
    </ContentShell>
  );
}
`;

type Story = StoryObj;

export const Default: Story = {
  parameters: { docs: { source: source(defaultSource) } },
  render: () => (
    <Row align="center" justify="center" wrap="wrap" gap="sm">
      <Tag>react</Tag>
      <Tag>typescript</Tag>
      <Tag color="magenta">storybook</Tag>
      <Button size="sm">Engage</Button>
    </Row>
  ),
};

export const FlexColumn: Story = {
  parameters: { docs: { source: source(flexColumnSource) } },
  render: () => (
    <Column
      align="stretch"
      gap="md"
      style={{ width: "min(420px, 90vw)" }}
    >
      <Button>Primary action</Button>
      <Button variant="ghost">Ghost action</Button>
      <Button variant="danger">Danger action</Button>
    </Column>
  ),
};

export const RowLayout: Story = {
  parameters: { docs: { source: source(rowSource) } },
  render: () => (
    <Row
      align="center"
      justify="space-between"
      gap="md"
      stackOnMobile
      fullWidth
      style={{ maxWidth: "620px" }}
    >
      <Tag>draft</Tag>
      <Row gap="xs" wrap="wrap" fullWidth>
        <Button size="sm" variant="ghost">Preview</Button>
        <Button size="sm">Publish</Button>
      </Row>
    </Row>
  ),
};

export const ColumnLayout: Story = {
  parameters: { docs: { source: source(columnSource) } },
  render: () => (
    <Column gap="sm" align="stretch" style={{ width: "min(360px, 90vw)" }}>
      <Tag>cms panel</Tag>
      <Button>Save draft</Button>
      <Button variant="ghost">Schedule</Button>
    </Column>
  ),
};

export const ClusteredActions: Story = {
  parameters: { docs: { source: source(clusteredActionsSource) } },
  render: () => (
    <Cluster gap="xs" justify="center" style={{ width: "min(520px, 90vw)" }}>
      <Tag>notes</Tag>
      <Tag>daily-log</Tag>
      <Tag color="magenta">published</Tag>
      <Button size="sm">Open</Button>
    </Cluster>
  ),
};

export const BoundedContainer: Story = {
  parameters: { docs: { source: source(boundedContainerSource) } },
  render: () => (
    <Container width="prose">
      <Stack gap="sm">
        <Tag>container</Tag>
        <p style={{ margin: 0 }}>
          A bounded layout shell for posts, indexes, project notes, and wiki pages.
        </p>
      </Stack>
    </Container>
  ),
};

export const ResponsiveGrid: Story = {
  parameters: { docs: { source: source(responsiveGridSource) } },
  render: () => (
    <AutoGrid
      minItemWidth="18rem"
      gap="lg"
      style={{ width: "min(980px, calc(100dvw - 2rem))" }}
    >
      <CourseCard
        stamp="COURSE-01"
        coverMeta="entry · 6 modules"
        tag="ENTRY"
        title="Cold-Boot Operations"
        description="Bring a dead terminal back online."
        stats="6 modules · 2h12m"
        progress={{ value: 4, total: 6 }}
        cta={{ label: "RESUME →", href: "#" }}
      />

      <CourseCard
        stamp="COURSE-02"
        coverMeta="field · 9 modules"
        tag="FIELD"
        title="Signal Decoding"
        description="From carrier to message. Static, gates, baudrates."
        stats="9 modules · 3h44m"
        progress={{ value: 1, total: 9 }}
        cta={{ label: "ENTER →", href: "#" }}
      />

      <CourseCard
        stamp="COURSE-03"
        coverMeta="restricted"
        tag="γ-3"
        title="Anomaly Triage"
        description="Reading the perimeter. Threat ladder, response gates."
        locked
        cta={{ label: "LOCKED", href: "#" }}
      />
    </AutoGrid>
  ),
};

export const NarrowNestedGrid: Story = {
  parameters: { docs: { source: source(narrowGridSource) } },
  render: () => (
    <Stack gap="sm" style={{ width: "min(18rem, 100%)" }}>
      <Tag>narrow parent</Tag>
      <Grid minItemWidth="20rem" gap="sm">
        <div
          style={{
            border: "1px dashed var(--pho-color-primary-faint)",
            padding: "var(--pho-space-3)",
          }}
        >
          A custom grid min should collapse to the parent width instead of forcing horizontal scroll.
        </div>
        <div
          style={{
            border: "1px dashed var(--pho-color-primary-faint)",
            padding: "var(--pho-space-3)",
          }}
        >
          The second item stacks cleanly below it.
        </div>
      </Grid>
    </Stack>
  ),
};

export const PageComposition: Story = {
  parameters: { docs: { source: source(pageShellSource) } },
  render: () => (
    <PageShell
      eyebrow="wiki"
      title="Packet capture checklist"
      description="A reusable runbook with navigation and local context."
      actions={(
        <Inline gap="xs">
          <Tag>ops</Tag>
          <Tag>runbook</Tag>
        </Inline>
      )}
      style={{ width: "min(980px, 92vw)" }}
    >
      <SidebarLayout
        left={<Panel density="compact" title="Tree">notes / packets / capture</Panel>}
        sidebarLabel="content tree"
        right={<Panel density="compact" title="On this page">inputs / transforms / publish</Panel>}
        asideLabel="table of contents"
        collapseAt="lg"
        mobileLayout="main-first"
      >
        <ContentFrame framed padding="md">
          <Stack gap="sm">
            <h2>Validate source clock</h2>
            <p>Confirm payload shape, source identity, and publish timing before indexing.</p>
          </Stack>
        </ContentFrame>
      </SidebarLayout>
    </PageShell>
  ),
};

export const SectionPanels: Story = {
  parameters: { docs: { source: source(sectionPanelSource) } },
  render: () => (
    <Section
      title="Dashboard"
      description="Reusable panels for admin and portfolio pages."
      style={{ width: "min(860px, 92vw)" }}
    >
      <DashboardGrid minItemWidth="14rem">
        <Panel title="Drafts" meta="12">Waiting for review.</Panel>
        <Panel title="Published" meta="48" tone="accent">Live entries.</Panel>
        <Panel title="Alerts" meta="03" tone="danger">Needs operator attention.</Panel>
      </DashboardGrid>
    </Section>
  ),
};

export const EditorSplitPane: Story = {
  parameters: { docs: { source: source(splitPaneSource) } },
  render: () => (
    <SplitLayout
      startWidth="minmax(0, 1.15fr)"
      style={{ width: "min(760px, 92vw)" }}
      start={<Panel title="Editor">Markdown controls and form fields.</Panel>}
      end={<Panel title="Preview">Rendered post preview.</Panel>}
    />
  ),
};

export const ArticleContentShell: Story = {
  parameters: { docs: { source: source(contentShellSource) } },
  render: () => (
    <ContentShell
      eyebrow="article"
      title="Readable command log"
      description="A prose-width shell for posts, wiki notes, and docs pages."
      style={{ width: "min(680px, 92vw)" }}
    >
      <Stack gap="sm">
        <Tag>content</Tag>
        <p>Body content keeps a readable max-width without custom page CSS.</p>
      </Stack>
    </ContentShell>
  ),
};
