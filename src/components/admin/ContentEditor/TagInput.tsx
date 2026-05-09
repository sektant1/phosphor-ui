import React, { KeyboardEvent } from "react";
import styles from "./ContentEditor.module.scss";
import { Tag } from "../../atoms/Tag/Tag";
import { Cluster, Stack } from "../../templates/Layout";
import Text from "../../atoms/Text";

export interface TagInputProps {
  label?: string;
  placeholder?: string;
  chip?: "tag" | "outline";
  value: string[];
  inputValue: string;
  onInputChange: (value: string) => void;
  onChange: (value: string[]) => void;
}

export const TagInput: React.FC<TagInputProps> = ({
  label,
  placeholder,
  chip,
  value,
  inputValue,
  onInputChange,
  onChange,
}) => {
  const remove = (tag: string) => onChange(value.filter((item) => item !== tag));
  const addCurrent = () => {
    const current = inputValue.trim();
    if (!current) return;
    if (!value.includes(current)) {
      onChange([...value, current]);
    }
    onInputChange("");
  };
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== "Enter") return;
    e.preventDefault();
    addCurrent();
  };

  return (
    <Stack className={styles.tagsSection} gap="sm">
      {label && <Text variant="caption" className={styles.fieldLabel}>{label}</Text>}
      <Cluster className={styles.tagsRow} gap="xs">
        {value.map((tag) =>
          chip === "tag" ? (
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
          ),
        )}
        <input
          className={styles.tagInput}
          value={inputValue}
          onChange={(e) => onInputChange(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder ?? "add tag..."}
        />
        <button
          type="button"
          className={styles.addInline}
          onClick={addCurrent}
          disabled={!inputValue.trim()}
        >
          add
        </button>
      </Cluster>
    </Stack>
  );
};
