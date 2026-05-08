import React from "react";
import styles from "./ContentEditor.module.scss";
import type { ContentStatus } from "./ContentEditor";

export interface StatusSelectProps {
  value: ContentStatus;
  onChange: (value: ContentStatus) => void;
}

export const StatusSelect: React.FC<StatusSelectProps> = ({
  value,
  onChange,
}) => (
  <select
    className={styles.statusSelect}
    value={value}
    onChange={(e) => onChange(e.target.value as ContentStatus)}
  >
    <option value="draft">draft</option>
    <option value="published">published</option>
    <option value="archived">archived</option>
  </select>
);
