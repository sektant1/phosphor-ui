import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "../Button";
import { H2, H3 } from "../Headings";
import { HeroFrame } from "../HeroFrame";
import { PostBody } from "../MdxComponents";
import { PostHeader } from "../PostHeader";
import { StatPill } from "../StatPill";
import { TableOfContents } from "../TableOfContents";
import { Tag } from "../Tag";
import { PageLayout } from "./PageLayout";

const meta: Meta<typeof PageLayout> = {
  title: "Components/PageLayout",
  component: PageLayout,
};

export default meta;

type Story = StoryObj<typeof PageLayout>;

const PROJECT_ART = `
██████╗ ██████╗  ██████╗      ██╗
██╔══██╗██╔══██╗██╔═══██╗     ██║
██████╔╝██████╔╝██║   ██║     ██║
██╔═══╝ ██╔══██╗██║   ██║██   ██║
██║     ██║  ██║╚██████╔╝╚█████╔╝
╚═╝     ╚═╝  ╚═╝ ╚═════╝  ╚════╝
`;

export const Post: Story = {
  render: () => (
    <PageLayout
      variant="post"
      header={
        <PostHeader
          title="boot the terminal"
          date="2026-05-06"
          readTime="6m read"
          tags={["operations", "field"]}
        />
      }
      sidebar={
        <TableOfContents
          items={[
            { label: "Cold start", href: "#cold-start" },
            { label: "Wiring", href: "#wiring" },
          ]}
        />
      }
      footer={<Button href="#next">next transmission</Button>}
    >
      <PostBody>
        <h2 id="cold-start">Cold start</h2>
        <p>The terminal arrived in a sealed crate, tube-out and stenciled for field repair.</p>
        <h2 id="wiring">Wiring</h2>
        <p>Route heater leads through the strain relief before powering the unit.</p>
      </PostBody>
    </PageLayout>
  ),
};
Post.parameters = {
  docs: {
    source: {
      code: `<PageLayout
  variant="post"
  header={
    <PostHeader
      title="boot the terminal"
      date="2026-05-06"
      readTime="6m read"
      tags={["operations", "field"]}
    />
  }
  sidebar={
    <TableOfContents
      items={[
        { label: "Cold start", href: "#cold-start" },
        { label: "Wiring", href: "#wiring" },
      ]}
    />
  }
  footer={<Button href="#next">next transmission</Button>}
>
  <PostBody>
    <h2 id="cold-start">Cold start</h2>
    <p>The terminal arrived in a sealed crate, tube-out and stenciled for field repair.</p>
    <h2 id="wiring">Wiring</h2>
    <p>Route heater leads through the strain relief before powering the unit.</p>
  </PostBody>
</PageLayout>`,
    },
  },
};

export const Project: Story = {
  render: () => (
    <PageLayout
      variant="project"
      header={
        <PostHeader
          eyebrow="PROJECT // FIELD TOOL"
          title="Signal Cartographer"
          subtitle="A small console for mapping carrier drift, anomaly windows, and field notes into a single operator view."
          tags={["react", "mapping", "ops"]}
          actions={<Button href="https://example.com">open build</Button>}
        />
      }
      hero={
        <HeroFrame
          art={PROJECT_ART}
          topHud={
            <>
              <HeroFrame.HudLed variant="rec" />
              <HeroFrame.HudLabel>LIVE</HeroFrame.HudLabel>
              <HeroFrame.HudSpacer />
              <HeroFrame.HudBars value={6} />
            </>
          }
        />
      }
      sidebar={
        <>
          <H3>status</H3>
          <div style={{ display: "grid", gap: "var(--space-3)" }}>
            <StatPill label="phase" value="beta" />
            <StatPill label="stack" value="react" color="magenta" />
            <StatPill label="year" value="2026" color="dim" />
          </div>
        </>
      }
      footer={<Button href="#archive">view archive</Button>}
    >
      <H2>project notes</H2>
      <p className="t-body">
        The project layout keeps a wider reading plane and gives the sidebar
        enough space for status, links, credits, or deployment metadata.
      </p>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "var(--space-3)" }}>
        <Tag>prototype</Tag>
        <Tag color="magenta">featured</Tag>
      </div>
    </PageLayout>
  ),
};
Project.parameters = {
  docs: {
    source: {
      code: `<PageLayout
  variant="project"
  header={
    <PostHeader
      eyebrow="PROJECT // FIELD TOOL"
      title="Signal Cartographer"
      subtitle="A small console for mapping carrier drift, anomaly windows, and field notes into a single operator view."
      tags={["react", "mapping", "ops"]}
      actions={<Button href="https://example.com">open build</Button>}
    />
  }
  hero={
    <HeroFrame
      art={PROJECT_ART}
      topHud={
        <>
          <HeroFrame.HudLed variant="rec" />
          <HeroFrame.HudLabel>LIVE</HeroFrame.HudLabel>
          <HeroFrame.HudSpacer />
          <HeroFrame.HudBars value={6} />
        </>
      }
    />
  }
  sidebar={
    <>
      <H3>status</H3>
      <div style={{ display: "grid", gap: "var(--space-3)" }}>
        <StatPill label="phase" value="beta" />
        <StatPill label="stack" value="react" color="magenta" />
        <StatPill label="year" value="2026" color="dim" />
      </div>
    </>
  }
  footer={<Button href="#archive">view archive</Button>}
>
  <H2>project notes</H2>
  <p className="t-body">
    The project layout keeps a wider reading plane and gives the sidebar
    enough space for status, links, credits, or deployment metadata.
  </p>
  <div style={{ display: "flex", flexWrap: "wrap", gap: "var(--space-3)" }}>
    <Tag>prototype</Tag>
    <Tag color="magenta">featured</Tag>
  </div>
</PageLayout>`,
    },
  },
};
