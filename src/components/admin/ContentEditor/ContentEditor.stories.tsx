import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import {
  ContentEditor,
  EditorShell,
  PairListField,
  RepeaterField,
  StatusSelect,
  TagInput,
} from "./";
import type { ContentEditorProps } from "./";
import { source, tsx } from "../../../stories/source";

const meta: Meta<ContentEditorProps> = {
  title: "Organisms/ContentEditor",
  component: ContentEditor,
  parameters: {
    docs: {
      description: {
        component:
          "ContentEditor is the generic admin editing surface used by the specialized content editors.",
      },
    },
  },
};

export default meta;

const defaultSource = tsx`
import { ContentEditor, EditorShell, PairListField, RepeaterField, StatusSelect, TagInput } from "@sektant1/phosphor-ui";

const defaultProps = {
    kindLabel: "POST",
    fields: [
      { kind: "text", key: "title", label: "TITLE", prompt: "title >" },
      { kind: "textarea", key: "body", label: "BODY", rows: 4 },
      { kind: "tags", key: "tags", label: "TAGS" },
    ],
    initial: {
      title: "Field notes",
      body: "A short operator note.",
      tags: ["field", "draft"],
      status: "draft",
    },
  };

export function Example() {
  return <ContentEditor {...defaultProps} />;
}
`;

const shellSource = tsx`
import { ContentEditor, EditorShell, PairListField, RepeaterField, StatusSelect, TagInput } from "@sektant1/phosphor-ui";

export function Example() {
  return (
      <EditorShell kindLabel="POST" saveLabel="save post">
        <input placeholder="Title" />
      </EditorShell>
    );
}
`;

const fieldPartsSource = tsx`
import { ContentEditor, EditorShell, PairListField, RepeaterField, StatusSelect, TagInput } from "@sektant1/phosphor-ui";



export function Example() {
  return (
      <div style={{ display: "grid", gap: 16, maxWidth: 520 }}>
        <StatusSelect value="draft" onChange={() => {}} />
        <TagInput
          label="TAGS"
          value={["react", "docs"]}
          inputValue=""
          onInputChange={() => {}}
          onChange={() => {}}
        />
        <PairListField
          label="LINKS"
          addLabel="[+ link]"
          columns={[
            { key: "label", placeholder: "label" },
            { key: "url", placeholder: "https://..." },
          ]}
          rows={[{ label: "docs", url: "https://example.com" }]}
          onChange={() => {}}
        />
        <RepeaterField
          label="MODULES"
          addLabel="[+ module]"
          placeholder="module title"
          rows={[{ id: "one", title: "Boot sequence" }]}
          createRow={() => ({ title: "" })}
          getString={(value) => String(value ?? "")}
          onChange={() => {}}
        />
      </div>
    );
}
`;

type Story = StoryObj<ContentEditorProps>;

export const Default: Story = {
  parameters: { docs: { source: source(defaultSource) } },
  args: {
    kindLabel: "POST",
    fields: [
      { kind: "text", key: "title", label: "TITLE", prompt: "title >" },
      { kind: "textarea", key: "body", label: "BODY", rows: 4 },
      { kind: "tags", key: "tags", label: "TAGS" },
    ],
    initial: {
      title: "Field notes",
      body: "A short operator note.",
      tags: ["field", "draft"],
      status: "draft",
    },
  },
};

export const Shell: StoryObj = {
  parameters: {
    docs: {
      source: source(shellSource),
    },
  },
  render: () => (
    <EditorShell kindLabel="POST" saveLabel="save post">
      <input placeholder="Title" />
    </EditorShell>
  ),
};

export const FieldParts: StoryObj = {
  parameters: {
    docs: {
      source: source(fieldPartsSource),
    },
  },
  render: () => (
    <div style={{ display: "grid", gap: 16, maxWidth: 520 }}>
      <StatusSelect value="draft" onChange={() => {}} />
      <TagInput
        label="TAGS"
        value={["react", "docs"]}
        inputValue=""
        onInputChange={() => {}}
        onChange={() => {}}
      />
      <PairListField
        label="LINKS"
        addLabel="[+ link]"
        columns={[
          { key: "label", placeholder: "label" },
          { key: "url", placeholder: "https://..." },
        ]}
        rows={[{ label: "docs", url: "https://example.com" }]}
        onChange={() => {}}
      />
      <RepeaterField
        label="MODULES"
        addLabel="[+ module]"
        placeholder="module title"
        rows={[{ id: "one", title: "Boot sequence" }]}
        createRow={() => ({ title: "" })}
        getString={(value) => String(value ?? "")}
        onChange={() => {}}
      />
    </div>
  ),
};
