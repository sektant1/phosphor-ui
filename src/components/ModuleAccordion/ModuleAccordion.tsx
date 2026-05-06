import React, { useState } from "react";
import styles from "./ModuleAccordion.module.scss";

export interface ModuleLesson {
  num: string;
  title: React.ReactNode;
  href?: string;
  length?: React.ReactNode;
  state?: "default" | "done" | "locked";
}

export interface ModuleAccordionProps {
  num: string;
  title: React.ReactNode;
  intro?: React.ReactNode;
  lessons?: ModuleLesson[];
  progress?: { value: number; total?: number; cells?: number };
  defaultOpen?: boolean;
  className?: string;
}

export const ModuleAccordion: React.FC<ModuleAccordionProps> = ({
  num,
  title,
  intro,
  lessons = [],
  progress,
  defaultOpen = true,
  className,
}) => {
  const [open, setOpen] = useState(defaultOpen);
  const pct = progress
    ? Math.round((progress.value / (progress.total ?? 100)) * 100)
    : null;
  const cells = progress?.cells ?? 4;
  const filled = progress
    ? Math.round((Math.max(0, Math.min(progress.value, progress.total ?? 100)) / (progress.total ?? 100)) * cells)
    : 0;
  return (
    <section className={[styles.ma, !open ? styles.collapsed : "", className ?? ""].join(" ")}>
      <header className={styles.head} onClick={() => setOpen((o) => !o)}>
        <span className={styles.glyph}>{open ? "▾" : "▸"}</span>
        <span className={styles.num}>{num}</span>
        <span className={styles.title}>{title}</span>
        {progress && (
          <span className={styles.progress} aria-hidden="true">
            {Array.from({ length: cells }).map((_, i) => (
              <span key={i} className={i < filled ? styles.on : ""} />
            ))}
          </span>
        )}
        {pct !== null && <span className={styles.pct}>{pct}%</span>}
      </header>
      {open && (intro || lessons.length > 0) && (
        <div className={styles.body}>
          {intro && <p className={styles.intro}>{intro}</p>}
          {lessons.length > 0 && (
            <ul className={styles.list}>
              {lessons.map((l, i) => (
                <li
                  key={i}
                  className={[
                    styles.li,
                    l.state === "done" ? styles.done : "",
                    l.state === "locked" ? styles.locked : "",
                  ].join(" ")}
                >
                  <span className={styles.cb} />
                  <span className={styles.liNum}>{l.num}</span>
                  <a href={l.href ?? "#"}>{l.title}</a>
                  {l.length && <span className={styles.len}>{l.length}</span>}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </section>
  );
};
