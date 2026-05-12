import React from "react";
import {
  Callout,
  TableOfContents,
  ProgressBar,
  Pagination,
  ReadingRail,
  Hr,
  Stepper,
  StepperFoot,
  Input,
  Post as PostTemplate,
} from "../components";
import {
  DemoSection,
  Page,
  useReadingProgress,
} from "./shared";

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

export const Post: React.FC = () => {
  const { ref, pct } = useReadingProgress<HTMLElement>();
  return (
    <Page active="posts" routeKey="post">
      <ReadingRail value={pct} />
      <Stepper
        items={[
          { label: "home", href: "#/" },
          { label: "posts", href: "#/posts" },
          { label: "boot the terminal", current: true },
        ]}
      />

      <PostTemplate
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
              <Input
                variant="terminal"
                prompt="~/zone-net/posts/0042 $"
                command="cat next.txt"
              />
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
      </PostTemplate>
    </Page>
  );
};
