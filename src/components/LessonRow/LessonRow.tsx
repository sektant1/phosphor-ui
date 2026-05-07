import React from "react";
import styles from "./LessonRow.module.scss";
import { cx } from "../../utils/classNames";

export type LessonState = "default" | "done" | "current" | "locked";
export type LessonKind = "read" | "video" | "lab" | "quiz" | "locked";

export interface LessonRowProps {
  num: string;
  title: React.ReactNode;
  length?: React.ReactNode;
  kind?: LessonKind;
  state?: LessonState;
  href?: string;
  icon?: React.ReactNode;
}

const kindIcon = (k?: LessonKind) => {
  if (k === "video") return "▶";
  if (k === "quiz") return "?";
  return "▌";
};

export interface LessonListProps {
  children: React.ReactNode;
  className?: string;
}

export const LessonList: React.FC<LessonListProps> = ({ children, className }) => (
  <ul className={cx(styles.list, className)}>{children}</ul>
);

export const LessonRow: React.FC<LessonRowProps> = ({
  num,
  title,
  length,
  kind = "read",
  state = "default",
  href = "#",
  icon,
}) => {
  const locked = state === "locked";
  const cls = cx(
    styles.lr,
    state === "done" && styles.done,
    state === "current" && styles.current,
    locked && styles.locked,
    kind === "video" && styles.video
  );
  return (
    <li>
      <a
        className={cls}
        href={href}
        aria-disabled={locked || undefined}
        onClick={locked ? (event) => event.preventDefault() : undefined}
      >
        <span className={styles.cb} />
        <span className={cx(styles.icon, kind === "video" && styles.iconVideo)}>
          {icon ?? kindIcon(kind)}
        </span>
        <span className={styles.num}>{num}</span>
        <span className={styles.title}>{title}</span>
        {length && <span className={styles.len}>{length}</span>}
        <span className={styles.tag}>{kind}</span>
      </a>
    </li>
  );
};
