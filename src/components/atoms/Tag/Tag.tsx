import React from "react";
import styles from "./Tag.module.scss";

export interface TagProps extends React.HTMLAttributes<HTMLSpanElement> {
  color?: "phosphor" | "magenta";
  count?: number;
  href?: string;
  hover?: boolean;
}

export const Tag: React.FC<TagProps> = ({
  color = "magenta",
  count,
  href,
  hover,
  className,
  children,
  ...rest
}) => {
  const cls = [
    styles.tag,
    color === "phosphor" ? styles.phosphor : styles.magenta,
    hover ? styles.hover : "",
    className ?? "",
  ]
    .filter(Boolean)
    .join(" ");
  const content = (
    <>
      {children}
      {typeof count === "number" && <i className={styles.count}>·{count}</i>}
    </>
  );
  if (href) {
    return (
      <a href={href} className={cls} {...(rest as React.HTMLAttributes<HTMLAnchorElement>)}>
        {content}
      </a>
    );
  }
  return (
    <span className={cls} {...rest}>
      {content}
    </span>
  );
};
