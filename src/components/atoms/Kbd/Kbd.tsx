import React from "react";
import styles from "./Kbd.module.scss";
import { cx } from "../../../utils/classNames";

export type KbdVariant = "default" | "accent" | "muted";

export interface KbdProps extends React.HTMLAttributes<HTMLElement> {
  variant?: KbdVariant;
}

export const Kbd = React.forwardRef<HTMLElement, KbdProps>(
  ({ variant = "default", className, ...rest }, ref) => (
    <kbd
      ref={ref}
      className={cx(
        styles.kbd,
        variant === "accent" && styles.accent,
        variant === "muted" && styles.muted,
        className,
      )}
      {...rest}
    />
  ),
);

Kbd.displayName = "Kbd";
