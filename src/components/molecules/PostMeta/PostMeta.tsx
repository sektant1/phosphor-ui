import React from "react";
import styles from "./PostMeta.module.scss";
import { cx } from "../../../utils/classNames";
import { Cluster } from "../../templates/Layout";

export interface PostMetaTag {
  label: React.ReactNode;
  href?: string;
}

export interface PostMetaProps extends React.HTMLAttributes<HTMLDivElement> {
  date?: string;
  dateTime?: string;
  readTime?: string;
  wordCount?: number;
  tags?: Array<string | PostMetaTag>;
  updated?: string;
}

const Sep: React.FC = () => <span className={styles.sep} aria-hidden="true">·</span>;

export const PostMeta: React.FC<PostMetaProps> = ({
  date,
  dateTime,
  readTime,
  wordCount,
  tags,
  updated,
  className,
  ...rest
}) => {
  const items: React.ReactNode[] = [];

  if (date) {
    items.push(
      <time key="date" className={styles.date} dateTime={dateTime ?? date}>{date}</time>
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
        {tags.map((tag) => {
          const label = typeof tag === "string" ? tag : tag.label;
          const href = typeof tag === "string" ? undefined : tag.href;
          return href ? (
            <a key={String(label)} className={styles.tag} href={href}>#{label}</a>
          ) : (
            <span key={String(label)} className={styles.tag}>#{label}</span>
          );
        })}
      </span>
    );
  }

  const withSeps = items.reduce<React.ReactNode[]>((acc, item, i) => {
    if (i > 0) acc.push(<Sep key={`sep-${i}`} />);
    acc.push(item);
    return acc;
  }, []);

  return (
    <Cluster
      className={cx(styles.root, className)}
      rowGap="0.5ch"
      columnGap="1ch"
      {...rest}
    >
      {withSeps}
    </Cluster>
  );
};
