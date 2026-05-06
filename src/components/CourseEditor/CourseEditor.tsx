import React, { useState, KeyboardEvent } from "react";
import styles from "./CourseEditor.module.scss";
import { Input, Textarea } from "../Input/Input";
import { Button } from "../Button/Button";

export type ContentStatus = "draft" | "published" | "archived";

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

export const CourseEditor: React.FC<CourseEditorProps> = ({
  initial = {},
  onSave,
  onDiscard,
  saving = false,
  className,
}) => {
  const [title, setTitle] = useState(initial.title ?? "");
  const [slug, setSlug] = useState(initial.slug ?? "");
  const [slugTouched, setSlugTouched] = useState(!!initial.slug);
  const [tagline, setTagline] = useState(initial.tagline ?? "");
  const [description, setDescription] = useState(initial.description ?? "");
  const [tags, setTags] = useState<string[]>(initial.tags ?? []);
  const [tagInput, setTagInput] = useState("");
  const [modules, setModules] = useState<CourseModule[]>(initial.modules ?? []);
  const [status, setStatus] = useState<ContentStatus>(initial.status ?? "draft");
  const [price, setPrice] = useState(initial.price ?? "");
  const [featured, setFeatured] = useState(initial.featured ?? false);

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

  const addModule = () => {
    setModules([...modules, { id: Date.now().toString(), title: "" }]);
  };

  const updateModuleTitle = (id: string, value: string) => {
    setModules(modules.map((m) => (m.id === id ? { ...m, title: value } : m)));
  };

  const removeModule = (id: string) => {
    setModules(modules.filter((m) => m.id !== id));
  };

  const handleSave = () => {
    onSave?.({ title, slug, tagline, description, tags, modules, status, price, featured });
  };

  return (
    <div className={[styles.card, className ?? ""].filter(Boolean).join(" ")}>
      <div className={styles.header}>
        <span className={styles.label}>COURSE</span>
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

      <div className={styles.field}>
        <span className={styles.fieldLabel}>TITLE</span>
        <Input
          prompt="title >"
          cursor={false}
          placeholder="course title"
          value={title}
          onChange={handleTitleChange}
        />
      </div>

      <div className={styles.field}>
        <span className={styles.fieldLabel}>SLUG</span>
        <Input
          prompt="slug >"
          cursor={false}
          placeholder="my-course"
          value={slug}
          onChange={handleSlugChange}
        />
      </div>

      <div className={styles.field}>
        <span className={styles.fieldLabel}>TAGLINE</span>
        <Input
          prompt="tagline >"
          cursor={false}
          placeholder="short sell line"
          value={tagline}
          onChange={(e) => setTagline(e.target.value)}
        />
      </div>

      <div className={styles.field}>
        <span className={styles.fieldLabel}>DESCRIPTION</span>
        <Textarea
          rows={4}
          placeholder="course overview"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      <div className={styles.field}>
        <span className={styles.fieldLabel}>PRICE</span>
        <Input
          prompt="price >"
          cursor={false}
          placeholder="free or 49.00"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
      </div>

      <div className={styles.tagsSection}>
        <span className={styles.fieldLabel}>TAGS</span>
        <div className={styles.tagsRow}>
          {tags.map((tag) => (
            <span key={tag} className={styles.tagChip} onClick={() => removeTag(tag)}>
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

      <div className={styles.modulesSection}>
        <span className={styles.sectionHeader}>MODULES</span>
        <div className={styles.moduleList}>
          {modules.map((mod) => (
            <div key={mod.id} className={styles.moduleRow}>
              <span className={styles.dragHandle}>⠿</span>
              <input
                className={styles.moduleInput}
                value={mod.title}
                onChange={(e) => updateModuleTitle(mod.id, e.target.value)}
                placeholder="module title"
              />
              <button
                type="button"
                className={styles.removeModule}
                onClick={() => removeModule(mod.id)}
              >
                ×
              </button>
            </div>
          ))}
        </div>
        <Button variant="ghost" size="sm" type="button" onClick={addModule}>
          [+ module]
        </Button>
      </div>

      <label className={styles.featuredRow}>
        <input
          type="checkbox"
          checked={featured}
          onChange={(e) => setFeatured(e.target.checked)}
          className={styles.featuredCheck}
        />
        feature on homepage
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
          {saving ? "saving..." : "save course"}
        </Button>
      </div>
    </div>
  );
};
