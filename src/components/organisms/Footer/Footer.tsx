import React from "react";
import styles from "./Footer.module.scss";
import { cx } from "../../../utils/classNames";
import Link from "../../atoms/Link";

export interface FooterLink {
  label: React.ReactNode;
  href: string;
  external?: boolean;
}

export interface FooterProps extends React.HTMLAttributes<HTMLElement> {
  brand?: React.ReactNode;
  year?: React.ReactNode;
  links?: FooterLink[];
  status?: { label: React.ReactNode; value: React.ReactNode };
  prompt?: string;
  command?: string;
  meta?: React.ReactNode;
}

export const Footer: React.FC<FooterProps> = ({
  brand = "phosphor ui",
  year = new Date().getFullYear(),
  links = [],
  status,
  prompt = "~/$",
  command = "logout",
  meta,
  className,
  ...rest
}) => (
  <footer className={cx(styles.footer, className)} {...rest}>
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
              <Link href={l.href} external={l.external}>
                {l.label}
              </Link>
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
    {meta ? <div className={styles.meta}>{meta}</div> : null}
  </footer>
);
