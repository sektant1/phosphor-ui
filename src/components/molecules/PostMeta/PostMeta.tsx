import React from "react";
import styles from "./PostMeta.module.scss";

export interface PostMetaProps {
  date?: string;
  readTime?: string;
  wordCount?: number;
  tags?: string[];
  updated?: string;
  className?: string;
}

const Sep: React.FC = () => <span className={styles.sep} aria-hidden="true">·</span>;

export const PostMeta: React.FC<PostMetaProps> = ({
  date,
  readTime,
  wordCount,
  tags,
  updated,
  className,
}) => {
  const items: React.ReactNode[] = [];

  if (date) {
    items.push(
      <span key="date" className={styles.date}>{date}</span>
    );
  }

  if (readTime) {
    items.push(
      <span key="readTime" className={styles.readTime}>
        <span className={styles.clock} aria-hidden="true">~</span>{readTime}
      </span>
    );
  }

  if (typeof wordCount === "number") {
    items.push(
      <span key="wordCount" className={styles.wordCount}>{wordCount} words</span>
    );
  }

  if (updated) {
    items.push(
      <span key="updated" className={styles.updated}>
        <span className={styles.updBadge}>upd.</span>
        {updated}
      </span>
    );
  }

  if (tags && tags.length > 0) {
    items.push(
      <span key="tags" className={styles.tags}>
        {tags.map((tag) => (
          <span key={tag} className={styles.tag}>#{tag}</span>
        ))}
      </span>
    );
  }

  const withSeps = items.reduce<React.ReactNode[]>((acc, item, i) => {
    if (i > 0) acc.push(<Sep key={`sep-${i}`} />);
    acc.push(item);
    return acc;
  }, []);

  return (
    <div className={[styles.root, className ?? ""].filter(Boolean).join(" ")}>
      {withSeps}
    </div>
  );
};
