import React from "react";
import styles from "./PdaWindow.module.scss";
import { cx } from "../../../utils/classNames";

export interface PdaWindowProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  title?: React.ReactNode;
  meta?: React.ReactNode;
  leds?: ("rec" | "rx" | "pwr")[];
  children: React.ReactNode;
}

export const PdaWindow: React.FC<PdaWindowProps> = ({
  title,
  meta,
  leds = ["rec", "rx", "pwr"],
  children,
  className,
  ...rest
}) => (
  <div className={cx(styles.pda, className)} {...rest}>
    <div className={styles.bar}>
      {leds.map((l) => (
        <span key={l} className={cx(styles.led, styles[l])} />
      ))}
      {title && <span className={styles.title}>{title}</span>}
      {meta && <span className={styles.meta}>{meta}</span>}
    </div>
    <div className={styles.body}>{children}</div>
  </div>
);
