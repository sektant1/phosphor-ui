import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { PostBody } from "./MdxComponents";

const meta: Meta<typeof PostBody> = {
  title: "Components/PostBody",
  component: PostBody,
};
export default meta;

type Story = StoryObj<typeof PostBody>;

export const Default: Story = {
  render: () => (
    <PostBody>
      <h1>// boot the terminal</h1>
      <p>
        The terminal arrived in a sealed crate, tube-out and stenciled
        <strong> γ-2 / SECTOR-7</strong>.
      </p>
      <h2>Cathode wiring</h2>
      <p>Pop the back panel. Lift the deflection yoke. Route heater leads.</p>
      <pre>
        <code>{`> short the anode cap to chassis with insulated lead\n> wait 30s\n> repeat`}</code>
      </pre>
      <blockquote>
        "The Zone is a very complicated system of traps."
      </blockquote>
      <ul>
        <li>discharge flyback</li>
        <li>inspect heater filament</li>
        <li>verify ground continuity</li>
      </ul>
      <hr />
      <p>
        See the <a href="https://example.com">protocol manual</a> for full
        wiring schematic.
      </p>
    </PostBody>
  ),
};
