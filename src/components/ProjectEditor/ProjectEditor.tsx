import React from "react";
import { ContentEditor } from "../ContentEditor/ContentEditor";
import type { ContentStatus, FieldSpec } from "../ContentEditor/ContentEditor";

export type { ContentStatus };

export interface ProjectLink {
  label: string;
  url: string;
}

export interface ProjectData {
  title: string;
  slug: string;
  description: string;
  body: string;
  tags: string[];
  links: ProjectLink[];
  status: ContentStatus;
  featured: boolean;
}

export interface ProjectEditorProps {
  initial?: Partial<ProjectData>;
  onSave?: (data: ProjectData) => void;
  onChange?: (data: ProjectData) => void;
  onDiscard?: () => void;
  saving?: boolean;
  className?: string;
}

const FIELDS: FieldSpec[] = [
  { kind: "text", key: "title", prompt: "title >", placeholder: "project name" },
  { kind: "text", key: "slug", prompt: "slug >", placeholder: "my-project" },
  { kind: "text", key: "description", prompt: "desc >", placeholder: "one-line summary" },
  { kind: "textarea", key: "body", rows: 6, placeholder: "extended write-up, markdown OK" },
  { kind: "tags", key: "tags", label: "TAGS" },
  {
    kind: "pairs",
    key: "links",
    label: "LINKS",
    addLabel: "[+ link]",
    columns: [
      { key: "label", placeholder: "label", flex: "0 0 90px" },
      { key: "url", placeholder: "https://...", flex: 1 },
    ],
  },
  { kind: "checkbox", key: "featured", description: "feature on homepage" },
];

export const ProjectEditor: React.FC<ProjectEditorProps> = (props) => (
  <ContentEditor<ProjectData>
    kindLabel="PROJECT"
    saveLabel="save project"
    fields={FIELDS}
    autoSlug={{ from: "title", to: "slug" }}
    {...props}
  />
);
