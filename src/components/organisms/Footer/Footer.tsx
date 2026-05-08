import React from "react";
import styles from "./Footer.module.scss";

export interface FooterLink {
  label: React.ReactNode;
  href: string;
}

export interface FooterProps {
  brand?: React.ReactNode;
  year?: React.ReactNode;
  links?: FooterLink[];
  status?: { label: React.ReactNode; value: React.ReactNode };
  prompt?: string;
  command?: string;
  className?: string;
}

export const Footer: React.FC<FooterProps> = ({
  brand = "phosphor ui",
  year = new Date().getFullYear(),
  links = [],
  status,
  prompt = "~/$",
  command = "logout",
  className,
}) => (
  <footer className={[styles.footer, className ?? ""].join(" ")}>
    <div className={styles.row}>
      <div className={styles.brand}>
        <span className={styles.led} aria-hidden="true" />
        <span>{brand}</span>
        <span className={styles.year}>// {year}</span>
      </div>

      {links.length > 0 && (
        <ul className={styles.links}>
          {links.map((l) => (
            <li key={l.href}>
              <a href={l.href}>{l.label}</a>
            </li>
          ))}
        </ul>
      )}

      {status && (
        <span className={styles.status}>
          {status.label}: <b>{status.value}</b>
        </span>
      )}
    </div>

    <p className={styles.prompt}>
      <span className={styles.sym}>{prompt}</span>
      <span>{command}</span>
      <span className={styles.cursor} aria-hidden="true">▮</span>
    </p>
  </footer>
);
