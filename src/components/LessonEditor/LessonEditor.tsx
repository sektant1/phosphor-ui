import React, { useState, KeyboardEvent } from "react";
import styles from "./LessonEditor.module.scss";
import { Input, Textarea } from "../Input/Input";
import { Button } from "../Button/Button";

export type ContentStatus = "draft" | "published" | "archived";

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
  onDiscard?: () => void;
  saving?: boolean;
  className?: string;
}

function slugify(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/[\s]+/g, "-");
}

export const LessonEditor: React.FC<LessonEditorProps> = ({
  initial = {},
  onSave,
  onDiscard,
  saving = false,
  className,
}) => {
  const [title, setTitle] = useState(initial.title ?? "");
  const [slug, setSlug] = useState(initial.slug ?? "");
  const [slugTouched, setSlugTouched] = useState(!!initial.slug);
  const [body, setBody] = useState(initial.body ?? "");
  const [duration, setDuration] = useState(initial.duration ?? "");
  const [videoUrl, setVideoUrl] = useState(initial.videoUrl ?? "");
  const [tags, setTags] = useState<string[]>(initial.tags ?? []);
  const [tagInput, setTagInput] = useState("");
  const [resources, setResources] = useState<LessonResource[]>(initial.resources ?? []);
  const [status, setStatus] = useState<ContentStatus>(initial.status ?? "draft");
  const [free, setFree] = useState(initial.free ?? false);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setTitle(val);
    if (!slugTouched) {
      setSlug(slugify(val));
    }
  };

  const handleSlugChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSlugTouched(true);
    setSlug(e.target.value);
  };

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

  const addResource = () => {
    setResources([...resources, { label: "", url: "" }]);
  };

  const updateResource = (index: number, field: keyof LessonResource, value: string) => {
    setResources(resources.map((r, i) => (i === index ? { ...r, [field]: value } : r)));
  };

  const removeResource = (index: number) => {
    setResources(resources.filter((_, i) => i !== index));
  };

  const handleSave = () => {
    onSave?.({ title, slug, body, duration, videoUrl, tags, resources, status, free });
  };

  return (
    <div className={[styles.card, className ?? ""].filter(Boolean).join(" ")}>
      <div className={styles.header}>
        <span className={styles.label}>LESSON</span>
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

      <div className={styles.fieldGroup}>
        <span className={styles.fieldLabel}>TITLE</span>
        <Input
          prompt="title >"
          cursor={false}
          value={title}
          onChange={handleTitleChange}
        />
      </div>

      <div className={styles.fieldGroup}>
        <span className={styles.fieldLabel}>SLUG</span>
        <Input
          prompt="slug >"
          cursor={false}
          value={slug}
          onChange={handleSlugChange}
        />
      </div>

      <div className={styles.fieldGroup}>
        <span className={styles.fieldLabel}>DURATION</span>
        <Input
          prompt="duration >"
          cursor={false}
          placeholder="12m"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
        />
      </div>

      <div className={styles.fieldGroup}>
        <span className={styles.fieldLabel}>VIDEO URL</span>
        <Input
          prompt="video >"
          cursor={false}
          placeholder="https://..."
          value={videoUrl}
          onChange={(e) => setVideoUrl(e.target.value)}
        />
      </div>

      <div className={styles.fieldGroup}>
        <span className={styles.fieldLabel}>BODY</span>
        <Textarea
          rows={8}
          placeholder="lesson body, markdown OK"
          value={body}
          onChange={(e) => setBody(e.target.value)}
        />
      </div>

      <div className={styles.tagsSection}>
        <span className={styles.fieldLabel}>TAGS</span>
        <div className={styles.tagsRow}>
          {tags.map((tag) => (
            <span
              key={tag}
              className={styles.tagChip}
              onClick={() => removeTag(tag)}
            >
              {tag} ×
            </span>
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

      <div className={styles.resourcesSection}>
        <span className={styles.fieldLabel}>RESOURCES</span>
        {resources.map((resource, i) => (
          <div key={i} className={styles.resourceRow}>
            <input
              className={styles.resourceInput}
              style={{ flex: "0 0 100px" }}
              placeholder="label"
              value={resource.label}
              onChange={(e) => updateResource(i, "label", e.target.value)}
            />
            <input
              className={styles.resourceInput}
              style={{ flex: 1 }}
              placeholder="https://..."
              value={resource.url}
              onChange={(e) => updateResource(i, "url", e.target.value)}
            />
            <button
              type="button"
              className={styles.removeResource}
              onClick={() => removeResource(i)}
            >
              ×
            </button>
          </div>
        ))}
        <Button variant="ghost" size="sm" type="button" onClick={addResource}>
          [+ resource]
        </Button>
      </div>

      <label className={styles.freeRow}>
        <input
          type="checkbox"
          checked={free}
          onChange={(e) => setFree(e.target.checked)}
          className={styles.freeCheck}
        />
        free preview
      </label>

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
          {saving ? "saving..." : "save lesson"}
        </Button>
      </div>
    </div>
  );
};
