import React, { useEffect, useState, useRef, KeyboardEvent } from "react";
import styles from "./ContentEditor.module.scss";
import { Input, Textarea } from "../Input/Input";
import { Button } from "../Button/Button";
import { Tag } from "../Tag/Tag";
import { cx } from "../../utils/classNames";

export type ContentStatus = "draft" | "published" | "archived";
type EditorState = Record<string, unknown>;
type PairRow = Record<string, string>;
type ListRow = Record<string, unknown> & { id?: string };

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

const slugify = (value: string) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");

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

  const setStatus = (v: ContentStatus) => {
    setStatusValue(v);
  };

  const handleSave = () => {
    onSave?.(toPayload(data, statusValue));
  };

  const handleTagKeyDown = (key: string) => (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== "Enter") return;
    e.preventDefault();
    const current = (tagInputs[key] ?? "").trim();
    if (!current) return;
    const list = asStringArray(data[key]);
    if (list.includes(current)) {
      setTagInputs((p) => ({ ...p, [key]: "" }));
      return;
    }
    update(key, [...list, current]);
    setTagInputs((p) => ({ ...p, [key]: "" }));
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
      const remove = (t: string) => update(f.key, list.filter((x) => x !== t));
      return (
        <div key={f.key} className={styles.tagsSection}>
          {f.label && <span className={styles.fieldLabel}>{f.label}</span>}
          <div className={styles.tagsRow}>
            {list.map((tag) =>
              f.chip === "tag" ? (
                <Tag key={tag} color="phosphor">
                  {tag}
                  <button
                    type="button"
                    className={styles.removeTag}
                    onClick={() => remove(tag)}
                    aria-label={`Remove ${tag}`}
                  >
                    ×
                  </button>
                </Tag>
              ) : (
                <button
                  type="button"
                  key={tag}
                  className={styles.tagChip}
                  onClick={() => remove(tag)}
                  aria-label={`Remove ${tag}`}
                >
                  {tag} ×
                </button>
              )
            )}
            <input
              className={styles.tagInput}
              value={tagInputs[f.key] ?? ""}
              onChange={(e) =>
                setTagInputs((p) => ({ ...p, [f.key]: e.target.value }))
              }
              onKeyDown={handleTagKeyDown(f.key)}
              placeholder={f.placeholder ?? "add tag..."}
            />
          </div>
        </div>
      );
    }

    if (f.kind === "checkbox") {
      return (
        <label key={f.key} className={styles.checkRow}>
          <input
            type="checkbox"
            className={styles.check}
            checked={!!data[f.key]}
            onChange={(e) => update(f.key, e.target.checked)}
          />
          {f.description}
        </label>
      );
    }

    if (f.kind === "pairs") {
      const rows = asPairRows(data[f.key]);
      const setRows = (next: PairRow[]) => update(f.key, next);
      const blank = f.columns.reduce<PairRow>((acc, c) => {
        acc[c.key] = "";
        return acc;
      }, {});
      return (
        <div key={f.key} className={styles.pairsSection}>
          <span className={styles.fieldLabel}>{f.label}</span>
          {rows.map((row, i) => (
            <div key={i} className={styles.pairRow}>
              {f.columns.map((col) => (
                <input
                  key={col.key}
                  className={styles.pairInput}
                  style={{ flex: col.flex ?? 1 }}
                  placeholder={col.placeholder}
                  value={row[col.key] ?? ""}
                  onChange={(e) =>
                    setRows(
                      rows.map((r, j) =>
                        j === i ? { ...r, [col.key]: e.target.value } : r
                      )
                    )
                  }
                />
              ))}
              <button
                type="button"
                className={styles.removeRow}
                onClick={() => setRows(rows.filter((_, j) => j !== i))}
                aria-label={`Remove ${f.label.toLowerCase()} row ${i + 1}`}
              >
                ×
              </button>
            </div>
          ))}
          <Button
            variant="ghost"
            size="sm"
            type="button"
            onClick={() => setRows([...rows, blank])}
          >
            {f.addLabel}
          </Button>
        </div>
      );
    }

    if (f.kind === "list") {
      const itemKey = f.itemKey ?? "title";
      const rows = asListRows(data[f.key]);
      const setRows = (next: ListRow[]) => update(f.key, next);
      return (
        <div key={f.key} className={styles.listSection}>
          <span className={styles.fieldLabel}>{f.label}</span>
          {rows.map((row, i) => (
            <div key={row.id ?? i} className={styles.listRow}>
              {f.leading && <span className={styles.leading}>{f.leading}</span>}
              <input
                className={styles.listInput}
                placeholder={f.placeholder}
                value={asString(row[itemKey])}
                onChange={(e) =>
                  setRows(
                    rows.map((r, j) =>
                      j === i ? { ...r, [itemKey]: e.target.value } : r
                    )
                  )
                }
              />
              <button
                type="button"
                className={styles.removeRow}
                onClick={() => setRows(rows.filter((_, j) => j !== i))}
                aria-label={`Remove ${f.label.toLowerCase()} item ${i + 1}`}
              >
                ×
              </button>
            </div>
          ))}
          <Button
            variant="ghost"
            size="sm"
            type="button"
            onClick={() =>
              setRows([
                ...rows,
                { id: createRowId(), [itemKey]: "" },
              ])
            }
          >
            {f.addLabel}
          </Button>
        </div>
      );
    }

    return null;
  };

  return (
    <div className={cx(styles.card, variant === "compact" && styles.compact, className)}>
      <div className={styles.header}>
        <span className={styles.label}>{kindLabel}</span>
        {status && (
          <select
            className={styles.statusSelect}
            value={statusValue}
            onChange={(e) => setStatus(e.target.value as ContentStatus)}
          >
            <option value="draft">draft</option>
            <option value="published">published</option>
            <option value="archived">archived</option>
          </select>
        )}
      </div>

      {fields.map(renderField)}

      <div className={styles.footer}>
        <Button variant="ghost" size="sm" onClick={onDiscard} type="button">
          discard
        </Button>
        <Button
          variant="primary"
          size="sm"
          onClick={handleSave}
          disabled={saving}
          type="button"
        >
          {saving ? "saving..." : saveLabel ?? "save"}
        </Button>
      </div>
    </div>
  );
}
