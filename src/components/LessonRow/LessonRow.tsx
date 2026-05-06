import React from "react";
import styles from "./LessonRow.module.scss";

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
  <ul className={[styles.list, className ?? ""].join(" ")}>{children}</ul>
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
  const cls = [
    styles.lr,
    state === "done" ? styles.done : "",
    state === "current" ? styles.current : "",
    state === "locked" ? styles.locked : "",
    kind === "video" ? styles.video : "",
  ].join(" ");
  return (
    <li>
      <a className={cls} href={href} aria-disabled={state === "locked"}>
        <span className={styles.cb} />
        <span className={[styles.icon, kind === "video" ? styles.iconVideo : ""].join(" ")}>
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
