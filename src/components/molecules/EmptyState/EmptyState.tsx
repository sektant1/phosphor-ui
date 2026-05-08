import React from "react";
import styles from "./EmptyState.module.scss";

export interface EmptyStateProps {
  glyph?: string;
  title?: string;
  body?: React.ReactNode;
  action?: { label: string; href?: string; onClick?: () => void };
  className?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  glyph = "[ — ]",
  title = "no data",
  body,
  action,
  className,
}) => {
  const cls = [styles.root, className ?? ""].filter(Boolean).join(" ");
  return (
    <div className={cls}>
      <span className={styles.glyph}>{glyph}</span>
      <p className={styles.title}>{title}</p>
      {body && <div className={styles.body}>{body}</div>}
      {action && (
        action.href ? (
          <a className={styles.action} href={action.href}>
            {action.label}
          </a>
        ) : (
          <button className={styles.action} type="button" onClick={action.onClick}>
            {action.label}
          </button>
        )
      )}
    </div>
  );
};
