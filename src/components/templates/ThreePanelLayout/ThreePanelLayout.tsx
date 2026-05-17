import React from "react";
import styles from "./ThreePanelLayout.module.scss";
import { cx } from "../../../utils/classNames";

export interface ThreePanelLayoutProps
  extends React.HTMLAttributes<HTMLDivElement> {
  left?: React.ReactNode;
  main: React.ReactNode;
  right?: React.ReactNode;
  header?: React.ReactNode;
  footer?: React.ReactNode;
  leftLabel?: string;
  rightLabel?: string;
  sticky?: boolean;
  mainAs?: "main" | "section" | "article" | "div";
  leftClassName?: string;
  mainClassName?: string;
  rightClassName?: string;
}

export const ThreePanelLayout = React.forwardRef<HTMLDivElement, ThreePanelLayoutProps>(
  (
    {
      left,
      main,
      right,
      header,
      footer,
      leftLabel = "navigation",
      rightLabel = "context",
      sticky = true,
      mainAs: MainTag = "main",
      className,
      leftClassName,
      mainClassName,
      rightClassName,
      ...rest
    },
    ref,
  ) => {
    const hasLeft = left !== null && left !== undefined && left !== false;
    const hasRight = right !== null && right !== undefined && right !== false;

    return (
      <div
        ref={ref}
        className={cx(
          styles.root,
          hasLeft && styles.hasLeft,
          hasRight && styles.hasRight,
          sticky && styles.sticky,
          className,
        )}
        {...rest}
      >
        {header ? <div className={styles.header}>{header}</div> : null}
        <div className={styles.grid}>
          {hasLeft ? (
            <aside
              className={cx(styles.leftPanel, leftClassName)}
              aria-label={leftLabel}
            >
              {left}
            </aside>
          ) : null}
          <MainTag className={cx(styles.main, mainClassName)}>{main}</MainTag>
          {hasRight ? (
            <aside
              className={cx(styles.rightPanel, rightClassName)}
              aria-label={rightLabel}
            >
              {right}
            </aside>
          ) : null}
        </div>
        {footer ? <footer className={styles.footer}>{footer}</footer> : null}
      </div>
    );
  },
);

ThreePanelLayout.displayName = "ThreePanelLayout";
