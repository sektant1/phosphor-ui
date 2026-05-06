import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Footer } from "./Footer";

const meta: Meta<typeof Footer> = {
  title: "Components/Footer",
  component: Footer,
  parameters: { layout: "fullscreen" },
};
export default meta;

type Story = StoryObj<typeof Footer>;

export const Default: Story = {
  render: () => (
    <Footer
      brand="phosphor ui"
      year={2026}
      links={[
        { label: "rss", href: "#" },
        { label: "log", href: "#" },
        { label: "contact", href: "#" },
        { label: "github", href: "https://github.com" },
      ]}
      status={{ label: "link", value: "STABLE" }}
      prompt="~/phosphor-ui $"
      command="logout"
    />
  ),
};

export const Minimal: Story = {
  render: () => <Footer brand="phosphor ui" year={2026} />,
};

export const WithStatus: Story = {
  render: () => (
    <Footer
      brand="ZONE-NET"
      links={[{ label: "rss", href: "#" }]}
      status={{ label: "signal", value: "5/7" }}
    />
  ),
};
