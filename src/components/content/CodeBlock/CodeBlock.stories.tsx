import type { Meta, StoryObj } from "@storybook/react";
import { CodeBlock } from "./CodeBlock";
import type { CodeBlockProps } from "./CodeBlock";
import { source, tsx } from "../../../stories/source";

const meta: Meta<CodeBlockProps> = {
  title: "Molecules/CodeBlock",
  component: CodeBlock,
  argTypes: {
    lang:     { control: "select", options: ["typescript", "javascript", "rust", "python", "go", "bash", "json", "css", "html", "text"] },
    filename: { control: "text" },
  },
  args: {
    lang:     "typescript",
    filename: "example.ts",
    code: `import { useState, useEffect } from "react";

interface User {
  id: number;
  name: string;
  role: "admin" | "viewer";
}

export function useUser(id: number): User | null {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    fetch(\`/api/users/\${id}\`)
      .then((res) => res.json())
      .then(setUser)
      .catch(console.error);
  }, [id]);

  return user;
}`,
  },
};
export default meta;

const defaultSource = tsx`
import { CodeBlock } from "@sektant1/phosphor-ui";

const defaultProps = {
    lang:     "typescript",
    filename: "example.ts",
    code: \`import { useState, useEffect } from "react";

interface User {
  id: number;
  name: string;
  role: "admin" | "viewer";
}

export function useUser(id: number): User | null {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    fetch(\\\`/api/users/\\\${id}\\\`)
      .then((res) => res.json())
      .then(setUser)
      .catch(console.error);
  }, [id]);

  return user;
}\`,
  };

export function Example() {
  return <CodeBlock {...defaultProps} />;
}
`;

const longFilenameSource = tsx`
import { CodeBlock } from "@sektant1/phosphor-ui";

const longFilenameProps = {
  ...{
    lang:     "typescript",
    filename: "example.ts",
    code: \`import { useState, useEffect } from "react";

interface User {
  id: number;
  name: string;
  role: "admin" | "viewer";
}

export function useUser(id: number): User | null {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    fetch(\\\`/api/users/\\\${id}\\\`)
      .then((res) => res.json())
      .then(setUser)
      .catch(console.error);
  }, [id]);

  return user;
}\`,
  },
  ...{
    lang: "bash",
    filename: "ops/deployments/field-relay/checkpoints/rebuild-production-index.sh",
    code: \`set -euo pipefail

npm run typecheck
npm test -- --runInBand
npm run build\`,
  },
};

export function Example() {
  return <CodeBlock {...longFilenameProps} />;
}
`;

const noFilenameSource = tsx`
import { CodeBlock } from "@sektant1/phosphor-ui";

const noFilenameProps = {
  ...{
    lang:     "typescript",
    filename: "example.ts",
    code: \`import { useState, useEffect } from "react";

interface User {
  id: number;
  name: string;
  role: "admin" | "viewer";
}

export function useUser(id: number): User | null {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    fetch(\\\`/api/users/\\\${id}\\\`)
      .then((res) => res.json())
      .then(setUser)
      .catch(console.error);
  }, [id]);

  return user;
}\`,
  },
  ...{
    lang: "json",
    code: \`{
  "status": "online",
  "channel": "alpha",
  "checksum": "7f3a"
}\`,
  },
};

export function Example() {
  return <CodeBlock {...noFilenameProps} />;
}
`;

const copyDisabledSource = tsx`
import { CodeBlock } from "@sektant1/phosphor-ui";

const copyDisabledProps = {
  ...{
    lang:     "typescript",
    filename: "example.ts",
    code: \`import { useState, useEffect } from "react";

interface User {
  id: number;
  name: string;
  role: "admin" | "viewer";
}

export function useUser(id: number): User | null {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    fetch(\\\`/api/users/\\\${id}\\\`)
      .then((res) => res.json())
      .then(setUser)
      .catch(console.error);
  }, [id]);

  return user;
}\`,
  },
  ...{
    lang: "text",
    copyable: false,
    code: "Read-only diagnostic output. Copy control intentionally hidden.",
  },
};

export function Example() {
  return <CodeBlock {...copyDisabledProps} />;
}
`;

const preRenderedSource = tsx`
import { CodeBlock } from "@sektant1/phosphor-ui";



const preRenderedProps = {
  ...{
    lang:     "typescript",
    filename: "example.ts",
    code: \`import { useState, useEffect } from "react";

interface User {
  id: number;
  name: string;
  role: "admin" | "viewer";
}

export function useUser(id: number): User | null {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    fetch(\\\`/api/users/\\\${id}\\\`)
      .then((res) => res.json())
      .then(setUser)
      .catch(console.error);
  }, [id]);

  return user;
}\`,
  },
  ...{
    lang: "bash",
    filename: "terminal.log",
    code: "npm run build",
    html: '<pre><code><span class="line">npm run build</span></code></pre>',
  },
};

export function Example() {
  return <CodeBlock {...preRenderedProps} />;
}
`;

export const Default: StoryObj<CodeBlockProps> = {
  parameters: { docs: { source: source(defaultSource) } },
};

export const LongFilename: StoryObj<CodeBlockProps> = {
  parameters: { docs: { source: source(longFilenameSource) } },
  args: {
    lang: "bash",
    filename: "ops/deployments/field-relay/checkpoints/rebuild-production-index.sh",
    code: `set -euo pipefail

npm run typecheck
npm test -- --runInBand
npm run build`,
  },
};

export const NoFilename: StoryObj<CodeBlockProps> = {
  parameters: { docs: { source: source(noFilenameSource) } },
  args: {
    lang: "json",
    code: `{
  "status": "online",
  "channel": "alpha",
  "checksum": "7f3a"
}`,
  },
};

export const CopyDisabled: StoryObj<CodeBlockProps> = {
  parameters: { docs: { source: source(copyDisabledSource) } },
  args: {
    lang: "text",
    copyable: false,
    code: "Read-only diagnostic output. Copy control intentionally hidden.",
  },
};

export const PreRendered: StoryObj<CodeBlockProps> = {
  parameters: { docs: { source: source(preRenderedSource) } },
  args: {
    lang: "bash",
    filename: "terminal.log",
    code: "npm run build",
    html: '<pre><code><span class="line">npm run build</span></code></pre>',
  },
};
