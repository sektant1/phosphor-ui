import React from "react";
import styles from "./Stepper.module.scss";

export interface StepperItem {
  label: React.ReactNode;
  href?: string;
  num?: string;
  done?: boolean;
  current?: boolean;
}

export interface StepperProps {
  items: StepperItem[];
  separator?: string;
  className?: string;
  ariaLabel?: string;
}

export const Stepper: React.FC<StepperProps> = ({
  items,
  separator = "/",
  className,
  ariaLabel = "location",
}) => (
  <nav className={[styles.stp, className ?? ""].join(" ")} aria-label={ariaLabel}>
    {items.map((it, i) => {
      const cls = [styles.item, it.done ? styles.done : "", it.current ? styles.current : ""]
        .filter(Boolean)
        .join(" ");
      const inner = (
        <>
          {it.num && <span className={styles.num}>{it.num}</span>}
          <span>{it.label}</span>
        </>
      );
      return (
        <React.Fragment key={i}>
          {it.current || !it.href ? (
            <span className={cls}>{inner}</span>
          ) : (
            <a className={cls} href={it.href}>
              {inner}
            </a>
          )}
          {i < items.length - 1 && <span className={styles.sep}>{separator}</span>}
        </React.Fragment>
      );
    })}
  </nav>
);

export interface StepperFootLink {
  href: string;
  kind?: React.ReactNode;
  name: React.ReactNode;
}
export interface StepperFootProps {
  prev?: StepperFootLink;
  next?: StepperFootLink;
  className?: string;
}

export const StepperFoot: React.FC<StepperFootProps> = ({ prev, next, className }) => (
  <div className={[styles.foot, next ? styles.isNext : "", className ?? ""].join(" ")}>
    {prev && (
      <a href={prev.href} aria-label="previous">
        <span className={styles.arrow}>◂</span>
        <span className={styles.metaCol}>
          {prev.kind && <span className={styles.kind}>{prev.kind}</span>}
          <span className={styles.name}>{prev.name}</span>
        </span>
      </a>
    )}
    {next && (
      <a href={next.href} aria-label="next">
        <span className={[styles.metaCol, styles.alignRight].join(" ")}>
          {next.kind && <span className={styles.kind}>{next.kind}</span>}
          <span className={styles.name}>{next.name}</span>
        </span>
        <span className={styles.arrow}>▸</span>
      </a>
    )}
  </div>
);
