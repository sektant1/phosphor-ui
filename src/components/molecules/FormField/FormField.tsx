import React from "react";
import styles from "./FormField.module.scss";
import { cx } from "../../../utils/classNames";
import { hasVisibleContent } from "../../atoms/primitive";
import { Badge, type BadgeTone } from "../../atoms/Badge";

export interface FormFieldProps extends React.HTMLAttributes<HTMLDivElement> {
  label: React.ReactNode;
  hint?: React.ReactNode;
  error?: React.ReactNode;
  required?: boolean;
  htmlFor?: string;
  children: React.ReactNode;
}

type FieldChildProps = {
  id?: string;
  "aria-describedby"?: string;
  "aria-invalid"?: boolean | "false" | "true";
};

export const FormField: React.FC<FormFieldProps> = ({
  label,
  hint,
  error,
  required,
  htmlFor,
  className,
  children,
  ...rest
}) => {
  const generatedId = React.useId();
  const resolvedId = htmlFor ?? generatedId;
  const hintId = `${resolvedId}-hint`;
  const errorId = `${resolvedId}-error`;
  const describedBy = [
    hasVisibleContent(hint) ? hintId : undefined,
    hasVisibleContent(error) ? errorId : undefined,
  ]
    .filter(Boolean)
    .join(" ") || undefined;
  const child = React.Children.count(children) === 1 ? React.Children.only(children) : children;
  const fieldChild = React.isValidElement<FieldChildProps>(child)
    ? React.cloneElement(child, {
        id: child.props.id ?? resolvedId,
        "aria-describedby": cx(child.props["aria-describedby"], describedBy),
        "aria-invalid": child.props["aria-invalid"] ?? (hasVisibleContent(error) || undefined),
      })
    : children;

  return (
    <div className={cx(styles.field, className)} {...rest}>
      <div className={styles.labelRow}>
        <label className={styles.label} htmlFor={resolvedId}>
          {label}
        </label>
        {required ? (
          <span className={styles.required} aria-hidden="true">required</span>
        ) : null}
      </div>
      <div className={cx(styles.control, hasVisibleContent(error) && styles.controlError)}>
        {fieldChild}
      </div>
      {hasVisibleContent(error) ? (
        <span id={errorId} className={styles.error}>[!] {error}</span>
      ) : hasVisibleContent(hint) ? (
        <span id={hintId} className={styles.hint}>{hint}</span>
      ) : null}
    </div>
  );
};

export type ContentStatus = "draft" | "published" | "archived";

export interface ContentStatusBadgeProps {
  status: ContentStatus;
  className?: string;
  label?: React.ReactNode;
}

const statusConfig: Record<
  ContentStatus,
  { label: string; valueClass: string; tone: BadgeTone; glyph: string }
> = {
  draft: { label: "STATUS", valueClass: styles.valueDraft, tone: "muted", glyph: "◇" },
  published: { label: "STATUS", valueClass: styles.valuePublished, tone: "success", glyph: "▌" },
  archived: { label: "STATUS", valueClass: styles.valueArchived, tone: "accent", glyph: "×" },
};

const statusText: Record<ContentStatus, string> = {
  draft: "DRAFT",
  published: "LIVE",
  archived: "ARCHIVED",
};

export const ContentStatusBadge: React.FC<ContentStatusBadgeProps> = ({
  status,
  className,
  label,
}) => {
  const config = statusConfig[status];
  return (
    <span className={cx(styles.badge, className)}>
      <span className={styles.badgeLabel}>{label ?? config.label}</span>
      <Badge
        tone={config.tone}
        size="sm"
        leading={config.glyph}
        className={cx(styles.badgeValue, config.valueClass)}
      >
        {statusText[status]}
      </Badge>
    </span>
  );
};
