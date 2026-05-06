import React, { useRef, useState } from "react";
import styles from "./ShareBar.module.scss";

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

  const handleCopy = () => {
    const target = url ?? window.location.href;
    try {
      navigator.clipboard.writeText(target);
    } catch {}
    setCopied(true);
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => setCopied(false), 1800);
  };

  return (
    <div className={[styles.bar, className ?? ""].filter(Boolean).join(" ")}>
      <span className={styles.label}>▌{label.toUpperCase()}</span>
      <button
        className={[styles.copy, copied ? styles.copyActive : ""].filter(Boolean).join(" ")}
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
