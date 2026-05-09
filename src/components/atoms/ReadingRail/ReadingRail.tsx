import React from "react";
import styles from "./ReadingRail.module.scss";
import { cx } from "../../../utils/classNames";

export interface ReadingRailProps extends React.HTMLAttributes<HTMLSpanElement> {
  value: number;
}

export const ReadingRail: React.FC<ReadingRailProps> = ({
  value,
  className,
  style,
  ...rest
}) => (
  <span
    className={cx(styles.rail, className)}
    aria-hidden="true"
    style={{
      ...style,
      transform: `scaleX(${Math.max(0, Math.min(1, value))})`,
    }}
    {...rest}
  />
);
