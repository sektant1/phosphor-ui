import React from "react";
import styles from "./ContentEditor.module.scss";
import { Button } from "../../atoms/Button/Button";
import { cx } from "../../../utils/classNames";

export interface EditorShellProps {
  kindLabel: string;
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
  <div className={cx(styles.card, variant === "compact" && styles.compact, className)}>
    <div className={styles.header}>
      <span className={styles.label}>{kindLabel}</span>
      {statusControl}
    </div>

    {children}

    <div className={styles.footer}>
      {footerStart}
      <Button variant="ghost" size="sm" onClick={onDiscard} type="button">
        discard
      </Button>
      <Button
        variant="primary"
        size="sm"
        onClick={onSave}
        disabled={saving}
        type="button"
      >
        {saving ? "saving..." : saveLabel ?? "save"}
      </Button>
    </div>
  </div>
);
