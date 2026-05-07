import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { PostBody } from "../MdxComponents";
import { PostHeader } from "../PostHeader";
import { TableOfContents } from "../TableOfContents";
import { StepperFoot } from "../Stepper";
import { PostLayout } from "./PostLayout";

const meta: Meta<typeof PostLayout> = {
  title: "Components/PostLayout",
  component: PostLayout,
};
export default meta;

type Story = StoryObj<typeof PostLayout>;

export const Default: Story = {
  render: () => (
    <PostLayout
      header={
        <PostHeader
          title="// boot the terminal //"
          date="2026-05-06"
          readTime="6m read"
          tags={["operations", "field"]}
        />
      }
      sidebar={
        <TableOfContents
          items={[
            { label: "Cold start", href: "#cold-start" },
            { label: "Wiring", href: "#wiring" },
          ]}
        />
      }
      footer={
        <StepperFoot
          prev={{ href: "#prev", name: "decode the signal", kind: "prev" }}
          next={{ href: "#next", name: "phosphor protocol", kind: "next" }}
        />
      }
    >
      <PostBody>
        <h2 id="cold-start">Cold start</h2>
        <p>The terminal arrived in a sealed crate, tube-out and stenciled for field repair.</p>
        <h2 id="wiring">Wiring</h2>
        <p>Route heater leads through the strain relief before powering the unit.</p>
      </PostBody>
    </PostLayout>
  ),
};
