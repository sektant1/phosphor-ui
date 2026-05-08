import React from "react";
import { ContentEditor } from "../../admin/ContentEditor/ContentEditor";
import type { ContentStatus, FieldSpec } from "../../admin/ContentEditor/ContentEditor";

export type { ContentStatus };

export interface NoteData {
  title: string;
  body: string;
  tags: string[];
  status: ContentStatus;
}

export interface NoteEditorProps {
  initial?: Partial<NoteData>;
  onSave?: (data: NoteData) => void;
  onChange?: (data: NoteData) => void;
  onDiscard?: () => void;
  saving?: boolean;
  className?: string;
}

const FIELDS: FieldSpec[] = [
  { kind: "text", key: "title", prompt: "title >", placeholder: "note title..." },
  { kind: "textarea", key: "body", rows: 8, placeholder: "write here..." },
  { kind: "tags", key: "tags", chip: "tag" },
];

export const NoteEditor: React.FC<NoteEditorProps> = (props) => (
  <ContentEditor<NoteData>
    kindLabel="NOTE"
    saveLabel="save note"
    fields={FIELDS}
    variant="compact"
    {...props}
  />
);
