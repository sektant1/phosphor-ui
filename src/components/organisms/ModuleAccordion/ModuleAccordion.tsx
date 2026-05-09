import React, { useState } from "react";
import styles from "./ModuleAccordion.module.scss";
import { cx } from "../../../utils/classNames";
import { ProgressBar } from "../../atoms/ProgressBar";

export interface ModuleLesson {
  id?: string;
  num: string;
  title: React.ReactNode;
  href?: string;
  length?: React.ReactNode;
  state?: "default" | "done" | "locked";
}

export interface ModuleAccordionProps extends Omit<React.HTMLAttributes<HTMLElement>, "title"> {
  num: string;
  title: React.ReactNode;
  intro?: React.ReactNode;
  lessons?: ModuleLesson[];
  progress?: { value: number; total?: number; cells?: number };
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  renderLesson?: (lesson: ModuleLesson, index: number) => React.ReactNode;
}

export const ModuleAccordion: React.FC<ModuleAccordionProps> = ({
  num,
  title,
  intro,
  lessons = [],
  progress,
  defaultOpen = true,
  className,
  onOpenChange,
  renderLesson,
  ...rest
}) => {
  const [open, setOpen] = useState(defaultOpen);
  const pct = progress
    ? Math.round((progress.value / (progress.total ?? 100)) * 100)
    : null;
  const contentId = React.useId();
  const toggleOpen = () => {
    setOpen((current) => {
      const next = !current;
      onOpenChange?.(next);
      return next;
    });
  };

  return (
    <section className={cx(styles.ma, !open && styles.collapsed, className)} {...rest}>
      <button
        className={styles.head}
        type="button"
        aria-expanded={open}
        aria-controls={contentId}
        onClick={toggleOpen}
      >
        <span className={styles.glyph}>{open ? "▾" : "▸"}</span>
        <span className={styles.num}>{num}</span>
        <span className={styles.title}>{title}</span>
        {progress ? (
          <ProgressBar
            className={styles.progress}
            value={progress.value}
            total={progress.total}
            segments={progress.cells ?? 4}
            showPercent={false}
            slim
          />
        ) : null}
        {pct !== null && <span className={styles.pct}>{pct}%</span>}
      </button>
      {open && (intro || lessons.length > 0) && (
        <div className={styles.body} id={contentId}>
          {intro && <p className={styles.intro}>{intro}</p>}
          {lessons.length > 0 && (
            <ul className={styles.list}>
              {lessons.map((l, i) =>
                renderLesson ? (
                  <React.Fragment key={l.id ?? l.href ?? `${l.num}-${i}`}>
                    {renderLesson(l, i)}
                  </React.Fragment>
                ) : (
                  <li
                    key={l.id ?? l.href ?? `${l.num}-${i}`}
                    className={cx(
                      styles.li,
                      l.state === "done" && styles.done,
                      l.state === "locked" && styles.locked
                    )}
                  >
                    <span className={styles.cb} />
                    <span className={styles.liNum}>{l.num}</span>
                    <a
                      href={l.href ?? "#"}
                      aria-disabled={l.state === "locked" || undefined}
                      onClick={
                        l.state === "locked" ? (event) => event.preventDefault() : undefined
                      }
                    >
                      {l.title}
                    </a>
                    {l.length && <span className={styles.len}>{l.length}</span>}
                  </li>
                ),
              )}
            </ul>
          )}
        </div>
      )}
    </section>
  );
};
