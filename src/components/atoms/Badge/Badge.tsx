import React from "react";
import styles from "./Badge.module.scss";
import { cx } from "../../../utils/classNames";

export type BadgeTone = "primary" | "accent" | "success" | "warn" | "danger" | "muted";
export type BadgeSize = "sm" | "md";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  tone?: BadgeTone;
  size?: BadgeSize;
  leading?: React.ReactNode;
}

const toneClass: Record<BadgeTone, string> = {
  primary: styles.primary,
  accent: styles.accent,
  success: styles.success,
  warn: styles.warn,
  danger: styles.danger,
  muted: styles.muted,
};

export const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  (
    {
      tone = "primary",
      size = "md",
      leading,
      className,
      children,
      ...rest
    },
    ref,
  ) => (
    <span
      ref={ref}
      className={cx(styles.badge, toneClass[tone], size === "sm" && styles.sm, className)}
      {...rest}
    >
      {leading ? <span className={styles.leading}>{leading}</span> : null}
      <span className={styles.label}>{children}</span>
    </span>
  ),
);

Badge.displayName = "Badge";
