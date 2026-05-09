import React from "react";
import styles from "./EmptyState.module.scss";
import { cx } from "../../../utils/classNames";
import { Button } from "../../atoms/Button";
import { hasVisibleContent } from "../../atoms/primitive";
import { Cluster, Stack } from "../../templates/Layout";

export interface EmptyStateAction {
  label: React.ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: "primary" | "ghost";
}

export interface EmptyStateProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  glyph?: React.ReactNode;
  title?: React.ReactNode;
  body?: React.ReactNode;
  action?: EmptyStateAction;
  actions?: EmptyStateAction[];
  status?: boolean;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  glyph = "[ — ]",
  title = "no data",
  body,
  action,
  actions,
  status,
  className,
  ...rest
}) => {
  const resolvedActions = actions ?? (action ? [action] : []);
  return (
    <Stack
      className={cx(styles.root, className)}
      gap="sm"
      role={status ? "status" : undefined}
      {...rest}
    >
      <span className={styles.glyph}>{glyph}</span>
      <p className={styles.title}>{title}</p>
      {hasVisibleContent(body) ? <div className={styles.body}>{body}</div> : null}
      {resolvedActions.length > 0 ? (
        <Cluster className={styles.actions} gap="sm" justify="center">
          {resolvedActions.map((item, index) => (
            <Button
              key={index}
              className={styles.action}
              variant={item.variant ?? (index === 0 ? "primary" : "ghost")}
              size="sm"
              href={item.href}
              onClick={item.onClick}
            >
              {item.label}
            </Button>
          ))}
        </Cluster>
      ) : null}
    </Stack>
  );
};
