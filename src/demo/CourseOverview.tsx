import React from "react";
import {
  CourseCard,
  ModuleAccordion,
  PrereqList,
  Stepper,
  StepperFoot,
  Hr,
  Tag,
  ProgressBar,
  Callout,
  Prose,
  H2,
  Heading,
} from "../components";
import { Page } from "./shared";

export const CourseOverview: React.FC = () => (
  <Page active="courses" routeKey="course">
    <Stepper
      items={[
        { label: "home", href: "#/" },
        { label: "courses", href: "#/courses" },
        { label: "Cold-Boot Operations", current: true },
      ]}
    />

    <header className="pho-fade-up pho-stagger" style={{ marginTop: "1.5rem", display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap" }}>
      <Tag color="phosphor">course</Tag>
      <Tag>entry</Tag>
      <Tag count={6}>modules</Tag>
    </header>

    <div className="demo-split" style={{ marginTop: "1rem" }}>
      <div>
        <div className="pho-fade-up">
        <CourseCard
          stamp="COURSE-01"
          coverMeta="entry · 6 modules · 2h12m"
          tag="ENTRY"
          title="Cold-Boot Operations"
          description="Bring a dead terminal back online. Wire, light, listen. Six modules of hands-on work, from chassis-up reassembly to first signal lock."
          stats="6 modules · 24 lessons · 2h12m"
          progress={{ value: 4, total: 6 }}
          cta={{ label: "RESUME →", href: "#/courses/cold-boot/m04" }}
        />
        </div>

        <Hr />

        <Prose>
          <h2>// objective //</h2>
          <p>
            By the end of this course, you will be able to take a sealed,
            dormant CRT terminal and bring it to a stable carrier-locked state
            without supervision.
          </p>
        </Prose>

        <Callout variant="info" title="Lab safety">
          All lab modules require an isolation transformer and a discharge
          probe. Do not attempt without supervised gear check.
        </Callout>

        <Hr />

        <H2 className="pho-fade-up" style={{ marginTop: "1.5rem" }}>▸ modules</H2>
        <div className="pho-stagger" style={{ display: "flex", flexDirection: "column", gap: 12, marginTop: "1rem" }}>
          <ModuleAccordion
            num="01"
            title="Pre-flight"
            intro="Inventory, ground continuity, isolation transformer setup."
            progress={{ value: 4, total: 4 }}
            defaultOpen={false}
            lessons={[
              { num: "1.1", title: "Crate inventory", length: "4m", state: "done" },
              { num: "1.2", title: "Ground check", length: "6m", state: "done" },
              { num: "1.3", title: "Isolation rig", length: "8m", state: "done" },
              { num: "1.4", title: "Quiz: pre-flight", length: "3m", state: "done" },
            ]}
          />
          <ModuleAccordion
            num="02"
            title="Chassis-up"
            intro="Open the case. Identify boards. Map the cable harness."
            progress={{ value: 3, total: 3 }}
            lessons={[
              { num: "2.1", title: "Cracking the case", length: "5m", state: "done" },
              { num: "2.2", title: "Board map", length: "9m", state: "done" },
              { num: "2.3", title: "Harness audit", length: "7m", state: "done" },
            ]}
          />
          <ModuleAccordion
            num="03"
            title="Cathode wiring"
            intro="Heater leads, deflection yoke, anode cap discipline."
            progress={{ value: 4, total: 5 }}
            lessons={[
              { num: "3.1", title: "Heater leads", length: "8m", state: "done" },
              { num: "3.2", title: "Deflection yoke", length: "11m", state: "done" },
              { num: "3.3", title: "Anode cap drill", length: "6m", state: "done" },
              { num: "3.4", title: "Lab: full rewire", length: "22m", state: "done" },
              { num: "3.5", title: "Quiz: wiring", length: "4m", state: "default" },
            ]}
          />
          <ModuleAccordion
            num="04"
            title="First light"
            intro="Power-on sequence. Watching the trace. Diagnosing dim tubes."
            progress={{ value: 1, total: 4 }}
            defaultOpen
            lessons={[
              { num: "4.1", title: "Power-on order", length: "5m", state: "done" },
              { num: "4.2", title: "Reading the trace", length: "9m", state: "default" },
              { num: "4.3", title: "Dim tube triage", length: "12m", state: "default" },
              { num: "4.4", title: "Lab: light it up", length: "18m", state: "default" },
            ]}
          />
          <ModuleAccordion
            num="05"
            title="Carrier sweep"
            intro="Tuning. Locking. Logging."
            progress={{ value: 0, total: 4 }}
            lessons={[
              { num: "5.1", title: "Carrier basics", length: "7m", state: "locked" },
              { num: "5.2", title: "Sweep technique", length: "10m", state: "locked" },
              { num: "5.3", title: "Phase lock", length: "8m", state: "locked" },
              { num: "5.4", title: "Lab: log a session", length: "20m", state: "locked" },
            ]}
          />
          <ModuleAccordion
            num="06"
            title="Sign-off"
            intro="Field book practices. Anomaly notation. Handoff."
            progress={{ value: 0, total: 4 }}
            lessons={[
              { num: "6.1", title: "Field book", length: "5m", state: "locked" },
              { num: "6.2", title: "Anomaly notation", length: "6m", state: "locked" },
              { num: "6.3", title: "Handoff brief", length: "4m", state: "locked" },
              { num: "6.4", title: "Final quiz", length: "10m", state: "locked" },
            ]}
          />
        </div>
      </div>

      <aside className="demo-split-aside pho-fade-up" style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <div>
          <Heading level={4} as="h3">// progress //</Heading>
          <ProgressBar value={4} total={6} segments={20} showPercent label="modules" current />
        </div>

        <PrereqList
          heading="PREREQS"
          stamp="γ-1"
          items={[
            { title: "Basic electronics", sub: "ohm's law, capacitance", status: "met" },
            { title: "Tube safety briefing", sub: "watch first", status: "met" },
            { title: "Field book setup", sub: "issued by ops", status: "soft" },
            { title: "Clearance γ-2", sub: "current: γ-1", status: "missing" },
          ]}
        />
      </aside>
    </div>

    <Hr />

    <StepperFoot
      prev={{ href: "#/courses", kind: "INDEX", name: "all courses" }}
      next={{ href: "#/courses/signal-decoding", kind: "NEXT", name: "Signal Decoding" }}
    />
  </Page>
);
