import React, { useState, KeyboardEvent } from "react";
import styles from "./NoteEditor.module.scss";
import { Input, Textarea } from "../Input/Input";
import { Button } from "../Button/Button";
import { Tag } from "../Tag/Tag";

export type ContentStatus = "draft" | "published" | "archived";

export interface NoteData {
  title: string;
  body: string;
  tags: string[];
  status: ContentStatus;
}

export interface NoteEditorProps {
  initial?: Partial<NoteData>;
  onSave?: (data: NoteData) => void;
  onDiscard?: () => void;
  saving?: boolean;
  className?: string;
}

export const NoteEditor: React.FC<NoteEditorProps> = ({
  initial = {},
  onSave,
  onDiscard,
  saving = false,
  className,
}) => {
  const [title, setTitle] = useState(initial.title ?? "");
  const [body, setBody] = useState(initial.body ?? "");
  const [tags, setTags] = useState<string[]>(initial.tags ?? []);
  const [status, setStatus] = useState<ContentStatus>(initial.status ?? "draft");
  const [tagInput, setTagInput] = useState("");

  const handleTagKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const trimmed = tagInput.trim();
      if (trimmed && !tags.includes(trimmed)) {
        setTags([...tags, trimmed]);
      }
      setTagInput("");
    }
  };

  const removeTag = (tag: string) => {
    setTags(tags.filter((t) => t !== tag));
  };

  const handleSave = () => {
    onSave?.({ title, body, tags, status });
  };

  return (
    <div className={[styles.card, className ?? ""].filter(Boolean).join(" ")}>
      <div className={styles.header}>
        <span className={styles.label}>NOTE</span>
        <select
          className={styles.statusSelect}
          value={status}
          onChange={(e) => setStatus(e.target.value as ContentStatus)}
        >
          <option value="draft">draft</option>
          <option value="published">published</option>
          <option value="archived">archived</option>
        </select>
      </div>

      <Input
        prompt="title >"
        cursor={false}
        placeholder="note title..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <Textarea
        rows={8}
        placeholder="write here..."
        value={body}
        onChange={(e) => setBody(e.target.value)}
      />

      <div className={styles.tagsSection}>
        <div className={styles.tagsRow}>
          {tags.map((tag) => (
            <Tag key={tag} color="phosphor">
              {tag}
              <button
                className={styles.removeTag}
                onClick={() => removeTag(tag)}
                type="button"
              >
                ×
              </button>
            </Tag>
          ))}
          <input
            className={styles.tagInput}
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            onKeyDown={handleTagKeyDown}
            placeholder="add tag..."
          />
        </div>
      </div>

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
          {saving ? "saving..." : "save note"}
        </Button>
      </div>
    </div>
  );
};
