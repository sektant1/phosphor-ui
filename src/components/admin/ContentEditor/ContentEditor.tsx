import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import styles from "./ContentEditor.module.scss";
import { Checkbox } from "../../atoms/Checkbox";
import { InputControl, TextareaControl } from "../../atoms/Input/Input";
import { Tabs } from "../../molecules/Tabs";
import { EditorShell } from "./EditorShell";
import { PairListField, type PairRow } from "./PairListField";
import { RepeaterField, type ListRow } from "./RepeaterField";
import { StatusSelect } from "./StatusSelect";
import { TagInput } from "./TagInput";
import { slugify } from "../../../foundations/utils";
import { Stack } from "../../templates/Layout";
import Text from "../../atoms/Text";
import Prose from "../../content/Prose";

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
  preview?: (data: T) => React.ReactNode;
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

const countFilledFields = (fields: FieldSpec[], data: EditorState) =>
  fields.reduce((count, field) => {
    const value = data[field.key];
    if (Array.isArray(value)) return count + (value.length > 0 ? 1 : 0);
    if (typeof value === "boolean") return count + (value ? 1 : 0);
    if (typeof value === "string") return count + (value.trim() ? 1 : 0);
    return count + (value ? 1 : 0);
  }, 0);

const getFieldLabel = (field: FieldSpec) =>
  "label" in field && field.label ? field.label : field.key.replace(/([A-Z])/g, " $1").toUpperCase();

const imagePattern = /^!\[([^\]]*)]\(([^)\s]+)(?:\s+"([^"]+)")?\)$/;

const queueSelection = (
  node: HTMLTextAreaElement,
  start: number,
  end: number,
) => {
  const queue =
    typeof window !== "undefined" && window.requestAnimationFrame
      ? window.requestAnimationFrame
      : (callback: FrameRequestCallback) => window.setTimeout(callback, 0);
  queue(() => node.setSelectionRange(start, end));
};

const insertTabInTextarea = (
  event: React.KeyboardEvent<HTMLTextAreaElement>,
  onValue: (value: string) => void,
) => {
  if (event.key !== "Tab") return;
  event.preventDefault();
  const target = event.currentTarget;
  const tab = "  ";
  const start = target.selectionStart;
  const end = target.selectionEnd;
  const next = `${target.value.slice(0, start)}${tab}${target.value.slice(end)}`;
  onValue(next);
  queueSelection(target, start + tab.length, start + tab.length);
};

const renderInlineMarkdown = (text: string) => {
  const parts: React.ReactNode[] = [];
  const pattern = /(`[^`]+`|\*\*[^*]+\*\*|\[[^\]]+]\([^)]+\))/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = pattern.exec(text))) {
    if (match.index > lastIndex) parts.push(text.slice(lastIndex, match.index));
    const token = match[0];
    if (token.startsWith("`")) {
      parts.push(<code key={match.index}>{token.slice(1, -1)}</code>);
    } else if (token.startsWith("**")) {
      parts.push(<strong key={match.index}>{token.slice(2, -2)}</strong>);
    } else {
      const link = /^\[([^\]]+)]\(([^)]+)\)$/.exec(token);
      parts.push(link ? <a key={match.index} href={link[2]}>{link[1]}</a> : token);
    }
    lastIndex = match.index + token.length;
  }

  if (lastIndex < text.length) parts.push(text.slice(lastIndex));
  return parts.length ? parts : text;
};

