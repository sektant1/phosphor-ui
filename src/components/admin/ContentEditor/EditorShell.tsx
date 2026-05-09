import React from "react";
import styles from "./ContentEditor.module.scss";
import { Button } from "../../atoms/Button/Button";
import { cx } from "../../../utils/classNames";
import { Cluster, Stack } from "../../templates/Layout";
import Text from "../../atoms/Text";

export interface EditorShellProps {
  kindLabel: string;
  meta?: React.ReactNode;
  statusControl?: React.ReactNode;
  footerStart?: React.ReactNode;
  saveLabel?: string;
  saving?: boolean;
  variant?: "default" | "compact";
  className?: string;
  children: React.ReactNode;
  onDiscard?: () => void;
  onSave?: () => void;
}

export const EditorShell: React.FC<EditorShellProps> = ({
  kindLabel,
  meta,
  statusControl,
  footerStart,
  saveLabel,
  saving = false,
  variant = "default",
  className,
  children,
  onDiscard,
  onSave,
}) => (
  <Stack className={cx(styles.card, variant === "compact" && styles.compact, className)} gap={variant === "compact" ? "md" : "lg"}>
    <Cluster className={styles.header} justify="space-between" gap="sm">
      <Stack className={styles.headingBlock} gap="xs">
        <Text variant="stamp" className={styles.label}>{kindLabel}</Text>
        {meta && <Text variant="caption" className={styles.meta}>{meta}</Text>}
      </Stack>
      {statusControl && <div className={styles.statusSlot}>{statusControl}</div>}
    </Cluster>

    {children}

    <Cluster className={styles.footer} gap="sm" justify="flex-end">
      {footerStart}
      <Button variant="ghost" size="sm" onClick={onDiscard} disabled={!onDiscard} type="button">
        discard
      </Button>
      <Button
        variant="primary"
        size="sm"
        onClick={onSave}
        loading={saving}
        disabled={!onSave}
        type="button"
      >
        {saving ? "saving..." : saveLabel ?? "save"}
      </Button>
    </Cluster>
  </Stack>
);
