import React from "react";
import {
  Badge,
  Cluster,
  ContextPanel,
  CrtShell,
  List,
  NerdTreeNav,
  Stack,
  Tag,
  ThreePanelLayout,
} from "../../components";
import type { NerdTreeNavItem } from "../../components";

export interface ProjectPageExampleProps {
  nav?: NerdTreeNavItem[];
}

export const ProjectPageExample: React.FC<ProjectPageExampleProps> = ({
  nav = [],
}) => (
  <CrtShell>
    <div style={{ padding: "1.5rem" }}>
  <ThreePanelLayout
    left={<NerdTreeNav items={nav} title="~/projects" />}
    leftLabel="Project tree"
    right={
      <ContextPanel title="project / pip-boy-clone" meta="2026 · in progress">
        <Stack gap="sm">
          <Badge tone="accent">v0.4.0</Badge>
          <div>
            <strong>stack</strong>
            <Cluster gap="xs">
              <Tag>react</Tag>
              <Tag>scss</Tag>
              <Tag>storybook</Tag>
              <Tag>vite</Tag>
            </Cluster>
          </div>
          <div>
            <strong>links</strong>
            <List
              marker="dash"
              variant="terminal"
              density="compact"
              items={[
                { title: "repo", href: "#repo" },
                { title: "live demo", href: "#demo" },
                { title: "docs", href: "#docs" },
              ]}
            />
          </div>
          <div>
            <strong>status</strong>
            <p>green / shipping weekly</p>
          </div>
        </Stack>
      </ContextPanel>
    }
    rightLabel="Project metadata"
    main={
      <article>
        <header>
          <p>project / pip-boy-clone</p>
          <h1>Pip-Boy clone — phosphor build</h1>
          <p>
            A wearable terminal interface emulating Fallout-style instrumentation,
            built on phosphor-ui primitives.
          </p>
        </header>
        <section>
          <h2>Overview</h2>
          <p>
            The clone targets a small SBC with a square 480x480 display. The UI
            speaks in terminal frames and uses the phosphor-ui token system to
            stay legible in low-contrast environments.
          </p>
        </section>
        <section>
          <h2>Screenshots</h2>
          <p>(Insert your captured frames here.)</p>
        </section>
      </article>
    }
  />
    </div>
  </CrtShell>
);

ProjectPageExample.displayName = "ProjectPageExample";
