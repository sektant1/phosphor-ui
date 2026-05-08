import React, { useEffect, useState, useRef } from "react";
import styles from "./ContentEditor.module.scss";
import { Checkbox } from "../../atoms/Checkbox";
import { Input, Textarea } from "../../atoms/Input/Input";
import { Tabs } from "../../molecules/Tabs";
import { EditorShell } from "./EditorShell";
import { PairListField, type PairRow } from "./PairListField";
import { RepeaterField, type ListRow } from "./RepeaterField";
import { StatusSelect } from "./StatusSelect";
import { TagInput } from "./TagInput";
import { slugify } from "../../../foundations/utils";

export type ContentStatus = "draft" | "published" | "archived";
type EditorState = Record<string, unknown>;

export type FieldSpec =
  | {
      kind: "text";
      key: string;
      label?: string;
      prompt?: string;
      placeholder?: string;
    }
  | {
      kind: "textarea";
      key: string;
      label?: string;
      rows?: number;
      placeholder?: string;
    }
  | {
      kind: "tags";
      key: string;
      label?: string;
      placeholder?: string;
      chip?: "tag" | "outline";
    }
  | {
      kind: "checkbox";
      key: string;
      description: string;
    }
  | {
      kind: "pairs";
      key: string;
      label: string;
      addLabel: string;
      columns: [PairColumn, PairColumn];
    }
  | {
      kind: "list";
      key: string;
      label: string;
      addLabel: string;
      placeholder: string;
      leading?: string;
      itemKey?: string;
    };

export interface PairColumn {
  key: string;
  placeholder: string;
  flex?: string | number;
}

export interface ContentEditorProps<T extends object = Record<string, unknown>> {
  kindLabel: string;
  saveLabel?: string;
  initial?: Partial<T>;
  fields: FieldSpec[];
  status?: boolean;
  autoSlug?: { from: string; to: string };
  onSave?: (data: T) => void;
  onChange?: (data: T) => void;
  onDiscard?: () => void;
  saving?: boolean;
  variant?: "default" | "compact";
  className?: string;
}

const isContentStatus = (value: unknown): value is ContentStatus =>
  value === "draft" || value === "published" || value === "archived";

const asString = (value: unknown) => (typeof value === "string" ? value : "");

const asStringArray = (value: unknown) =>
  Array.isArray(value) ? value.filter((item): item is string => typeof item === "string") : [];

const asPairRows = (value: unknown): PairRow[] =>
  Array.isArray(value)
    ? value.filter(
        (item): item is PairRow =>
          !!item && typeof item === "object" && !Array.isArray(item)
      )
    : [];

const asListRows = (value: unknown): ListRow[] =>
  Array.isArray(value)
    ? value.filter(
        (item): item is ListRow =>
          !!item && typeof item === "object" && !Array.isArray(item)
      )
    : [];

const seedState = (fields: FieldSpec[], initial: Partial<EditorState>) => {
  const state: EditorState = {};
  for (const f of fields) {
    const cur = initial[f.key];
    switch (f.kind) {
      case "text":
      case "textarea":
        state[f.key] = cur ?? "";
        break;
      case "tags":
        state[f.key] = cur ?? [];
        break;
      case "checkbox":
        state[f.key] = cur ?? false;
        break;
      case "pairs":
        state[f.key] = cur ?? [];
        break;
      case "list":
        state[f.key] = cur ?? [];
        break;
    }
  }
  return state;
};

let generatedRowId = 0;

const createRowId = () => {
  generatedRowId += 1;
  return `row-${generatedRowId}`;
};

