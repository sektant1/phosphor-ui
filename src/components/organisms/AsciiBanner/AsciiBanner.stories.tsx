import type { Meta, StoryObj } from "@storybook/react";
import { AsciiBanner } from "./AsciiBanner";
import type { AsciiBannerProps } from "./AsciiBanner";
import { source, tsx } from "../../../stories/source";

const art = `  ____  _   _  ___  ____  ____  _   _  ___  ____
 |  _ \\| | | |/ _ \\/ ___||  _ \\| | | |/ _ \\|  _ \\
 | |_) | |_| | | | \\___ \\| |_) | |_| | | | | |_) |
 |  __/|  _  | |_| |___) |  __/|  _  | |_| |  _ <
 |_|   |_| |_|\\___/|____/|_|   |_| |_|\\___/|_| \\_\\`;

const meta: Meta<AsciiBannerProps> = {
  title: "Molecules/AsciiBanner",
  component: AsciiBanner,
  argTypes: {
    href:  { control: "text" },
    label: { control: "text" },
  },
  args: { art },
};
export default meta;

const defaultSource = tsx`
import { AsciiBanner } from "@sektant1/phosphor-ui";

const art = \`  ____  _   _  ___  ____  ____  _   _  ___  ____
 |  _ \\\\| | | |/ _ \\\\/ ___||  _ \\\\| | | |/ _ \\\\|  _ \\\\
 | |_) | |_| | | | \\\\___ \\\\| |_) | |_| | | | | |_) |
 |  __/|  _  | |_| |___) |  __/|  _  | |_| |  _ <
 |_|   |_| |_|\\\\___/|____/|_|   |_| |_|\\\\___/|_| \\\\_\\\\\`;

const defaultProps = { art };

export function Example() {
  return <AsciiBanner {...defaultProps} />;
}
`;

const withFallbackSource = tsx`
import { AsciiBanner } from "@sektant1/phosphor-ui";

const art = \`  ____  _   _  ___  ____  ____  _   _  ___  ____
 |  _ \\\\| | | |/ _ \\\\/ ___||  _ \\\\| | | |/ _ \\\\|  _ \\\\
 | |_) | |_| | | | \\\\___ \\\\| |_) | |_| | | | | |_) |
 |  __/|  _  | |_| |___) |  __/|  _  | |_| |  _ <
 |_|   |_| |_|\\\\___/|____/|_|   |_| |_|\\\\___/|_| \\\\_\\\\\`;


const withFallbackProps = {
  ...{ art },
  ...{
    fallback: "PHOSPHOR",
    label: "Phosphor home",
  },
};

export function Example() {
  return <AsciiBanner {...withFallbackProps} />;
}
`;

export const Default: StoryObj<AsciiBannerProps> = {
  parameters: { docs: { source: source(defaultSource) } },};

export const WithFallback: StoryObj<AsciiBannerProps> = {
  parameters: { docs: { source: source(withFallbackSource) } },
  args: {
    fallback: "PHOSPHOR",
    label: "Phosphor home",
  },
};
WithFallback.parameters = {
  docs: {
    source: {
      code: `<AsciiBanner
  art={art}
  fallback="PHOSPHOR"
  label="Phosphor home"
/>`,
    },
  },
};
