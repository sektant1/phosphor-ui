import type { Meta, StoryObj } from "@storybook/react";
import { Flex, Grid } from "./Layout";
import { Tag } from "../Tag";

const meta: Meta<typeof Flex> = {
  title: "Components/Layout",
  component: Flex,
};

export default meta;

type Story = StoryObj<typeof Flex>;

export const FlexRow: Story = {
  render: () => (
    <Flex align="center" wrap="wrap" gap="sm">
      <Tag>operations</Tag>
      <Tag>signals</Tag>
      <Tag color="magenta">anomaly</Tag>
      <Tag count={42}>archive</Tag>
    </Flex>
  ),
};

export const FlexStack: Story = {
  render: () => (
    <Flex direction="column" gap="md" style={{ maxWidth: 420 }}>
      <Tag>module 01</Tag>
      <Tag>module 02</Tag>
      <Tag color="magenta">locked</Tag>
    </Flex>
  ),
};

export const ResponsiveGrid: Story = {
  render: () => (
    <Grid minItemWidth="12rem" gap="md">
      {["cold-boot", "signal", "anomaly", "archive"].map((label) => (
        <div
          key={label}
          style={{
            border: "var(--border-line)",
            padding: "var(--space-5)",
            color: "var(--phosphor-bright)",
          }}
        >
          {label}
        </div>
      ))}
    </Grid>
  ),
};
