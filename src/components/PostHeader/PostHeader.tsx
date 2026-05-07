import React from "react";
import styles from "./PostHeader.module.scss";
import { cx } from "../../utils/classNames";
import { H1 } from "../Headings";
import { PostMeta } from "../PostMeta";
import { Tag } from "../Tag";

export interface PostHeaderProps
  extends Omit<React.HTMLAttributes<HTMLElement>, "title"> {
  title: React.ReactNode;
  eyebrow?: React.ReactNode;
  subtitle?: React.ReactNode;
  date?: string;
  readTime?: string;
  wordCount?: number;
  updated?: string;
  tags?: string[];
  actions?: React.ReactNode;
}

export const PostHeader: React.FC<PostHeaderProps> = ({
  title,
  eyebrow,
  subtitle,
  date,
  readTime,
  wordCount,
  updated,
  tags,
  actions,
  className,
  children,
  ...rest
}) => (
  <header className={cx(styles.root, className)} {...rest}>
    <div className={styles.top}>
      <div className={styles.copy}>
        {eyebrow ? <p className={styles.eyebrow}>{eyebrow}</p> : null}
        {tags && tags.length > 0 ? (
          <div className={styles.tags}>
            {tags.map((tag, index) => (
              <Tag key={tag} color={index % 2 === 0 ? "phosphor" : "magenta"}>{tag}</Tag>
            ))}
          </div>
        ) : null}
        <H1 className={styles.title}>{title}</H1>
        {subtitle ? <p className={styles.subtitle}>{subtitle}</p> : null}
      </div>
      {actions ? <div className={styles.actions}>{actions}</div> : null}
    </div>

    <PostMeta
      className={styles.meta}
      date={date}
      readTime={readTime}
      wordCount={wordCount}
      updated={updated}
    />
    {children ? <div className={styles.extra}>{children}</div> : null}
  </header>
);
