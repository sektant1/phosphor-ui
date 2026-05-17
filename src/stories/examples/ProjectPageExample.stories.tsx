import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { ProjectPageExample } from "./ProjectPageExample";
import { demoNav } from "./shared";
import { source, tsx } from "../source";

const meta: Meta<typeof ProjectPageExample> = {
  title: "Pages/Examples/Project",
  component: ProjectPageExample,
  parameters: { layout: "fullscreen" },
};

export default meta;

type Story = StoryObj<typeof ProjectPageExample>;

const code = tsx`
import {
  Badge,
  ContextPanel,
  NerdTreeNav,
  Stack,
  Tag,
  ThreePanelLayout,
} from "phosphor-ui";

export function ProjectPage() {
  return (
    <ThreePanelLayout
      left={<NerdTreeNav items={nav} title="~/projects" />}
      leftLabel="Project tree"
      right={
        <ContextPanel title="project / pip-boy-clone" meta="2026 · in progress">
          <Stack gap="sm">
            <Badge tone="accent">v0.4.0</Badge>
            <div>
              <strong>stack</strong>
              <Stack direction="row" gap="xs" wrap>
                <Tag>react</Tag>
                <Tag>scss</Tag>
                <Tag>storybook</Tag>
              </Stack>
            </div>
            <div>
              <strong>links</strong>
              <ul>
                <li><a href="/repo">repo</a></li>
                <li><a href="/demo">live demo</a></li>
              </ul>
            </div>
          </Stack>
        </ContextPanel>
      }
      rightLabel="Project metadata"
      main={<article>{/* project body */}</article>}
    />
  );
}
`;

export const Default: Story = {
  args: { nav: demoNav },
  parameters: { docs: { source: source(code) } },
  render: (args) => (
    <div style={{ padding: "1.5rem", minHeight: "100vh" }}>
      <ProjectPageExample {...args} />
    </div>
  ),
};
