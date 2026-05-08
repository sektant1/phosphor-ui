import React from "react";
import styles from "./ContentEditor.module.scss";
import { Button } from "../../atoms/Button/Button";

export type ListRow = Record<string, unknown> & { id?: string };

export interface RepeaterFieldProps {
  label: string;
  addLabel: string;
  placeholder: string;
  leading?: string;
  itemKey?: string;
  rows: ListRow[];
  createRow: () => ListRow;
  getString: (value: unknown) => string;
  onChange: (rows: ListRow[]) => void;
}

export const RepeaterField: React.FC<RepeaterFieldProps> = ({
  label,
  addLabel,
  placeholder,
  leading,
  itemKey = "title",
  rows,
  createRow,
  getString,
  onChange,
}) => (
  <div className={styles.listSection}>
    <span className={styles.fieldLabel}>{label}</span>
    {rows.map((row, index) => (
      <div key={row.id ?? index} className={styles.listRow}>
        {leading && <span className={styles.leading}>{leading}</span>}
        <input
          className={styles.listInput}
          placeholder={placeholder}
          value={getString(row[itemKey])}
          onChange={(e) =>
            onChange(
              rows.map((item, itemIndex) =>
                itemIndex === index
                  ? { ...item, [itemKey]: e.target.value }
                  : item,
              ),
            )
          }
        />
        <button
          type="button"
          className={styles.removeRow}
          onClick={() => onChange(rows.filter((_, itemIndex) => itemIndex !== index))}
          aria-label={`Remove ${label.toLowerCase()} item ${index + 1}`}
        >
          ×
        </button>
      </div>
    ))}
    <Button
      variant="ghost"
      size="sm"
      type="button"
      onClick={() => onChange([...rows, createRow()])}
    >
      {addLabel}
    </Button>
  </div>
);
