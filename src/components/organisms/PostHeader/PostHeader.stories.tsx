import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { DropdownMenu } from "../../molecules/DropdownMenu";
import { PostHeader } from "./PostHeader";
import { basicUsage } from "../../../stories/basicUsage";

const meta: Meta<typeof PostHeader> = {
  title: "Organisms/PostHeader",
  component: PostHeader,
};
export default meta;

type Story = StoryObj<typeof PostHeader>;

export const Default: Story = {
  parameters: { docs: { source: { code: basicUsage.PostHeader } } },
  render: () => (
    <PostHeader
      eyebrow="field log 0042"
      title="// boot the terminal //"
      subtitle="Cold-start notes for a green-screen relay with a noisy carrier path."
      date="2026-05-06"
      readTime="6m read"
      wordCount={1280}
      tags={["operations", "field"]}
      actions={
        <DropdownMenu
          label="actions"
          align="end"
          items={[
            { label: "copy link", value: "copy" },
            { label: "edit post", value: "edit" },
          ]}
        />
      }
    />
  ),
};
