import React from "react";
import { ContentEditor } from "../ContentEditor/ContentEditor";
import type { ContentStatus, FieldSpec } from "../ContentEditor/ContentEditor";

export type { ContentStatus };

export interface CourseModule {
  id: string;
  title: string;
  description?: string;
}

export interface CourseData {
  title: string;
  slug: string;
  tagline: string;
  description: string;
  tags: string[];
  modules: CourseModule[];
  status: ContentStatus;
  price: string;
  featured: boolean;
}

export interface CourseEditorProps {
  initial?: Partial<CourseData>;
  onSave?: (data: CourseData) => void;
  onChange?: (data: CourseData) => void;
  onDiscard?: () => void;
  saving?: boolean;
  className?: string;
}

const FIELDS: FieldSpec[] = [
  { kind: "text", key: "title", label: "TITLE", prompt: "title >", placeholder: "course title" },
  { kind: "text", key: "slug", label: "SLUG", prompt: "slug >", placeholder: "my-course" },
  { kind: "text", key: "tagline", label: "TAGLINE", prompt: "tagline >", placeholder: "short sell line" },
  { kind: "textarea", key: "description", label: "DESCRIPTION", rows: 4, placeholder: "course overview" },
  { kind: "text", key: "price", label: "PRICE", prompt: "price >", placeholder: "free or 49.00" },
  { kind: "tags", key: "tags", label: "TAGS" },
  {
    kind: "list",
    key: "modules",
    label: "MODULES",
    addLabel: "[+ module]",
    placeholder: "module title",
    leading: "⠿",
    itemKey: "title",
  },
  { kind: "checkbox", key: "featured", description: "feature on homepage" },
];

export const CourseEditor: React.FC<CourseEditorProps> = (props) => (
  <ContentEditor<CourseData>
    kindLabel="COURSE"
    saveLabel="save course"
    fields={FIELDS}
    autoSlug={{ from: "title", to: "slug" }}
    {...props}
  />
);
