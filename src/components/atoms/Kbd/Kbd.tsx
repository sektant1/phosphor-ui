import React from "react";
import styles from "./Kbd.module.scss";
import { cx } from "../../../utils/classNames";

export interface KbdProps extends React.HTMLAttributes<HTMLElement> {}

export const Kbd = React.forwardRef<HTMLElement, KbdProps>(
  ({ className, ...rest }, ref) => (
    <kbd ref={ref} className={cx(styles.kbd, className)} {...rest} />
  ),
);

Kbd.displayName = "Kbd";
