import React from "react";
import styles from "./Tooltip.module.scss";
import { cx } from "../../utils/classNames";

export type TooltipPlacement = "top" | "right" | "bottom" | "left";

export interface TooltipProps {
  content: React.ReactNode;
  children: React.ReactElement;
  placement?: TooltipPlacement;
  className?: string;
}

const placementClass: Record<TooltipPlacement, string> = {
  top: styles.top,
  right: styles.right,
  bottom: styles.bottom,
  left: styles.left,
};

export const Tooltip: React.FC<TooltipProps> = ({
  content,
  children,
  placement = "top",
  className,
}) => {
  const id = React.useId();
  const child = React.Children.only(children);

  return (
    <span className={cx(styles.root, placementClass[placement], className)}>
      {React.cloneElement(child, {
        "aria-describedby": id,
      } as React.HTMLAttributes<HTMLElement>)}
      <span id={id} role="tooltip" className={styles.tip}>
        {content}
      </span>
    </span>
  );
};
