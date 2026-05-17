import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { AdminDashboardExample } from "./AdminDashboardExample";
import { demoNav } from "./shared";
import { source, tsx } from "../source";

const meta: Meta<typeof AdminDashboardExample> = {
  title: "Pages/Examples/Admin",
  component: AdminDashboardExample,
  parameters: { layout: "fullscreen" },
};

export default meta;

type Story = StoryObj<typeof AdminDashboardExample>;

const code = tsx`
import {
  Badge,
  Button,
  ContextPanel,
  NerdTreeNav,
  Stack,
  StatPill,
  ThreePanelLayout,
} from "phosphor-ui";

export function AdminPage() {
  return (
    <ThreePanelLayout
      left={<NerdTreeNav items={nav} title="~/admin" />}
      leftLabel="Admin navigation"
      right={
        <ContextPanel title="utilities" meta="last sync 12:04">
          <Stack gap="sm">
            <Button size="sm">Publish draft</Button>
            <Button size="sm" variant="ghost">Purge cache</Button>
            <Stack direction="row" gap="xs" wrap>
              <Badge tone="accent">all</Badge>
              <Badge>draft</Badge>
              <Badge tone="muted">archived</Badge>
            </Stack>
          </Stack>
        </ContextPanel>
      }
      rightLabel="Admin utilities"
      main={
        <article>
          <Stack direction="row" gap="sm" wrap>
            <StatPill label="posts" value="248" />
            <StatPill label="drafts" value="12" />
          </Stack>
        </article>
      }
    />
  );
}
`;

export const Default: Story = {
  args: { nav: demoNav },
  parameters: { docs: { source: source(code) } },
  render: (args) => (
    <div style={{ padding: "1.5rem", minHeight: "100vh" }}>
      <AdminDashboardExample {...args} />
    </div>
  ),
};
