import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import Prose from "./Prose";
import { basicUsage } from "../../../stories/basicUsage";

export default {
  title: "Foundations/Typography/Prose",
  component: Prose,
} as ComponentMeta<typeof Prose>;

const Template: ComponentStory<typeof Prose> = (args) => <Prose {...args} />;

export const Default = Template.bind({});
Default.args = {
  children: (
    <>
      <h1>Phosphor Article</h1>
      <p>
        This is the <strong>opening paragraph</strong> with{" "}
        <em>emphasized prose</em> and an <a href="#">inline link</a>.
      </p>
      <h2>First Section</h2>
      <p>
        Body copy. Inline <code>code()</code> renders with magenta-bordered
        chip styling.
      </p>
      <h3>Subsection</h3>
      <ul>
        <li>Unordered item alpha</li>
        <li>Unordered item beta</li>
        <li>Unordered item gamma</li>
      </ul>
      <ol>
        <li>Ordered first</li>
        <li>Ordered second</li>
      </ol>
      <blockquote>
        A quote line with the bar prefix and italic typography.
      </blockquote>
      <pre>
        <code>{`function boot() {\n  return "online";\n}`}</code>
      </pre>
      <hr />
      <table>
        <thead>
          <tr>
            <th>key</th>
            <th>value</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>mode</td>
            <td>phosphor</td>
          </tr>
          <tr>
            <td>fx</td>
            <td>crt</td>
          </tr>
        </tbody>
      </table>
    </>
  ),
};
Default.parameters = { docs: { source: { code: basicUsage.Prose } } };
