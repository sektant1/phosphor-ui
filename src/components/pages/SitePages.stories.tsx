import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { H2 } from "../atoms/Headings";
import { Hr } from "../atoms/Hr";
import { Input } from "../atoms/Input";
import { ProgressBar } from "../atoms/ProgressBar";
import { ReadingRail } from "../atoms/ReadingRail";
import { Tag } from "../atoms/Tag";
import { Cluster, Column, Grid } from "../templates/Layout";
import { Callout } from "../molecules/Callout";
import { CourseCard } from "../organisms/CourseCard";
import { NerdTree } from "../organisms/NerdTree";
import type { NerdTreeNode } from "../organisms/NerdTree";
import Pagination from "../molecules/Pagination";
import { Stepper, StepperFoot } from "../molecules/Stepper";
import { TableOfContents } from "../molecules/TableOfContents";
import { AsciiBanner } from "../organisms/AsciiBanner";
import { HeroFrame } from "../organisms/HeroFrame";
import { PostListing, PostRow } from "../organisms/PostListing";
import { Post } from "../templates/PostTemplate";
import { SiteShell } from "../templates/SiteShell";
import { useReadingProgress } from "../../hooks";
import type { CssVars } from "../../utils/browser";
import { source, tsx } from "../../stories/source";

const meta: Meta = {
  title: "Pages/Examples/Site Pages",
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;

const siteNav = [
  { label: "home", href: "#/" },
  { label: "posts", href: "#/posts" },
  { label: "courses", href: "#/courses" },
  { label: "archive", href: "#/archive" },
  { label: "contact", href: "#/contact" },
];

const buildSiteTree = (active?: string): NerdTreeNode[] => [
  {
    kind: "dir",
    label: "zone-net/",
    defaultOpen: true,
    children: [
      { kind: "leaf", label: "index.md", href: "#/", active: active === "home" },
      {
        kind: "dir",
        label: "posts/",
        defaultOpen: active === "posts",
        children: [
          {
            kind: "leaf",
            label: "boot-the-terminal.md",
            href: "#/posts/boot-the-terminal",
            active: active === "posts",
          },
          { kind: "leaf", label: "decode-the-signal.md", href: "#/posts/decode-the-signal" },
          { kind: "leaf", label: "phosphor-protocol-intro.md", href: "#/posts/phosphor-protocol-intro" },
        ],
      },
      {
        kind: "dir",
        label: "courses/",
        defaultOpen: active === "courses",
        children: [
          { kind: "leaf", label: "cold-boot.md", href: "#/courses/cold-boot" },
          { kind: "leaf", label: "signal-decoding.md", href: "#/courses/signal-decoding" },
        ],
      },
    ],
  },
];

const SitePageFrame = ({
  active,
  routeKey,
  children,
}: {
  active: string;
  routeKey?: string;
  children: React.ReactNode;
}) => (
  <SiteShell
    title="phosphor ui"
    homeHref="#/"
    tagline="// СЕКРЕТНО // single-channel transmissions"
    nav={siteNav.map((item) => ({ ...item, active: item.label === active }))}
    locales={[
      { code: "en", label: "EN", href: "#/?lang=en", active: true },
      { code: "ru", label: "RU", href: "#/?lang=ru" },
    ]}
    footerLinks={[
      { label: "rss", href: "#/rss" },
      { label: "log", href: "#/log" },
      { label: "contact", href: "#/contact" },
      { label: "github", href: "https://github.com" },
    ]}
    footerProps={{
      year: 2026,
      status: { label: "link", value: "STABLE" },
      prompt: "~/phosphor-ui $",
      command: "logout",
    }}
  >
    <Grid
      columns="minmax(220px, 260px) minmax(0, 1fr)"
      mobileColumns="1fr"
      gap="lg"
      align="start"
      style={{ marginTop: "var(--pho-space-6)" }}
    >
      <NerdTree
        title="~/zone-net"
        bufferLabel="[content/]"
        hint="γ-2 // single-channel"
        command=":NERDTree"
        footerMeta="42 files · 7 dirs"
        tree={buildSiteTree(active)}
      />
      <Column
        key={routeKey ?? active}
        as="div"
        gap="lg"
        className="pho-page-enter"
        style={{ minWidth: 0, paddingBottom: "3rem" }}
      >
        {children}
      </Column>
    </Grid>
  </SiteShell>
);

const homeSource = tsx`
import React from "react";
import { AsciiBanner, Cluster, Column, CourseCard, Grid, H2, HeroFrame, Hr, NerdTree, PostListing, PostRow, SiteShell, Tag } from "phosphor-ui";

type CssVars = React.CSSProperties & Record<\`--\${string}\`, string | number>;

const siteNav = [
  { label: "home", href: "#/" },
  { label: "posts", href: "#/posts" },
  { label: "courses", href: "#/courses" },
];

const siteTree = [
  {
    kind: "dir" as const,
    label: "zone-net/",
    defaultOpen: true,
    children: [
      { kind: "leaf" as const, label: "index.md", href: "#/", active: true },
      { kind: "leaf" as const, label: "boot-the-terminal.md", href: "#/posts/boot-the-terminal" },
      { kind: "leaf" as const, label: "cold-boot.md", href: "#/courses/cold-boot" },
    ],
  },
];

function PageFrame({ children }: { children: React.ReactNode }) {
  return (
    <SiteShell title="phosphor ui" tagline="// single-channel transmissions" nav={siteNav}>
      <Grid columns="minmax(220px, 260px) minmax(0, 1fr)" mobileColumns="1fr" gap="lg" align="start">
        <NerdTree tree={siteTree} title="~/zone-net" />
        <Column gap="lg" style={{ minWidth: 0 }}>{children}</Column>
      </Grid>
    </SiteShell>
  );
}

export function Example() {
  return (
      <PageFrame>
        <div className="pho-flicker-in">
          <HeroFrame
            text="ZONE-NET"
            subtitle="// СЕКРЕТНО // single-channel transmissions"
          />
        </div>

        <Column
          as="section"
          gap="md"
          className="pho-fade-up"
          style={{ "--i": 1, marginTop: "var(--pho-space-7)" } as CssVars}
        >
          <H2>latest transmissions</H2>
          <p className="t-body" style={{ color: "var(--pho-color-primary-muted)", margin: 0 }}>
            Field reports from the perimeter. Most recent first.
          </p>
          <PostListing>
            <PostRow
              date="2026-05-06"
              title="boot the terminal"
              meta="6m"
              href="#/posts/boot-the-terminal"
              thumbSrc="https://picsum.photos/seed/zone-boot/320/200"
              thumbAlt="boot screen"
              index={0}
            />
            <PostRow
              date="2026-05-04"
              title="decode the signal"
              meta="12m"
              href="#/posts/decode-the-signal"
              thumbSrc="https://picsum.photos/seed/zone-signal/320/200"
              thumbAlt="oscilloscope"
              index={1}
            />
            <PostRow
              date="2026-05-01"
              title="phosphor protocol intro"
              meta="9m"
              href="#/posts/phosphor-protocol-intro"
              index={2}
              glyph="◈"
            />
          </PostListing>
          <Hr />
          <Cluster gap="sm">
            <Tag>operations</Tag>
            <Tag>signals</Tag>
            <Tag color="magenta">anomaly</Tag>
            <Tag count={42}>archive</Tag>
            <Tag count={7} color="magenta">
              live
            </Tag>
          </Cluster>
        </Column>

        <Hr />

        <Column
          as="section"
          gap="md"
          className="pho-fade-up"
          style={{ "--i": 2, marginTop: "var(--pho-space-7)" } as CssVars}
        >
          <H2 glyph="▸">courses on rotation</H2>
          <Grid minItemWidth="20rem" mobileColumns="1fr" className="pho-stagger">
            <CourseCard
              stamp="COURSE-01"
              coverMeta="entry · 6 modules"
              tag="ENTRY"
              title="Cold-Boot Operations"
              description="Bring a dead terminal back online. Wire, light, listen."
              stats="6 modules · 2h12m"
              progress={{ value: 4, total: 6 }}
              cta={{ label: "RESUME →", href: "#/courses/cold-boot" }}
            />
            <CourseCard
              stamp="COURSE-02"
              coverMeta="field · 9 modules"
              tag="FIELD"
              title="Signal Decoding"
              description="From carrier to message. Static, gates, baudrates."
              stats="9 modules · 3h44m"
              progress={{ value: 1, total: 9 }}
              cta={{ label: "ENTER →", href: "#/courses/signal-decoding" }}
            />
            <CourseCard
              stamp="COURSE-03"
              coverMeta="restricted"
              tag="γ-3"
              title="Anomaly Triage"
              description="Reading the perimeter. Threat ladder, response gates."
              locked
              cta={{ label: "LOCKED", href: "#/courses/anomaly-triage" }}
            />
          </Grid>
        </Column>

        <Hr />

        <Column
          as="section"
          gap="md"
          className="pho-fade-up pho-stagger"
          style={{ "--i": 3, marginTop: "var(--pho-space-7)" } as CssVars}
        >
          <AsciiBanner text="ZONE-NET" fallback="ZONE-NET" />
        </Column>
      </PageFrame>
    );
}
`;

const postPageSource = tsx`
import React from "react";
import { Callout, Column, Grid, Hr, Input, NerdTree, Pagination, Post, ProgressBar, ReadingRail, SiteShell, Stepper, StepperFoot, TableOfContents, useReadingProgress } from "phosphor-ui";

const siteNav = [
  { label: "home", href: "#/" },
  { label: "posts", href: "#/posts", active: true },
  { label: "courses", href: "#/courses" },
];

const siteTree = [
  {
    kind: "dir" as const,
    label: "zone-net/",
    defaultOpen: true,
    children: [
      { kind: "leaf" as const, label: "index.md", href: "#/" },
      { kind: "leaf" as const, label: "boot-the-terminal.md", href: "#/posts/boot-the-terminal", active: true },
      { kind: "leaf" as const, label: "cold-boot.md", href: "#/courses/cold-boot" },
    ],
  },
];

function PageFrame({ children }: { children: React.ReactNode }) {
  return (
    <SiteShell title="phosphor ui" tagline="// single-channel transmissions" nav={siteNav}>
      <Grid columns="minmax(220px, 260px) minmax(0, 1fr)" mobileColumns="1fr" gap="lg" align="start">
        <NerdTree tree={siteTree} title="~/zone-net" />
        <Column gap="lg" style={{ minWidth: 0 }}>{children}</Column>
      </Grid>
    </SiteShell>
  );
}

const TOC_ITEMS = [
  { label: "Cold start", href: "#cold-start", glyph: "▸" },
  { label: "Wiring the cathode", href: "#wiring", glyph: "▸" },
  {
    label: "Listening",
    href: "#listening",
    glyph: "▸",
    children: [
      { label: "Carrier sweep", href: "#carrier", glyph: "·" },
      { label: "Phase lock", href: "#phase", glyph: "·" },
    ],
  },
  { label: "EOF", href: "#eof", glyph: "▸" },
];

export function Example() {
  const { ref, pct } = useReadingProgress<HTMLElement>();

      return (
        <PageFrame>
          <ReadingRail value={pct} />
          <Stepper
            items={[
              { label: "home", href: "#/" },
              { label: "posts", href: "#/posts" },
              { label: "boot the terminal", current: true },
            ]}
          />

          <Post
            ref={ref}
            title="boot the terminal"
            className="pho-fade-up"
            headerProps={{
              tags: ["operations", "field"],
              date: "2026-05-06",
              readTime: "6m read",
              meta: { wordCount: 42 },
            }}
            betweenHeaderAndBody={
              <ProgressBar
                value={Math.round(pct * 100)}
                total={100}
                label="reading"
                segments={24}
                showPercent
                current
              />
            }
            frontmatter={{
              title: "boot the terminal",
              date: "2026-05-06",
              readTime: "6m",
              log: "0042",
              tags: ["operations", "field"],
              draft: false,
            }}
            sidebar={<TableOfContents heading="ON THIS PAGE" items={TOC_ITEMS} />}
            afterContent={
              <>
                <Hr />
                <div className="pho-flicker-in">
                  <Input variant="terminal" prompt="~/zone-net/posts/0042 $" command="cat next.txt" />
                </div>
                <StepperFoot
                  prev={{
                    href: "#/posts/decode-the-signal",
                    kind: "PREV",
                    name: "decode the signal",
                  }}
                  next={{
                    href: "#/posts/phosphor-protocol-intro",
                    kind: "NEXT",
                    name: "phosphor protocol intro",
                  }}
                />
                <Column as="section">
                  <Pagination defaultPage={2} totalPages={6} />
                </Column>
              </>
            }
          >
            <h2 id="cold-start">Cold start</h2>
            <p>
              The terminal arrived in a sealed crate, tube-out and stenciled
              <strong> γ-2 / SECTOR-7</strong>. First task: confirm the cathode is
              intact and the line voltage matches the local rail.
            </p>
            <Callout variant="info" title="Pre-flight">
              Check ground continuity before plugging anything in. A floating
              chassis on these old units bites back hard.
            </Callout>
            <h2 id="wiring">Wiring the cathode</h2>
            <p>
              Pop the back panel, lift the deflection yoke, and route the heater
              leads through the strain relief.
            </p>
            <pre>
              <code>{\`# discharge the flyback
  > short the anode cap to chassis with insulated lead
  > wait 30s
  > repeat\`}</code>
            </pre>
            <h2 id="listening">Listening</h2>
            <p>
              Once the tube warms up, sweep the carrier band slowly. The signal you
              want is between the wallpaper hum and the broadcast skirt.
            </p>
            <h3 id="carrier">Carrier sweep</h3>
            <p>
              Start at 0x40 and walk up by 0x02. If the meter lifts and stays
              lifted, you're on the carrier.
            </p>
            <h3 id="phase">Phase lock</h3>
            <p>
              Phase lock is binary: either the trace stands up, or it doesn't.
            </p>
            <h2 id="eof">EOF</h2>
            <p>
              Log the channel, the time, and any anomalies in the field book. Next
              transmission window opens at 22:00 local.
            </p>
          </Post>
        </PageFrame>
      );
}
`;

type Story = StoryObj;

const TOC_ITEMS = [
  { label: "Cold start", href: "#cold-start", glyph: "▸" },
  { label: "Wiring the cathode", href: "#wiring", glyph: "▸" },
  {
    label: "Listening",
    href: "#listening",
    glyph: "▸",
    children: [
      { label: "Carrier sweep", href: "#carrier", glyph: "·" },
      { label: "Phase lock", href: "#phase", glyph: "·" },
    ],
  },
  { label: "EOF", href: "#eof", glyph: "▸" },
];

export const Home: Story = {
  parameters: { docs: { source: source(homeSource) } },
  render: () => (
    <SitePageFrame active="home" routeKey="home">
      <div className="pho-flicker-in">
        <HeroFrame
          text="ZONE-NET"
          subtitle="// СЕКРЕТНО // single-channel transmissions"
        />
      </div>

      <Column
        as="section"
        gap="md"
        className="pho-fade-up"
        style={{ "--i": 1, marginTop: "var(--pho-space-7)" } as CssVars}
      >
        <H2>latest transmissions</H2>
        <p className="t-body" style={{ color: "var(--pho-color-primary-muted)", margin: 0 }}>
          Field reports from the perimeter. Most recent first.
        </p>
        <PostListing>
          <PostRow
            date="2026-05-06"
            title="boot the terminal"
            meta="6m"
            href="#/posts/boot-the-terminal"
            thumbSrc="https://picsum.photos/seed/zone-boot/320/200"
            thumbAlt="boot screen"
            index={0}
          />
          <PostRow
            date="2026-05-04"
            title="decode the signal"
            meta="12m"
            href="#/posts/decode-the-signal"
            thumbSrc="https://picsum.photos/seed/zone-signal/320/200"
            thumbAlt="oscilloscope"
            index={1}
          />
          <PostRow
            date="2026-05-01"
            title="phosphor protocol intro"
            meta="9m"
            href="#/posts/phosphor-protocol-intro"
            index={2}
            glyph="◈"
          />
        </PostListing>
        <Hr />
        <Cluster gap="sm">
          <Tag>operations</Tag>
          <Tag>signals</Tag>
          <Tag color="magenta">anomaly</Tag>
          <Tag count={42}>archive</Tag>
          <Tag count={7} color="magenta">
            live
          </Tag>
        </Cluster>
      </Column>

      <Hr />

      <Column
        as="section"
        gap="md"
        className="pho-fade-up"
        style={{ "--i": 2, marginTop: "var(--pho-space-7)" } as CssVars}
      >
        <H2 glyph="▸">courses on rotation</H2>
        <Grid minItemWidth="20rem" mobileColumns="1fr" className="pho-stagger">
          <CourseCard
            stamp="COURSE-01"
            coverMeta="entry · 6 modules"
            tag="ENTRY"
            title="Cold-Boot Operations"
            description="Bring a dead terminal back online. Wire, light, listen."
            stats="6 modules · 2h12m"
            progress={{ value: 4, total: 6 }}
            cta={{ label: "RESUME →", href: "#/courses/cold-boot" }}
          />
          <CourseCard
            stamp="COURSE-02"
            coverMeta="field · 9 modules"
            tag="FIELD"
            title="Signal Decoding"
            description="From carrier to message. Static, gates, baudrates."
            stats="9 modules · 3h44m"
            progress={{ value: 1, total: 9 }}
            cta={{ label: "ENTER →", href: "#/courses/signal-decoding" }}
          />
          <CourseCard
            stamp="COURSE-03"
            coverMeta="restricted"
            tag="γ-3"
            title="Anomaly Triage"
            description="Reading the perimeter. Threat ladder, response gates."
            locked
            cta={{ label: "LOCKED", href: "#/courses/anomaly-triage" }}
          />
        </Grid>
      </Column>

      <Hr />

      <Column
        as="section"
        gap="md"
        className="pho-fade-up pho-stagger"
        style={{ "--i": 3, marginTop: "var(--pho-space-7)" } as CssVars}
      >
        <AsciiBanner text="ZONE-NET" fallback="ZONE-NET" />
      </Column>
    </SitePageFrame>
  ),
};

export const PostPage: Story = {
  parameters: { docs: { source: source(postPageSource) } },
  render: function RenderPostPage() {
    const { ref, pct } = useReadingProgress<HTMLElement>();

    return (
      <SitePageFrame active="posts" routeKey="post">
        <ReadingRail value={pct} />
        <Stepper
          items={[
            { label: "home", href: "#/" },
            { label: "posts", href: "#/posts" },
            { label: "boot the terminal", current: true },
          ]}
        />

        <Post
          ref={ref}
          title="boot the terminal"
          className="pho-fade-up"
          headerProps={{
            tags: ["operations", "field"],
            date: "2026-05-06",
            readTime: "6m read",
            meta: { wordCount: 42 },
          }}
          betweenHeaderAndBody={
            <ProgressBar
              value={Math.round(pct * 100)}
              total={100}
              label="reading"
              segments={24}
              showPercent
              current
            />
          }
          frontmatter={{
            title: "boot the terminal",
            date: "2026-05-06",
            readTime: "6m",
            log: "0042",
            tags: ["operations", "field"],
            draft: false,
          }}
          sidebar={<TableOfContents heading="ON THIS PAGE" items={TOC_ITEMS} />}
          afterContent={
            <>
              <Hr />
              <div className="pho-flicker-in">
                <Input variant="terminal" prompt="~/zone-net/posts/0042 $" command="cat next.txt" />
              </div>
              <StepperFoot
                prev={{
                  href: "#/posts/decode-the-signal",
                  kind: "PREV",
                  name: "decode the signal",
                }}
                next={{
                  href: "#/posts/phosphor-protocol-intro",
                  kind: "NEXT",
                  name: "phosphor protocol intro",
                }}
              />
              <Column as="section">
                <Pagination defaultPage={2} totalPages={6} />
              </Column>
            </>
          }
        >
          <h2 id="cold-start">Cold start</h2>
          <p>
            The terminal arrived in a sealed crate, tube-out and stenciled
            <strong> γ-2 / SECTOR-7</strong>. First task: confirm the cathode is
            intact and the line voltage matches the local rail.
          </p>
          <Callout variant="info" title="Pre-flight">
            Check ground continuity before plugging anything in. A floating
            chassis on these old units bites back hard.
          </Callout>
          <h2 id="wiring">Wiring the cathode</h2>
          <p>
            Pop the back panel, lift the deflection yoke, and route the heater
            leads through the strain relief.
          </p>
          <pre>
            <code>{`# discharge the flyback
> short the anode cap to chassis with insulated lead
> wait 30s
> repeat`}</code>
          </pre>
          <h2 id="listening">Listening</h2>
          <p>
            Once the tube warms up, sweep the carrier band slowly. The signal you
            want is between the wallpaper hum and the broadcast skirt.
          </p>
          <h3 id="carrier">Carrier sweep</h3>
          <p>
            Start at 0x40 and walk up by 0x02. If the meter lifts and stays
            lifted, you're on the carrier.
          </p>
          <h3 id="phase">Phase lock</h3>
          <p>
            Phase lock is binary: either the trace stands up, or it doesn't.
          </p>
          <h2 id="eof">EOF</h2>
          <p>
            Log the channel, the time, and any anomalies in the field book. Next
            transmission window opens at 22:00 local.
          </p>
        </Post>
      </SitePageFrame>
    );
  },
};
