import React from "react";
import styles from "./CrtShell.module.scss";
import { cx } from "../../../utils/classNames";

export interface CrtShellProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  disableTick?: boolean;
  disableNoise?: boolean;
  disableScanlines?: boolean;
  disableVignette?: boolean;
  disableFrame?: boolean;
}

export const CrtShell: React.FC<CrtShellProps> = ({
  children,
  disableTick,
  disableNoise,
  disableScanlines,
  disableVignette,
  disableFrame,
  className,
  ...rest
}) => (
  <div className={cx(styles.shell, className)} {...rest}>
    {!disableNoise && <div className={styles.noise} aria-hidden="true" />}
    {!disableScanlines && <div className={styles.scanlines} aria-hidden="true" />}
    {!disableVignette && <div className={styles.vignette} aria-hidden="true" />}
    {!disableFrame && <div className={styles.frame} aria-hidden="true" />}
    {!disableTick && <div className={styles.tick} aria-hidden="true" />}
    {children}
  </div>
);
