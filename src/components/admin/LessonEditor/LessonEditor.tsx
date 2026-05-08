import React from "react";
import { ContentEditor } from "../../admin/ContentEditor/ContentEditor";
import type { ContentStatus, FieldSpec } from "../../admin/ContentEditor/ContentEditor";

export type { ContentStatus };

export interface LessonResource {
  label: string;
  url: string;
}

export interface LessonData {
  title: string;
  slug: string;
  body: string;
  duration: string;
  videoUrl: string;
  tags: string[];
  resources: LessonResource[];
  status: ContentStatus;
  free: boolean;
}

export interface LessonEditorProps {
  initial?: Partial<LessonData>;
  onSave?: (data: LessonData) => void;
  onChange?: (data: LessonData) => void;
  onDiscard?: () => void;
  saving?: boolean;
  className?: string;
}

const FIELDS: FieldSpec[] = [
  { kind: "text", key: "title", label: "TITLE", prompt: "title >" },
  { kind: "text", key: "slug", label: "SLUG", prompt: "slug >" },
  { kind: "text", key: "duration", label: "DURATION", prompt: "duration >", placeholder: "12m" },
  { kind: "text", key: "videoUrl", label: "VIDEO URL", prompt: "video >", placeholder: "https://..." },
  { kind: "textarea", key: "body", label: "BODY", rows: 8, placeholder: "lesson body, markdown OK" },
  { kind: "tags", key: "tags", label: "TAGS" },
  {
    kind: "pairs",
    key: "resources",
    label: "RESOURCES",
    addLabel: "[+ resource]",
    columns: [
      { key: "label", placeholder: "label", flex: "0 0 100px" },
      { key: "url", placeholder: "https://...", flex: 1 },
    ],
  },
  { kind: "checkbox", key: "free", description: "free preview" },
];

export const LessonEditor: React.FC<LessonEditorProps> = (props) => (
  <ContentEditor<LessonData>
    kindLabel="LESSON"
    saveLabel="save lesson"
    fields={FIELDS}
    autoSlug={{ from: "title", to: "slug" }}
    {...props}
  />
);
