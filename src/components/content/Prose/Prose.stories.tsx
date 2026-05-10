import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import Prose from "./Prose";
import { source, tsx } from "../../../stories/source";

const meta: Meta<typeof Prose> = {
  title: "Foundations/Typography/Prose",
  component: Prose,
};

export default meta;

const defaultSource = tsx`
import { Prose } from "@sektant1/phosphor-ui";

const defaultProps = {
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
        <h4>Fourth Level</h4>
        <h5>Fifth Level</h5>
        <h6>Sixth Level Metadata</h6>
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
          <code>{\`function boot() {\\n  return "online";\\n}\`}</code>
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

export function Example() {
  return <Prose {...defaultProps} />;
}
`;

const nestedMobileWidthSource = tsx`
import { Prose } from "@sektant1/phosphor-ui";



export function Example() {
  return (
      <div style={{ maxWidth: 360 }}>
        <Prose>
          <h1>long article heading wraps at mobile width without overlap</h1>
          <p>
            Intro paragraph with lowercase text, UPPERCASE markers,{" "}
            <code>inlineCode()</code>, and a captioned code block below.
          </p>
          <h2>nested prose section</h2>
          <blockquote>
            Nested prose keeps code, captions, and small text readable in a narrow
            column.
          </blockquote>
          <pre>
            <code>{\`const typography = {\\n  h5: "t-h5",\\n  h6: "t-h6",\\n};\`}</code>
          </pre>
          <figure>
            <div style={{ aspectRatio: "16 / 9", border: "1px dashed var(--pho-color-primary-faint)" }} />
            <figcaption>mobile figure caption readability</figcaption>
          </figure>
          <h5>dense subsection</h5>
          <p>Small headings are distinct from H4 and do not collapse visually.</p>
        </Prose>
      </div>
    );
}
`;
type Story = StoryObj<typeof Prose>;

export const Default: Story = {
  args: {
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
        <h4>Fourth Level</h4>
        <h5>Fifth Level</h5>
        <h6>Sixth Level Metadata</h6>
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
  },
  parameters: { docs: { source: source(defaultSource) } },
};

export const NestedMobileWidth: Story = {
  parameters: { docs: { source: source(nestedMobileWidthSource) } },
  render: () => (
    <div style={{ maxWidth: 360 }}>
      <Prose>
        <h1>long article heading wraps at mobile width without overlap</h1>
        <p>
          Intro paragraph with lowercase text, UPPERCASE markers,{" "}
          <code>inlineCode()</code>, and a captioned code block below.
        </p>
        <h2>nested prose section</h2>
        <blockquote>
          Nested prose keeps code, captions, and small text readable in a narrow
          column.
        </blockquote>
        <pre>
          <code>{`const typography = {\n  h5: "t-h5",\n  h6: "t-h6",\n};`}</code>
        </pre>
        <figure>
          <div style={{ aspectRatio: "16 / 9", border: "1px dashed var(--pho-color-primary-faint)" }} />
          <figcaption>mobile figure caption readability</figcaption>
        </figure>
        <h5>dense subsection</h5>
        <p>Small headings are distinct from H4 and do not collapse visually.</p>
      </Prose>
    </div>
  ),
};
