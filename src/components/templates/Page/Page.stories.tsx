import type { Meta, StoryObj } from "@storybook/react";
import { Page } from "./Page";
import { basicUsage } from "../../../stories/basicUsage";

const meta: Meta<typeof Page> = {
  title: "Templates/PageBase",
  component: Page,
  parameters: {
    docs: {
      description: {
        component:
          "Page is the low-level page composition primitive. Prefer PageLayout when you need the standard titled template.",
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
