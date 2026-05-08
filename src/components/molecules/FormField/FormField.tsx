import React from "react";
import styles from "./FormField.module.scss";

export interface FormFieldProps {
  label: string;
  hint?: string;
  error?: string;
  required?: boolean;
  htmlFor?: string;
  className?: string;
  children: React.ReactNode;
}

export const FormField: React.FC<FormFieldProps> = ({
  label,
  hint,
  error,
  required,
  htmlFor,
  className,
  children,
}) => {
  return (
    <div className={[styles.field, className ?? ""].filter(Boolean).join(" ")}>
      <div className={styles.labelRow}>
        <label className={styles.label} htmlFor={htmlFor}>
          {label}
        </label>
        {required && <span className={styles.asterisk}>*</span>}
      </div>
      <div className={error ? styles.childrenError : styles.children}>
        {children}
      </div>
      {error ? (
        <span className={styles.error}>[!] {error}</span>
      ) : hint ? (
        <span className={styles.hint}>{hint}</span>
      ) : null}
    </div>
  );
};

export type ContentStatus = "draft" | "published" | "archived";

export interface ContentStatusBadgeProps {
  status: ContentStatus;
  className?: string;
}

const statusConfig: Record<
  ContentStatus,
  { label: string; valueClass: string }
> = {
  draft: { label: "STATUS", valueClass: styles.valueDraft },
  published: { label: "STATUS", valueClass: styles.valuePublished },
  archived: { label: "STATUS", valueClass: styles.valueArchived },
};

const statusText: Record<ContentStatus, string> = {
  draft: "DRAFT",
  published: "LIVE",
  archived: "ARCHIVED",
};

export const ContentStatusBadge: React.FC<ContentStatusBadgeProps> = ({
  status,
  className,
}) => {
  const config = statusConfig[status];
  return (
    <span
      className={[styles.badge, className ?? ""].filter(Boolean).join(" ")}
    >
      <span className={styles.badgeLabel}>{config.label}</span>
      <span className={[styles.badgeValue, config.valueClass].join(" ")}>
        {statusText[status]}
      </span>
    </span>
  );
};
