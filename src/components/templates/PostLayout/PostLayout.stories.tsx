import type { Meta, StoryObj } from "@storybook/react";
import { PostBody } from "../../content/MdxComponents";
import { PostHeader } from "../../organisms/PostHeader";
import { TableOfContents } from "../../molecules/TableOfContents";
import { StepperFoot } from "../../molecules/Stepper";
import { PostLayout } from "./PostLayout";
import { basicUsage } from "../../../stories/basicUsage";

const meta: Meta<typeof PostLayout> = {
  title: "Templates/PostLayout",
  component: PostLayout,
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;

type Story = StoryObj<typeof PostLayout>;

export const Default: Story = {
  render: () => (
    <div style={{ padding: "2rem", width: "100%" }}>
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
        <PostBody
          frontmatter={{
            title: "boot the terminal",
            date: "2026-05-06",
            readTime: "6m",
            tags: ["operations", "field"],
            draft: false,
          }}
        >
          <h2 id="cold-start">Cold start</h2>
          <p>
            The terminal arrived in a sealed crate, tube-out and stenciled for
            field repair.
          </p>
          <h2 id="wiring">Wiring</h2>
          <p>
            Route heater leads through the strain relief before powering the
            unit.
          </p>
        </PostBody>
      </PostLayout>
    </div>
  ),
};
Default.parameters = {
  docs: {
    source: { code: basicUsage.PostLayout },
  },
};
