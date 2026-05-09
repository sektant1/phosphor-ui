import React from "react";
import styles from "./ContentEditor.module.scss";
import { Button } from "../../atoms/Button/Button";
import { Cluster, Stack } from "../../templates/Layout";
import Text from "../../atoms/Text";

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
  <Stack className={styles.listSection} gap="sm">
    <Cluster className={styles.fieldHeader} justify="space-between" gap="sm">
      <Text variant="caption" className={styles.fieldLabel}>{label}</Text>
      <Button
        variant="ghost"
        size="sm"
        type="button"
        onClick={() => onChange([...rows, createRow()])}
      >
        {addLabel}
      </Button>
    </Cluster>
    {!rows.length && <div className={styles.emptyField}>No items yet.</div>}
    {rows.map((row, index) => (
      <Cluster key={row.id ?? index} className={styles.listRow} gap="sm" align="center">
        <span className={styles.rowIndex}>{String(index + 1).padStart(2, "0")}</span>
        {leading && <span className={styles.leading}>{leading}</span>}
        <input
          className={styles.listInput}
          aria-label={`${label} item ${index + 1}`}
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
          remove
        </button>
      </Cluster>
    ))}
  </Stack>
);
