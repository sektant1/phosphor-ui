import React from "react";
import {
  Badge,
  Button,
  Cluster,
  ContextPanel,
  CrtShell,
  List,
  NerdTreeNav,
  Stack,
  StatPill,
  ThreePanelLayout,
} from "../../components";
import type { NerdTreeNavItem } from "../../components";

export interface AdminDashboardExampleProps {
  nav?: NerdTreeNavItem[];
}

export const AdminDashboardExample: React.FC<AdminDashboardExampleProps> = ({
  nav = [],
}) => (
  <CrtShell>
    <div style={{ padding: "1.5rem" }}>
  <ThreePanelLayout
    left={<NerdTreeNav items={nav} title="~/admin" />}
    leftLabel="Admin navigation"
    right={
      <ContextPanel title="utilities" meta="last sync 12:04">
        <Stack gap="sm">
          <div>
            <strong>actions</strong>
            <Stack gap="xs">
              <Button size="sm">Publish draft</Button>
              <Button size="sm" variant="ghost">
                Purge cache
              </Button>
              <Button size="sm" variant="ghost">
                Export CSV
              </Button>
            </Stack>
          </div>
          <div>
            <strong>filters</strong>
            <Cluster gap="xs">
              <Badge tone="accent">all</Badge>
              <Badge>draft</Badge>
              <Badge>scheduled</Badge>
              <Badge tone="muted">archived</Badge>
            </Cluster>
          </div>
          <div>
            <strong>status</strong>
            <p>queue healthy / 0 failures</p>
          </div>
          <div>
            <strong>quick links</strong>
            <List
              marker="chevron"
              variant="terminal"
              density="compact"
              items={[
                { title: "Audit log", href: "#audit" },
                { title: "Users", href: "#users" },
                { title: "Feature flags", href: "#flags" },
              ]}
            />
          </div>
        </Stack>
      </ContextPanel>
    }
    rightLabel="Admin utilities"
    main={
      <article>
        <header>
          <p>admin / dashboard</p>
          <h1>Overview</h1>
        </header>
        <section>
          <Cluster gap="sm">
            <StatPill label="posts" value="248" />
            <StatPill label="drafts" value="12" />
            <StatPill label="scheduled" value="3" />
            <StatPill label="errors" value="0" color="phosphor" />
          </Cluster>
        </section>
        <section>
          <h2>Recent activity</h2>
          <ul>
            <li>12:01 — draft "rf-primer" autosaved</li>
            <li>11:48 — user @sektant1 published "field-notes"</li>
            <li>11:30 — scheduled job "weekly-roundup" enqueued</li>
          </ul>
        </section>
      </article>
    }
  />
    </div>
  </CrtShell>
);

AdminDashboardExample.displayName = "AdminDashboardExample";
