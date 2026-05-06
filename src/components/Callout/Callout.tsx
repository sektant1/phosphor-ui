import React from "react";
import styles from "./Callout.module.scss";

export type CalloutVariant = "info" | "quote" | "warn";

export interface CalloutProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: CalloutVariant;
  title?: string;
}

export const Callout: React.FC<CalloutProps> = ({
  variant = "info",
  title,
  className,
  children,
  ...rest
}) => {
  const cls = [
    styles.frame,
    variant === "quote" ? styles.q : "",
    variant === "warn" ? styles.warn : "",
    className ?? "",
  ]
    .filter(Boolean)
    .join(" ");
  return (
    <div className={cls} {...rest}>
      {title && <div className={styles.title}>{title}</div>}
      {children}
    </div>
  );
};

export const CalloutHeading: React.FC<React.HTMLAttributes<HTMLHeadingElement>> = ({
  className,
  children,
  ...rest
}) => (
  <h2 className={[styles.h2, className ?? ""].join(" ")} {...rest}>
    {children}
  </h2>
);
