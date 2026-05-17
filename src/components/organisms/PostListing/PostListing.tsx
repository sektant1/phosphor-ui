import React from "react";
import styles from "./PostListing.module.scss";
import { cx } from "../../../utils/classNames";
import { hasVisibleContent } from "../../atoms/primitive";
import { EmptyState } from "../../molecules/EmptyState";

export interface PostRowProps extends Omit<React.LiHTMLAttributes<HTMLLIElement>, "title"> {
  date?: React.ReactNode;
  dateTime?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
<<<<<<< HEAD
  showDescription?: boolean;
=======
>>>>>>> 261b67a (0.3.48)
  meta?: React.ReactNode;
  href: string;
  glyph?: React.ReactNode;
  thumb?: React.ReactNode;
  thumbSrc?: string;
  thumbAlt?: string;
  index?: number;
}

export interface PostListingProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  posts?: PostRowProps[];
  headerLabels?: { glyph?: string; date?: string; post?: string; length?: string; thumb?: string };
  showDescription?: boolean;
  emptyMessage?: React.ReactNode;
  emptyState?: React.ReactNode;
  getPostKey?: (post: PostRowProps, index: number) => React.Key;
  renderPost?: (post: PostRowProps, index: number) => React.ReactNode;
}

export const PostListing: React.FC<PostListingProps> = ({
  children,
  posts,
  className,
  headerLabels,
  showDescription,
  emptyMessage = "no posts found.",
  emptyState,
  getPostKey = (post, index) => post.href || index,
  renderPost,
  ...rest
}) => {
  const labels = {
    glyph: "▌",
    date: "DATA",
    post: "POST",
    length: "LENGTH",
    thumb: "FRAME",
    ...(headerLabels ?? {}),
  };
  const hasPosts = posts !== undefined;
  const isEmpty = hasPosts && posts.length === 0;

  return (
    <div className={cx(styles.wrap, className)} {...rest}>
      <div className={styles.header}>
        <span className={styles.hGlyph}>{labels.glyph}</span>
        <span className={styles.hThumb}>{labels.thumb}</span>
        <span className={styles.hPost}>{labels.post}</span>
        <span className={styles.hLen}>{labels.length}</span>
        <span className={styles.hDate}>{labels.date}</span>
      </div>
      {isEmpty ? (
        emptyState ?? <EmptyState glyph="[ 0 ]" title={emptyMessage} status />
      ) : (
        <ul className={styles.list}>
          {hasPosts
            ? posts.map((post, index) =>
                renderPost ? (
                  <React.Fragment key={getPostKey(post, index)}>
                    {renderPost(post, index)}
                  </React.Fragment>
                ) : (
                  <PostRow
                    key={getPostKey(post, index)}
                    {...post}
                    index={post.index ?? index}
                    showDescription={post.showDescription ?? showDescription}
                  />
                ),
              )
            : children}
        </ul>
      )}
    </div>
  );
};

export const PostRow: React.FC<PostRowProps> = ({
  date,
  dateTime,
  title,
<<<<<<< HEAD
  description,
  showDescription,
=======
  description: _description,
>>>>>>> 261b67a (0.3.48)
  meta,
  href,
  glyph = "▌",
  thumb,
  thumbSrc,
  thumbAlt,
  index = 0,
  className,
  style,
  ...rest
}) => {
  const thumbContent = thumbSrc ? (
    <img src={thumbSrc} alt={thumbAlt ?? ""} loading="lazy" />
  ) : thumb ? (
    thumb
  ) : (
    <span className={styles.thumbFallback} aria-hidden="true">
      <span className={styles.thumbFallbackGlyph}>{glyph}</span>
    </span>
  );
  return (
    <li
      className={cx(styles.row, className)}
      style={{ ...style, ["--i" as string]: index }}
      {...rest}
    >
      <a href={href}>
        <span className={styles.glyph}>{glyph}</span>
        <span className={styles.thumb}>{thumbContent}</span>
        <span className={styles.titleCell}>
          <span className={styles.title}>{title}</span>
          {showDescription && hasVisibleContent(description) ? (
            <span className={styles.description}>{description}</span>
          ) : null}
        </span>
        {meta && <span className={styles.meta}>{meta}</span>}
        {date ? (
          <time className={styles.date} dateTime={dateTime}>
            {date}
          </time>
        ) : null}
      </a>
    </li>
  );
};
