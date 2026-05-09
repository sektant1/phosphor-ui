import React from "react";
import styles from "./Callout.module.scss";
import { cx } from "../../../utils/classNames";
import { hasVisibleContent } from "../../atoms/primitive";

export type CalloutVariant =
  | "info"
  | "note"
  | "tip"
  | "success"
  | "warn"
  | "danger"
  | "quote"
  | "terminal";

export type CalloutSize = "sm" | "md" | "lg";

const variantClass: Record<CalloutVariant, string> = {
  info: styles.info,
  note: styles.note,
  tip: styles.tip,
  success: styles.success,
  warn: styles.warn,
  danger: styles.danger,
  quote: styles.quote,
  terminal: styles.terminal,
};

const defaultGlyph: Record<CalloutVariant, string> = {
  info: "▌",
  note: "◇",
  tip: "✦",
  success: "✓",
  warn: "!",
  danger: "!!",
  quote: "$",
  terminal: ">",
};

export interface CalloutProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  variant?: CalloutVariant;
  size?: CalloutSize;
  title?: React.ReactNode;
  glyph?: React.ReactNode;
  hideGlyph?: boolean;
  actions?: React.ReactNode;
}

export const Callout: React.FC<CalloutProps> = ({
  variant = "info",
  size = "md",
  title,
  glyph,
  hideGlyph,
  actions,
  className,
  children,
  ...rest
}) => {
  const alertProps =
    variant === "warn" || variant === "danger"
      ? { role: "alert" as const }
      : {};

  return (
    <div
      className={cx(
        styles.frame,
        variantClass[variant],
        size === "sm" && styles.sm,
        size === "lg" && styles.lg,
        className
      )}
      {...alertProps}
      {...rest}
    >
      {!hideGlyph ? <div className={styles.glyph} aria-hidden="true">{glyph ?? defaultGlyph[variant]}</div> : null}
      <div className={styles.body}>
        {hasVisibleContent(title) ? <div className={styles.title}>{title}</div> : null}
        <div className={styles.content}>{children}</div>
        {hasVisibleContent(actions) ? <div className={styles.actions}>{actions}</div> : null}
      </div>
    </div>
  );
};

export const CalloutHeading: React.FC<React.HTMLAttributes<HTMLHeadingElement>> = ({
  className,
  children,
  ...rest
}) => (
  <h2 className={cx(styles.h2, className)} {...rest}>
    {children}
  </h2>
);
