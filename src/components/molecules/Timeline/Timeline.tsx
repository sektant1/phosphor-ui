import React from "react";
import styles from "./Timeline.module.scss";

export type TimelineItemStatus = "done" | "active" | "upcoming";

export interface TimelineItem {
  date?: string;
  title: string;
  body?: React.ReactNode;
  status?: TimelineItemStatus;
  href?: string;
}

export interface TimelineProps {
  items: TimelineItem[];
  className?: string;
}

export const Timeline: React.FC<TimelineProps> = ({ items, className }) => (
  <div className={[styles.timeline, className ?? ""].filter(Boolean).join(" ")}>
    {items.map((item, i) => {
      const status = item.status ?? "upcoming";
      const isLast = i === items.length - 1;
      const dotCls = [styles.dot, styles[status]].join(" ");
      const titleCls = [styles.title, styles[status]].join(" ");

      const titleContent = item.href ? (
        <a className={titleCls} href={item.href}>
          {item.title}
        </a>
      ) : (
        <span className={titleCls}>{item.title}</span>
      );

      return (
        <div key={i} className={styles.item}>
          <div className={styles.dotCol}>
            <div className={dotCls} />
            {!isLast && <div className={styles.line} />}
          </div>
          <div className={styles.content}>
            {item.date && <span className={styles.date}>{item.date}</span>}
            {titleContent}
            {item.body && <div className={styles.body}>{item.body}</div>}
          </div>
        </div>
      );
    })}
  </div>
);
