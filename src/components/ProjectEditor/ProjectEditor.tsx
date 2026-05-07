import React, { useState, KeyboardEvent } from "react";
import styles from "./ProjectEditor.module.scss";
import { Input, Textarea } from "../Input/Input";
import { Button } from "../Button/Button";

export type ContentStatus = "draft" | "published" | "archived";

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

function slugify(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/[\s]+/g, "-");
}

export const ProjectEditor: React.FC<ProjectEditorProps> = ({
  initial = {},
  onSave,
  onChange,
  onDiscard,
  saving = false,
  className,
}) => {
  const [title, setTitleState] = useState(initial.title ?? "");
  const [slug, setSlugState] = useState(initial.slug ?? "");
  const [slugTouched, setSlugTouched] = useState(!!initial.slug);
  const [description, setDescriptionState] = useState(initial.description ?? "");
  const [body, setBodyState] = useState(initial.body ?? "");
  const [tags, setTagsState] = useState<string[]>(initial.tags ?? []);
  const [tagInput, setTagInput] = useState("");
  const [links, setLinksState] = useState<ProjectLink[]>(initial.links ?? []);
  const [status, setStatusState] = useState<ContentStatus>(initial.status ?? "draft");
  const [featured, setFeaturedState] = useState(initial.featured ?? false);

  const emit = (next: Partial<ProjectData>) => {
    onChange?.({
      title: next.title ?? title,
      slug: next.slug ?? slug,
      description: next.description ?? description,
      body: next.body ?? body,
      tags: next.tags ?? tags,
      links: next.links ?? links,
      status: next.status ?? status,
      featured: next.featured ?? featured,
    });
  };
  const setTitle = (v: string) => { setTitleState(v); emit({ title: v }); };
  const setSlug = (v: string) => { setSlugState(v); emit({ slug: v }); };
  const setDescription = (v: string) => { setDescriptionState(v); emit({ description: v }); };
  const setBody = (v: string) => { setBodyState(v); emit({ body: v }); };
  const setTags = (v: string[]) => { setTagsState(v); emit({ tags: v }); };
  const setLinks = (v: ProjectLink[]) => { setLinksState(v); emit({ links: v }); };
  const setStatus = (v: ContentStatus) => { setStatusState(v); emit({ status: v }); };
  const setFeatured = (v: boolean) => { setFeaturedState(v); emit({ featured: v }); };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setTitle(val);
    if (!slugTouched) {
      const newSlug = slugify(val);
      setSlugState(newSlug);
      onChange?.({ title: val, slug: newSlug, description, body, tags, links, status, featured });
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

  const addLink = () => {
    setLinks([...links, { label: "", url: "" }]);
  };

  const updateLink = (index: number, field: keyof ProjectLink, value: string) => {
    setLinks(links.map((l, i) => (i === index ? { ...l, [field]: value } : l)));
  };

  const removeLink = (index: number) => {
    setLinks(links.filter((_, i) => i !== index));
  };

  const handleSave = () => {
    onSave?.({ title, slug, description, body, tags, links, status, featured });
  };

  return (
    <div className={[styles.card, className ?? ""].filter(Boolean).join(" ")}>
      <div className={styles.header}>
        <span className={styles.label}>PROJECT</span>
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
        placeholder="project name"
        value={title}
        onChange={handleTitleChange}
      />

      <Input
        prompt="slug >"
        cursor={false}
        placeholder="my-project"
        value={slug}
        onChange={handleSlugChange}
      />

      <Input
        prompt="desc >"
        cursor={false}
        placeholder="one-line summary"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <Textarea
        rows={6}
        placeholder="extended write-up, markdown OK"
        value={body}
        onChange={(e) => setBody(e.target.value)}
      />

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

      <div className={styles.linksSection}>
        <span className={styles.fieldLabel}>LINKS</span>
        {links.map((link, i) => (
          <div key={i} className={styles.linkRow}>
            <input
              className={styles.linkInput}
              style={{ flex: "0 0 90px" }}
              placeholder="label"
              value={link.label}
              onChange={(e) => updateLink(i, "label", e.target.value)}
            />
            <input
              className={styles.linkInput}
              style={{ flex: 1 }}
              placeholder="https://..."
              value={link.url}
              onChange={(e) => updateLink(i, "url", e.target.value)}
            />
            <button
              type="button"
              className={styles.removeLink}
              onClick={() => removeLink(i)}
            >
              ×
            </button>
          </div>
        ))}
        <Button variant="ghost" size="sm" type="button" onClick={addLink}>
          [+ link]
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
          {saving ? "saving..." : "save project"}
        </Button>
      </div>
    </div>
  );
};
