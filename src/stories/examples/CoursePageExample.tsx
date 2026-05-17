import React from "react";
import {
  ContextPanel,
  CrtShell,
  Exercise,
  ModuleAccordion,
  NerdTreeNav,
  PrereqList,
  Stack,
  Tabs,
  ThreePanelLayout,
} from "../../components";
import type { NerdTreeNavItem, TabItem } from "../../components";

export interface CoursePageExampleProps {
  nav?: NerdTreeNavItem[];
}

const tabItems: TabItem[] = [
  {
    id: "modules",
    label: "Modules",
    content: (
      <Stack gap="sm">
        <ModuleAccordion
          num="01"
          title="Signals from noise"
          progress={{ value: 2, total: 3 }}
          lessons={[
            { num: "01.1", title: "What is noise", href: "#mod-1-1", state: "done", length: "8m" },
            { num: "01.2", title: "Signal floor", href: "#mod-1-2", state: "done", length: "12m" },
            { num: "01.3", title: "Carrier vs envelope", href: "#mod-1-3", length: "10m" },
          ]}
        />
        <ModuleAccordion
          num="02"
          title="Demodulation"
          defaultOpen={false}
          progress={{ value: 0, total: 2 }}
          lessons={[
            { num: "02.1", title: "Product detector", href: "#mod-2-1", length: "14m" },
            { num: "02.2", title: "Beat frequency oscillator", href: "#mod-2-2", length: "9m" },
          ]}
        />
        <ModuleAccordion
          num="03"
          title="Practice lab"
          defaultOpen={false}
          lessons={[
            { num: "03.1", title: "Breadboard mixer", href: "#mod-3-1", state: "locked", length: "lab" },
          ]}
        />
      </Stack>
    ),
  },
  {
    id: "exercises",
    label: "Exercises",
    content: (
      <Stack gap="sm">
        <Exercise
          n={1}
          title="Square wave audit"
          tasks={[
            { label: "Capture 1kHz square at scope CH1", done: true },
            { label: "Identify first three harmonics" },
            { label: "Note duty-cycle drift across 10 minutes" },
          ]}
        />
        <Exercise
          n={2}
          title="Antenna sweep"
          tasks={[
            { label: "Sweep 3-30MHz with VNA" },
            { label: "Mark resonance dips" },
            { label: "Log SWR at band edges" },
          ]}
        />
      </Stack>
    ),
  },
  {
    id: "resources",
    label: "Resources",
    content: (
      <PrereqList
        heading="downloads"
        stamp="lesson 02"
        items={[
          {
            title: "Datasheet — NE602",
            sub: "PDF · 412 KB",
            status: "met",
            href: "#res-ne602.pdf",
            download: true,
          },
          {
            title: "Reading list",
            sub: "MD · curated",
            status: "soft",
            href: "#res-reading.md",
            download: true,
          },
          {
            title: "Reference schematics",
            sub: "ZIP · 2.1 MB",
            status: "missing",
            href: "#res-schematics.zip",
            download: true,
          },
        ]}
      />
    ),
  },
];

export const CoursePageExample: React.FC<CoursePageExampleProps> = ({
  nav = [],
}) => (
  <CrtShell>
    <div style={{ padding: "1.5rem" }}>
  <ThreePanelLayout
    left={<NerdTreeNav items={nav} title="~/courses" />}
    leftLabel="Course tree"
    right={
      <ContextPanel title="Lesson 02">
        <Tabs items={tabItems} defaultValue="modules" />
      </ContextPanel>
    }
    rightLabel="Lesson sidebar"
    main={
      <article>
        <header>
          <p>course / intro-to-rf</p>
          <h1>Lesson 02 — Pulling signal from noise</h1>
        </header>
        <section id="mod-2">
          <h2>Reading</h2>
          <p>
            Signal-to-noise is a budget, not an absolute. Spend it where the ear
            (or detector) is least tolerant.
          </p>
        </section>
        <section>
          <h2>Lab</h2>
          <p>
            Wire up the breadboard mixer shown in the resources tab. Verify the
            output with the scope before adding the audio stage.
          </p>
        </section>
      </article>
    }
  />
    </div>
  </CrtShell>
);

CoursePageExample.displayName = "CoursePageExample";
