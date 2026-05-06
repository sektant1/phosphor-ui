import React from "react";
import styles from "./AsciiBanner.module.scss";

export interface AsciiBannerProps {
  art: string;
  fallback?: string;
  href?: string;
  label?: string;
  className?: string;
}

export const AsciiBanner: React.FC<AsciiBannerProps> = ({
  art,
  fallback,
  href,
  label,
  className,
}) => {
  const content = (
    <>
      <pre className={styles.banner} aria-hidden="true">
        {art}
      </pre>
      {fallback && <h1 className={styles.fallback}>{fallback}</h1>}
    </>
  );
  if (href) {
    return (
      <a
        href={href}
        className={[styles.link, className ?? ""].join(" ")}
        aria-label={label}
      >
        {content}
      </a>
    );
  }
  return <div className={[styles.link, className ?? ""].join(" ")}>{content}</div>;
};
