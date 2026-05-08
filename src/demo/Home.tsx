import React from "react";
import {
  HeroFrame,
  PostListing,
  PostRow,
  Hr,
  Tag,
  H2,
  CourseCard,
  AsciiBanner,
} from "../components";
import { DemoCluster, DemoGrid, DemoSection, Page } from "./shared";
import type { CssVars } from "../utils/browser";

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

export const Home: React.FC = () => (
  <Page active="home" routeKey="home">
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
      <p
        className="t-body"
        style={{ color: "var(--phosphor-dim)", margin: 0 }}
      >
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
        <PostRow
          date="2026-04-28"
          title="anomaly catalog: vol. 1"
          meta="14m"
          href="#/posts/anomaly-catalog-1"
          index={3}
          glyph="▶"
        />
        <PostRow
          date="2026-04-22"
          title="cold-cathode field guide"
          meta="11m"
          href="#/posts/cold-cathode"
          thumbSrc="https://picsum.photos/seed/zone-cathode/320/200"
          thumbAlt="cathode"
          index={4}
        />
        <PostRow
          date="2026-04-18"
          title="static loop // live capture"
          meta="3m"
          href="#/posts/static-loop"
          thumbSrc="https://media.giphy.com/media/3o6Zt481isNVuQI1l6/giphy.gif"
          thumbAlt="static loop animation"
          index={5}
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
  </Page>
);
