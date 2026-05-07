import React, { useEffect, useRef, useState } from "react";
import styles from "./ShareBar.module.scss";
import { copyText, getCurrentHref } from "../../utils/browser";
import { cx } from "../../utils/classNames";

export interface ShareLink {
  label: string;
  href: string;
}

export interface ShareBarProps {
  url?: string;
  links?: ShareLink[];
  label?: string;
  className?: string;
}

export const ShareBar: React.FC<ShareBarProps> = ({
  url,
  links = [],
  label = "share",
  className,
}) => {
  const [copied, setCopied] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(
    () => () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    },
    []
  );

  const handleCopy = async () => {
    const target = url ?? getCurrentHref();
    if (!target) return;
    const didCopy = await copyText(target);
    if (!didCopy) return;
    setCopied(true);
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => setCopied(false), 1800);
  };

  return (
    <div className={cx(styles.bar, className)}>
      <span className={styles.label}>▌{label.toUpperCase()}</span>
      <button
        className={cx(styles.copy, copied && styles.copyActive)}
        onClick={handleCopy}
        type="button"
      >
        {copied ? "[copied!]" : "[copy link]"}
      </button>
      {links.map((link) => (
        <a
          key={link.href}
          className={styles.link}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
        >
          {link.label}
        </a>
      ))}
    </div>
  );
};
