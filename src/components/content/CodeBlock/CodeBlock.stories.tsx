import type { Meta, StoryObj } from "@storybook/react";
import { CodeBlock } from "./CodeBlock";
import type { CodeBlockProps } from "./CodeBlock";
import { basicUsage } from "../../../stories/basicUsage";

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

export const Default: StoryObj<CodeBlockProps> = {
  parameters: { docs: { source: { code: basicUsage.CodeBlock } } },
};

export const LongFilename: StoryObj<CodeBlockProps> = {
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
  args: {
    lang: "text",
    copyable: false,
    code: "Read-only diagnostic output. Copy control intentionally hidden.",
  },
};

export const PreRendered: StoryObj<CodeBlockProps> = {
  args: {
    lang: "bash",
    filename: "terminal.log",
    code: "npm run build",
    html: '<pre><code><span class="line">npm run build</span></code></pre>',
  },
};
