import React from "react";
import styles from "./PdaWindow.module.scss";

export interface PdaWindowProps {
  title?: React.ReactNode;
  meta?: React.ReactNode;
  leds?: ("rec" | "rx" | "pwr")[];
  children: React.ReactNode;
  className?: string;
}

export const PdaWindow: React.FC<PdaWindowProps> = ({
  title,
  meta,
  leds = ["rec", "rx", "pwr"],
  children,
  className,
}) => (
  <div className={[styles.pda, className ?? ""].join(" ")}>
    <div className={styles.bar}>
      {leds.map((l) => (
        <span key={l} className={[styles.led, styles[l]].join(" ")} />
      ))}
      {title && <span className={styles.title}>{title}</span>}
      {meta && <span className={styles.meta}>{meta}</span>}
    </div>
    <div className={styles.body}>{children}</div>
  </div>
);
