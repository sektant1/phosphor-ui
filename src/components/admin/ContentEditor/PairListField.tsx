import React from "react";
import styles from "./ContentEditor.module.scss";
import { Button } from "../../atoms/Button/Button";
import { InputControl } from "../../atoms/Input/Input";
import type { PairColumn } from "./ContentEditor";
import { Cluster, Stack } from "../../templates/Layout";
import Text from "../../atoms/Text";

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
    <Stack className={styles.pairsSection} gap="sm">
      <Cluster className={styles.fieldHeader} justify="space-between" gap="sm">
        <Text variant="caption" className={styles.fieldLabel}>{label}</Text>
        <Button
          variant="ghost"
          size="sm"
          type="button"
          onClick={() => onChange([...rows, blank])}
        >
          {addLabel}
        </Button>
      </Cluster>
      {!rows.length && <div className={styles.emptyField}>No rows yet.</div>}
      {rows.map((row, index) => (
        <div key={index} className={styles.pairRow}>
          <span className={styles.rowIndex}>{String(index + 1).padStart(2, "0")}</span>
          {columns.map((column) => (
            <InputControl
              key={column.key}
              prompt=""
              className={styles.pairInputFrame}
              inputClassName={styles.inlineInput}
              style={{ flex: column.flex ?? 1 }}
              aria-label={`${label} ${column.placeholder} ${index + 1}`}
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
            remove
          </button>
        </div>
      ))}
    </Stack>
  );
};
