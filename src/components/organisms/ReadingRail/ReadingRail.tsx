import React from "react";
import styles from "./ReadingRail.module.scss";

export interface ReadingRailProps {
  value: number;
  className?: string;
}

export const ReadingRail: React.FC<ReadingRailProps> = ({ value, className }) => (
  <span
    className={[styles.rail, className ?? ""].join(" ")}
    aria-hidden="true"
    style={{ transform: `scaleX(${Math.max(0, Math.min(1, value))})` }}
  />
);
