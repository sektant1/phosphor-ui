import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { H2 } from "../atoms/Headings";
import { Hr } from "../atoms/Hr";
import { ProgressBar } from "../atoms/ProgressBar";
import { ReadingRail } from "../atoms/ReadingRail";
import { Tag } from "../atoms/Tag";
import { TerminalPrompt } from "../atoms/TerminalPrompt";
import { Callout } from "../molecules/Callout";
import { CourseCard } from "../molecules/CourseCard";
import Pagination from "../molecules/Pagination";
import { Stepper, StepperFoot } from "../molecules/Stepper";
import { TableOfContents } from "../molecules/TableOfContents";
import { AsciiBanner } from "../organisms/AsciiBanner";
import { HeroFrame } from "../organisms/HeroFrame";
import { PostListing, PostRow } from "../organisms/PostListing";
import { Post } from "./Post";
import {
  DemoCluster,
  DemoGrid,
  DemoSection,
  Page as DemoPage,
  useReadingProgress,
} from "../../demo/shared";
import type { CssVars } from "../../utils/browser";

const meta: Meta = {
  title: "Pages/Site Pages",
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;

type Story = StoryObj;

const HERO_ART = `
███████╗ ██████╗ ███╗   ██╗███████╗   ███╗   ██╗███████╗████████╗
╚══███╔╝██╔═══██╗████╗  ██║██╔════╝   ████╗  ██║██╔════╝╚══██╔══╝
  ███╔╝ ██║   ██║██╔██╗ ██║█████╗     ██╔██╗ ██║█████╗     ██║
 ███╔╝  ██║   ██║██║╚██╗██║██╔══╝     ██║╚██╗██║██╔══╝     ██║
███████╗╚██████╔╝██║ ╚████║███████╗   ██║ ╚████║███████╗   ██║
╚══════╝ ╚═════╝ ╚═╝  ╚═══╝╚══════╝   ╚═╝  ╚═══╝╚══════╝   ╚═╝
`;

const SMALL_BANNER = `
// SECTOR-7 // АНОМАЛЬНАЯ АКТИВНОСТЬ
// CHANNEL 0x4C // γ-2 // NORM
`;

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
  render: () => (
    <DemoPage active="home" routeKey="home">
      <div className="pho-flicker-in">
        <HeroFrame
          art={HERO_ART}
          topHud={
            <>
              <HeroFrame.HudLed variant="rec" />
              <HeroFrame.HudLabel>REC</HeroFrame.HudLabel>
              <HeroFrame.HudText>CH 0x4C · γ-2 · NORM</HeroFrame.HudText>
              <HeroFrame.HudSpacer />
              <HeroFrame.HudBars value={5} />
              <HeroFrame.HudLabel>5/7</HeroFrame.HudLabel>
            </>
          }
          bottomHud={
            <>
              <HeroFrame.HudLed variant="pwr" />
              <HeroFrame.HudLabel>PWR</HeroFrame.HudLabel>
              <HeroFrame.HudSpacer />
              <HeroFrame.HudTape text="// СЕКРЕТНО // single-channel transmissions //" />
            </>
          }
        />
      </div>

      <DemoSection
        className="pho-fade-up"
        space="lg"
        style={{ "--i": 1 } as CssVars}
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
        <DemoCluster>
          <Tag>operations</Tag>
          <Tag>signals</Tag>
          <Tag color="magenta">anomaly</Tag>
          <Tag count={42}>archive</Tag>
          <Tag count={7} color="magenta">
            live
          </Tag>
        </DemoCluster>
      </DemoSection>

      <Hr />

      <DemoSection
        className="pho-fade-up"
        space="lg"
        style={{ "--i": 2 } as CssVars}
      >
        <H2 glyph="▸">courses on rotation</H2>
        <DemoGrid className="pho-stagger">
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
        </DemoGrid>
      </DemoSection>

      <Hr />

      <DemoSection
        className="pho-fade-up pho-stagger"
        space="lg"
        style={{ "--i": 3 } as CssVars}
      >
        <AsciiBanner art={SMALL_BANNER} fallback="ZONE-NET" />
      </DemoSection>
    </DemoPage>
  ),
};

export const PostPage: Story = {
  render: function RenderPostPage() {
    const { ref, pct } = useReadingProgress<HTMLElement>();

    return (
      <DemoPage active="posts" routeKey="post">
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
          className="demo-stack demo-stack--lg demo-space--md"
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
                <TerminalPrompt prompt="~/zone-net/posts/0042 $" command="cat next.txt" />
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
              <DemoSection>
                <Pagination defaultPage={2} totalPages={6} />
              </DemoSection>
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
      </DemoPage>
    );
  },
};
