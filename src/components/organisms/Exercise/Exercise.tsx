import React from "react";
import styles from "./Exercise.module.scss";
import { Checkbox } from "../../atoms/Checkbox";

export interface ExerciseTask {
  label: React.ReactNode;
  done?: boolean;
}

export interface ExerciseProps {
  n?: number;
  title?: string;
  tasks?: ExerciseTask[];
  onTaskChange?: (index: number, done: boolean) => void;
  className?: string;
  children?: React.ReactNode;
}

export const Exercise: React.FC<ExerciseProps> = ({
  n,
  title,
  tasks: tasksProp,
  onTaskChange,
  className,
  children,
}) => {
  const tasks = tasksProp ?? [];
  const isControlled = tasksProp !== undefined && onTaskChange !== undefined;

  const [internal, setInternal] = React.useState<boolean[]>(
    () => tasks.map((t) => t.done ?? false)
  );

  const doneStates = isControlled
    ? tasks.map((t) => t.done ?? false)
    : internal;

  const toggle = (i: number, next: boolean) => {
    if (isControlled) {
      onTaskChange!(i, next);
    } else {
      setInternal((prev) => prev.map((v, idx) => (idx === i ? next : v)));
    }
  };

  const doneCount = doneStates.filter(Boolean).length;
  const allDone = tasks.length > 0 && doneCount === tasks.length;

  return (
    <div
      className={[styles.ex, allDone ? styles.allDone : "", className ?? ""]
        .filter(Boolean)
        .join(" ")}
    >
      <div className={styles.head}>
        <span className={styles.badge}>exercise</span>
        {n != null && (
          <span className={styles.num}>{String(n).padStart(2, "0")}</span>
        )}
        {title && <span className={styles.title}>{title}</span>}
        {tasks.length > 0 && (
          <span
            className={styles.progress}
            aria-label={`${doneCount} of ${tasks.length} complete`}
          >
            {doneCount}/{tasks.length}
          </span>
        )}
      </div>

      {tasks.length > 0 && (
        <div className={styles.track} aria-hidden="true">
          <div
            className={styles.fill}
            style={{ width: `${(doneCount / tasks.length) * 100}%` }}
          />
        </div>
      )}

      <div className={styles.body}>
        {children}

        {tasks.length > 0 && (
          <ul className={styles.tasks}>
            {tasks.map((t, i) => (
              <li key={i}>
                <Checkbox
                  checked={doneStates[i]}
                  label={t.label}
                  onChange={(next) => toggle(i, next)}
                />
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};