export function ContentEditor<T extends object = Record<string, unknown>>({
  kindLabel,
  saveLabel,
  initial = {},
  fields,
  status = true,
  autoSlug,
  onSave,
  onChange,
  onDiscard,
  saving = false,
  variant = "default",
  className,
}: ContentEditorProps<T>) {
  const initialState = initial as Partial<EditorState>;
  const [data, setData] = useState<EditorState>(() => seedState(fields, initialState));
  const [statusValue, setStatusValue] = useState<ContentStatus>(
    isContentStatus(initialState.status) ? initialState.status : "draft"
  );
  const [tagInputs, setTagInputs] = useState<Record<string, string>>({});
  const slugTouched = useRef(autoSlug ? !!initialState[autoSlug.to] : false);
  const didMount = useRef(false);

  const toPayload = (next: EditorState, nextStatus: ContentStatus) =>
    ({ ...(next as T), ...(status ? { status: nextStatus } : {}) } as T);

  useEffect(() => {
    if (!didMount.current) {
      didMount.current = true;
      return;
    }
    onChange?.(toPayload(data, statusValue));
  }, [data, onChange, status, statusValue]);

  const update = (key: string, value: unknown) => {
    setData((prev) => {
      const next = { ...prev, [key]: value };
      if (autoSlug && key === autoSlug.from && !slugTouched.current) {
        next[autoSlug.to] = slugify(typeof value === "string" ? value : "");
      }
      return next;
    });
  };

  const updateSlug = (value: string) => {
    slugTouched.current = true;
    setData((prev) => {
      const next = { ...prev, [autoSlug!.to]: value };
      return next;
    });
  };

  const handleSave = () => {
    onSave?.(toPayload(data, statusValue));
  };

  const renderField = (f: FieldSpec) => {
    if (f.kind === "text") {
      const isAutoSlugTarget = autoSlug?.to === f.key;
      const onChangeText = isAutoSlugTarget
        ? (e: React.ChangeEvent<HTMLInputElement>) => updateSlug(e.target.value)
        : (e: React.ChangeEvent<HTMLInputElement>) => update(f.key, e.target.value);
      const inputEl = (
        <Input
          prompt={f.prompt}
          cursor={false}
          placeholder={f.placeholder}
          value={asString(data[f.key])}
          onChange={onChangeText}
        />
      );
      if (!f.label) return <React.Fragment key={f.key}>{inputEl}</React.Fragment>;
      return (
        <div key={f.key} className={styles.field}>
          <span className={styles.fieldLabel}>{f.label}</span>
          {inputEl}
        </div>
      );
    }

    if (f.kind === "textarea") {
      const ta = (
        <Textarea
          rows={f.rows ?? 6}
          placeholder={f.placeholder}
          value={asString(data[f.key])}
          onChange={(e) => update(f.key, e.target.value)}
        />
      );
      if (!f.label) return <React.Fragment key={f.key}>{ta}</React.Fragment>;
      return (
        <div key={f.key} className={styles.field}>
          <span className={styles.fieldLabel}>{f.label}</span>
          {ta}
        </div>
      );
    }

    if (f.kind === "tags") {
      const list = asStringArray(data[f.key]);
      return (
        <TagInput
          key={f.key}
          label={f.label}
          placeholder={f.placeholder}
          chip={f.chip}
          value={list}
          inputValue={tagInputs[f.key] ?? ""}
          onInputChange={(value) =>
            setTagInputs((prev) => ({ ...prev, [f.key]: value }))
          }
          onChange={(next) => update(f.key, next)}
        />
      );
    }

    if (f.kind === "checkbox") {
      return (
        <Checkbox
          key={f.key}
          className={styles.checkRow}
          label={f.description}
          checked={!!data[f.key]}
          onChange={(checked) => update(f.key, checked)}
        />
      );
    }

    if (f.kind === "pairs") {
      const rows = asPairRows(data[f.key]);
      return (
        <PairListField
          key={f.key}
          label={f.label}
          addLabel={f.addLabel}
          columns={f.columns}
          rows={rows}
          onChange={(next) => update(f.key, next)}
        />
      );
    }

    if (f.kind === "list") {
      const itemKey = f.itemKey ?? "title";
      const rows = asListRows(data[f.key]);
      return (
        <RepeaterField
          key={f.key}
          label={f.label}
          addLabel={f.addLabel}
          placeholder={f.placeholder}
          leading={f.leading}
          itemKey={itemKey}
          rows={rows}
          getString={asString}
          createRow={() => ({ id: createRowId(), [itemKey]: "" })}
          onChange={(next) => update(f.key, next)}
        />
      );
    }

    return null;
  };

  return (
    <EditorShell
      kindLabel={kindLabel}
      saveLabel={saveLabel}
      saving={saving}
      variant={variant}
      className={className}
      onDiscard={onDiscard}
      onSave={handleSave}
      statusControl={
        status ? (
          <StatusSelect value={statusValue} onChange={setStatusValue} />
        ) : undefined
      }
    >
      <Tabs
        ariaLabel={`${kindLabel.toLowerCase()} editor views`}
        className={styles.tabs}
        items={[
          {
            id: "editor",
            label: "editor",
            content: <div className={styles.editorPane}>{fields.map(renderField)}</div>,
          },
          {
            id: "preview",
            label: "preview",
            content: (
              <pre className={styles.previewPane}>
                {JSON.stringify(toPayload(data, statusValue), null, 2)}
              </pre>
            ),
          },
        ]}
      />
    </EditorShell>
  );
}