const MarkdownPreview: React.FC<{ value: string }> = ({ value }) => {
  const lines = value.split(/\r?\n/);
  const nodes: React.ReactNode[] = [];
  let paragraph: string[] = [];
  let list: string[] = [];
  let listOrdered = false;

  const flushParagraph = () => {
    if (!paragraph.length) return;
    nodes.push(<p key={`p-${nodes.length}`}>{renderInlineMarkdown(paragraph.join(" "))}</p>);
    paragraph = [];
  };

  const flushList = () => {
    if (!list.length) return;
    const items = list.map((item, index) => (
      <li key={`${item}-${index}`}>{renderInlineMarkdown(item)}</li>
    ));
    nodes.push(
      listOrdered ? (
        <ol key={`ol-${nodes.length}`}>{items}</ol>
      ) : (
        <ul key={`ul-${nodes.length}`}>{items}</ul>
      ),
    );
    list = [];
  };

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed) {
      flushParagraph();
      flushList();
      continue;
    }

    const image = imagePattern.exec(trimmed);
    if (image) {
      flushParagraph();
      flushList();
      nodes.push(
        <figure key={`img-${nodes.length}`} className="pho-mdx-figure">
          <img src={image[2]} alt={image[1]} loading="lazy" />
          {image[1] ? <figcaption>{image[1]}</figcaption> : null}
        </figure>,
      );
      continue;
    }

    const heading = /^(#{1,3})\s+(.+)$/.exec(trimmed);
    if (heading) {
      flushParagraph();
      flushList();
      const level = heading[1].length + 1;
      nodes.push(React.createElement(`h${level}`, { key: `h-${nodes.length}` }, renderInlineMarkdown(heading[2])));
      continue;
    }

    const unordered = /^[-*]\s+(.+)$/.exec(trimmed);
    const ordered = /^\d+[.)]\s+(.+)$/.exec(trimmed);
    if (unordered || ordered) {
      flushParagraph();
      if (list.length && listOrdered !== !!ordered) flushList();
      listOrdered = !!ordered;
      list.push((unordered ?? ordered)![1]);
      continue;
    }

    flushList();
    paragraph.push(trimmed);
  }

  flushParagraph();
  flushList();

  return <Prose className={styles.markdownPreview}>{nodes.length ? nodes : value}</Prose>;
};

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
  preview,
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
  const [copiedRaw, setCopiedRaw] = useState(false);
  const [rawDraft, setRawDraft] = useState("");
  const [rawError, setRawError] = useState<string>();
  const slugTouched = useRef(autoSlug ? !!initialState[autoSlug.to] : false);
  const didMount = useRef(false);
  const rawFocused = useRef(false);

  const toPayload = useCallback(
    (next: EditorState, nextStatus: ContentStatus) =>
      ({ ...(next as T), ...(status ? { status: nextStatus } : {}) } as T),
    [status],
  );

  const payload = useMemo(() => toPayload(data, statusValue), [data, statusValue, toPayload]);
  const rawJson = useMemo(() => JSON.stringify(payload, null, 2), [payload]);
  const filledFields = useMemo(() => countFilledFields(fields, data), [data, fields]);
  const totalFields = fields.length + (status ? 1 : 0);

  useEffect(() => {
    if (!rawFocused.current) setRawDraft(rawJson);
  }, [rawJson]);

  useEffect(() => {
    if (!didMount.current) {
      didMount.current = true;
      return;
    }
    onChange?.(payload);
  }, [onChange, payload]);

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
    onSave?.(payload);
  };

  const copyRaw = async () => {
    if (typeof navigator === "undefined" || !navigator.clipboard) return;
    await navigator.clipboard.writeText(rawJson);
    setCopiedRaw(true);
    window.setTimeout(() => setCopiedRaw(false), 1200);
  };

  const updateRawDraft = (value: string) => {
    setRawDraft(value);
    try {
      const parsed = JSON.parse(value) as unknown;
      if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
        setRawError("Raw payload must be a JSON object.");
        return;
      }
      const next = { ...(parsed as EditorState) };
      if (status && isContentStatus(next.status)) {
        setStatusValue(next.status);
        delete next.status;
      }
      setData(next);
      setRawError(undefined);
    } catch {
      setRawError("Invalid JSON.");
    }
  };

  const renderField = (f: FieldSpec) => {
    if (f.kind === "text") {
      const isAutoSlugTarget = autoSlug?.to === f.key;
      const onChangeText = isAutoSlugTarget
        ? (e: React.ChangeEvent<HTMLInputElement>) => updateSlug(e.target.value)
        : (e: React.ChangeEvent<HTMLInputElement>) => update(f.key, e.target.value);
      const inputEl = (
        <InputControl
          prompt={f.prompt}
          placeholder={f.placeholder}
          value={asString(data[f.key])}
          onChange={onChangeText}
        />
      );
      if (!f.label) return <React.Fragment key={f.key}>{inputEl}</React.Fragment>;
      return (
        <Stack key={f.key} className={styles.field} gap="xs">
          <Text variant="caption" className={styles.fieldLabel}>{f.label}</Text>
          {inputEl}
        </Stack>
      );
    }

    if (f.kind === "textarea") {
      const ta = (
        <TextareaControl
          rows={f.rows ?? 6}
          placeholder={f.placeholder}
          value={asString(data[f.key])}
          onChange={(e) => update(f.key, e.target.value)}
          onKeyDown={(e) =>
            insertTabInTextarea(e, (value) => update(f.key, value))
          }
        />
      );
      if (!f.label) return <React.Fragment key={f.key}>{ta}</React.Fragment>;
      return (
        <Stack key={f.key} className={styles.field} gap="xs">
          <Text variant="caption" className={styles.fieldLabel}>{f.label}</Text>
          {ta}
        </Stack>
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

  const renderPreviewValue = (f: FieldSpec) => {
    const value = data[f.key];

    if (f.kind === "tags") {
      const tags = asStringArray(value);
      return tags.length ? (
        <div className={styles.previewTags}>
          {tags.map((tag) => <span key={tag} className={styles.previewTag}>{tag}</span>)}
        </div>
      ) : (
        <span className={styles.previewEmpty}>No tags</span>
      );
    }

    if (f.kind === "checkbox") {
      return <span className={styles.previewBoolean}>{value ? "enabled" : "disabled"}</span>;
    }

    if (f.kind === "pairs") {
      const rows = asPairRows(value);
      return rows.length ? (
        <div className={styles.previewList}>
          {rows.map((row, index) => (
            <div key={index} className={styles.previewRow}>
              {f.columns.map((column) => (
                <span key={column.key}>{row[column.key] || column.placeholder}</span>
              ))}
            </div>
          ))}
        </div>
      ) : (
        <span className={styles.previewEmpty}>No rows</span>
      );
    }

    if (f.kind === "list") {
      const rows = asListRows(value);
      const itemKey = f.itemKey ?? "title";
      return rows.length ? (
        <ol className={styles.previewOrdered}>
          {rows.map((row, index) => (
            <li key={row.id ?? index}>{asString(row[itemKey]) || f.placeholder}</li>
          ))}
        </ol>
      ) : (
        <span className={styles.previewEmpty}>No items</span>
      );
    }

    const text = asString(value);
    if (!text.trim()) return <span className={styles.previewEmpty}>Empty</span>;
    return f.kind === "textarea" ? (
      <MarkdownPreview value={text} />
    ) : (
      <span>{text}</span>
    );
  };

  const defaultPreview = (
    <div className={styles.previewSurface}>
      <Stack className={styles.previewHero} gap="xs">
        <Text variant="stamp" className={styles.previewKind}>{kindLabel}</Text>
        <Text variant="h3" className={styles.previewTitle}>
          {asString(data.title) || asString(data.name) || "Untitled content"}
        </Text>
        {status && <span className={styles.previewStatus}>{statusValue}</span>}
      </Stack>

      <div className={styles.previewGrid}>
        {fields.map((field) => (
          <section key={field.key} className={styles.previewField}>
            <Text variant="caption" className={styles.previewLabel}>{getFieldLabel(field)}</Text>
            <div className={styles.previewValue}>{renderPreviewValue(field)}</div>
          </section>
        ))}
      </div>
    </div>
  );

  return (
    <EditorShell
      kindLabel={kindLabel}
      saveLabel={saveLabel}
      saving={saving}
      variant={variant}
      className={className}
      meta={`${filledFields}/${totalFields} fields`}
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
            id: "edit",
            label: "edit",
            content: <Stack className={styles.editorPane} gap="lg">{fields.map(renderField)}</Stack>,
          },
          {
            id: "preview",
            label: "preview",
            content: preview ? preview(payload) : defaultPreview,
          },
          {
            id: "raw",
            label: "raw",
            content: (
              <Stack className={styles.rawPane} gap="sm">
                <div className={styles.rawToolbar}>
                  <Text variant="caption" className={styles.rawLabel}>JSON payload</Text>
                  <button type="button" className={styles.rawCopy} onClick={copyRaw}>
                    {copiedRaw ? "copied" : "copy"}
                  </button>
                </div>
                <TextareaControl
                  className={styles.rawEditor}
                  textareaClassName={styles.rawTextarea}
                  aria-label="JSON payload"
                  value={rawDraft}
                  rows={16}
                  spellCheck={false}
                  onFocus={() => {
                    rawFocused.current = true;
                  }}
                  onBlur={() => {
                    rawFocused.current = false;
                    if (!rawError) setRawDraft(rawJson);
                  }}
                  onChange={(event) => updateRawDraft(event.currentTarget.value)}
                  onKeyDown={(event) => insertTabInTextarea(event, updateRawDraft)}
                  aria-invalid={!!rawError || undefined}
                />
                {rawError ? (
                  <Text variant="caption" className={styles.rawError}>
                    [!] {rawError}
                  </Text>
                ) : null}
              </Stack>
            ),
          },
        ]}
      />
    </EditorShell>
  );
}
