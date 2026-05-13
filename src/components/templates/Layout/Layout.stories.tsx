import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "../../atoms/Button";
import { CourseCard } from "../../organisms/CourseCard";
import { Tag } from "../../atoms/Tag";
import { Cluster, Column, Container, Flex, Grid, Row, Stack } from "./Layout";
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
    <Row align="center" justify="space-between" gap="md" mobileDirection="column" style={{ width: "min(620px, 92vw)" }}>
      <Tag>draft</Tag>
      <Row gap="xs" wrap="wrap">
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
import { Button, Cluster, Column, Container, CourseCard, Flex, Grid, Row, Stack, Tag } from "phosphor-ui";



export function Example() {
  return (
      <Grid
        minItemWidth="18rem"
        gap="lg"
        mobileColumns="1fr"
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
      </Grid>
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
      mobileDirection="column"
      style={{ width: "min(620px, 92vw)" }}
    >
      <Tag>draft</Tag>
      <Row gap="xs" wrap="wrap">
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
    <Grid
      minItemWidth="18rem"
      gap="lg"
      mobileColumns="1fr"
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
    </Grid>
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
