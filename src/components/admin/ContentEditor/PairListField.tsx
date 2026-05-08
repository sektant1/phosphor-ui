import React from "react";
import styles from "./ContentEditor.module.scss";
import { Button } from "../../atoms/Button/Button";
import type { PairColumn } from "./ContentEditor";

export type PairRow = Record<string, string>;

export interface PairListFieldProps {
  label: string;
  addLabel: string;
  columns: [PairColumn, PairColumn];
  rows: PairRow[];
  onChange: (rows: PairRow[]) => void;
}

export const PairListField: React.FC<PairListFieldProps> = ({
  label,
  addLabel,
  columns,
  rows,
  onChange,
}) => {
  const blank = columns.reduce<PairRow>((acc, column) => {
    acc[column.key] = "";
    return acc;
  }, {});

  return (
    <div className={styles.pairsSection}>
      <span className={styles.fieldLabel}>{label}</span>
      {rows.map((row, index) => (
        <div key={index} className={styles.pairRow}>
          {columns.map((column) => (
            <input
              key={column.key}
              className={styles.pairInput}
              style={{ flex: column.flex ?? 1 }}
              placeholder={column.placeholder}
              value={row[column.key] ?? ""}
              onChange={(e) =>
                onChange(
                  rows.map((item, itemIndex) =>
                    itemIndex === index
                      ? { ...item, [column.key]: e.target.value }
                      : item,
                  ),
                )
              }
            />
          ))}
          <button
            type="button"
            className={styles.removeRow}
            onClick={() => onChange(rows.filter((_, itemIndex) => itemIndex !== index))}
            aria-label={`Remove ${label.toLowerCase()} row ${index + 1}`}
          >
            ×
          </button>
        </div>
      ))}
      <Button
        variant="ghost"
        size="sm"
        type="button"
        onClick={() => onChange([...rows, blank])}
      >
        {addLabel}
      </Button>
    </div>
  );
};
