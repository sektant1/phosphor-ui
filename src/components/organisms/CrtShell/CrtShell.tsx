import React from "react";
import styles from "./CrtShell.module.scss";
import { cx } from "../../../utils/classNames";
import { CRTOverlay } from "../../foundations/CRT";

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
    <CRTOverlay
      className={styles.overlay}
      noise={!disableNoise}
      scanlines={!disableScanlines}
      vignette={!disableVignette}
      flicker={!disableTick}
      glow
    />
    {!disableFrame && <div className={styles.frame} aria-hidden="true" />}
    {children}
  </div>
);
