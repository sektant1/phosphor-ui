import React from "react";
import {
  HeroFrame,
  PostListing,
  PostRow,
  Hr,
  Tag,
  CourseCard,
  AsciiBanner,
} from "../components";
import { Page } from "./shared";

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

    <section className="pho-fade-up" style={{ marginTop: "2rem", ["--i" as never]: 1 }}>
      <h2 className="t-h2">▸ latest transmissions</h2>
      <p className="t-body" style={{ color: "var(--phosphor-dim)", marginTop: 4 }}>
        Field reports from the perimeter. Most recent first.
      </p>
      <div style={{ marginTop: "1rem" }}>
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
      </div>
    </section>

    <Hr />

    <section className="pho-fade-up" style={{ marginTop: "2rem", ["--i" as never]: 2 }}>
      <h2 className="t-h2">▸ courses on rotation</h2>
      <div className="demo-card-grid pho-stagger" style={{ marginTop: "1rem" }}>
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
      </div>
    </section>

    <Hr />

    <section className="pho-fade-up pho-stagger" style={{ marginTop: "2rem", display: "flex", gap: 12, flexWrap: "wrap", ["--i" as never]: 3 }}>
      <Tag>operations</Tag>
      <Tag>signals</Tag>
      <Tag color="magenta">anomaly</Tag>
      <Tag count={42}>archive</Tag>
      <Tag count={7} color="magenta">
        live
      </Tag>
    </section>

    <div style={{ marginTop: "2rem" }}>
      <AsciiBanner art={SMALL_BANNER} fallback="ZONE-NET" />
    </div>
  </Page>
);
