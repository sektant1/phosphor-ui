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
  showDescription?: boolean;
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
    <div className={cx(styles.wrap, className)} data-pho-component="PostListing" data-pho-slot="root" {...rest}>
      <div className={styles.header} data-pho-slot="header">
        <span className={styles.hGlyph} data-pho-slot="headerGlyph">{labels.glyph}</span>
        <span className={styles.hThumb} data-pho-slot="headerThumb">{labels.thumb}</span>
        <span className={styles.hPost} data-pho-slot="headerTitle">{labels.post}</span>
        <span className={styles.hLen} data-pho-slot="headerMeta">{labels.length}</span>
        <span className={styles.hDate} data-pho-slot="headerDate">{labels.date}</span>
      </div>
      {isEmpty ? (
        emptyState ?? <EmptyState glyph="[ 0 ]" title={emptyMessage} status />
      ) : (
        <ul className={styles.list} data-pho-slot="list">
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
  description,
  showDescription,
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
      data-pho-component="PostRow"
      data-pho-slot="row"
      {...rest}
    >
      <a href={href} data-pho-slot="link">
        <span className={styles.glyph} data-pho-slot="glyph">{glyph}</span>
        <span className={styles.thumb} data-pho-slot="thumb">{thumbContent}</span>
        <span className={styles.titleCell} data-pho-slot="titleCell">
          <span className={styles.title} data-pho-slot="title">{title}</span>
          {showDescription && hasVisibleContent(description) ? (
            <span className={styles.description} data-pho-slot="description">{description}</span>
          ) : null}
        </span>
        {meta && <span className={styles.meta} data-pho-slot="meta">{meta}</span>}
        {date ? (
          <time className={styles.date} dateTime={dateTime} data-pho-slot="date">
            {date}
          </time>
        ) : null}
      </a>
    </li>
  );
};
