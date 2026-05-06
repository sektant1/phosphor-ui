import type { Meta, StoryObj } from "@storybook/react";
import { Footer } from "./Footer";
import type { FooterProps } from "./Footer";

const meta: Meta<FooterProps> = {
  title: "Components/Footer",
  component: Footer,
  parameters: { layout: "fullscreen" },
  argTypes: {
    brand:   { control: "text" },
    year:    { control: "number" },
    prompt:  { control: "text" },
    command: { control: "text" },
  },
  args: {
    brand:   "phosphor ui",
    year:    2026,
    prompt:  "~/phosphor-ui $",
    command: "logout",
    links: [
      { label: "rss",     href: "#" },
      { label: "log",     href: "#" },
      { label: "contact", href: "#" },
      { label: "github",  href: "https://github.com" },
    ],
    status: { label: "link", value: "STABLE" },
  },
};
export default meta;

export const Default: StoryObj<FooterProps> = {};
