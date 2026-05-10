import type { Meta, StoryObj } from "@storybook/react";
import { Page } from "./Page";
import { basicUsage } from "../../../stories/basicUsage";

const meta: Meta<typeof Page> = {
  title: "Templates/Page",
  component: Page,
  parameters: {
    docs: {
      description: {
        component:
          "Page is the layout primitive for posts, project pages, wiki entries, and custom second-brain views.",
      },
    },
  },
};

export default meta;

export const Default: StoryObj<typeof Page> = {
  parameters: { docs: { source: { code: basicUsage.Page } } },
  render: () => (
    <Page header={<h1>Field notes</h1>} sidebar={<nav>Intro</nav>}>
      <p>Readable page content.</p>
    </Page>
  ),
};
