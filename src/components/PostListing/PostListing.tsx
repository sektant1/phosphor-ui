import React from "react";
import styles from "./PostListing.module.scss";

export interface PostRowProps {
  date: string;
  title: string;
  meta?: string;
  href: string;
  glyph?: string;
  thumb?: React.ReactNode;
  thumbSrc?: string;
  thumbAlt?: string;
  index?: number;
}

export interface PostListingProps {
  children: React.ReactNode;
  className?: string;
  headerLabels?: { glyph?: string; date?: string; post?: string; length?: string; thumb?: string };
}

export const PostListing: React.FC<PostListingProps> = ({
  children,
  className,
  headerLabels,
}) => {
  const labels = {
    glyph: "▌",
    date: "DATA",
    post: "POST",
    length: "LENGTH",
    thumb: "FRAME",
    ...(headerLabels ?? {}),
  };
  return (
    <div className={[styles.wrap, className ?? ""].join(" ")}>
      <div className={styles.header}>
        <span className={styles.hGlyph}>{labels.glyph}</span>
        <span className={styles.hThumb}>{labels.thumb}</span>
        <span>{labels.post}</span>
        <span className={styles.hLen}>{labels.length}</span>
        <span className={styles.hDate}>{labels.date}</span>
      </div>
      <ul className={styles.list}>{children}</ul>
    </div>
  );
};

export const PostRow: React.FC<PostRowProps> = ({
  date,
  title,
  meta,
  href,
  glyph = "▌",
  thumb,
  thumbSrc,
  thumbAlt,
  index = 0,
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
      className={styles.row}
      style={{ ["--i" as string]: index }}
    >
      <a href={href}>
        <span className={styles.glyph}>{glyph}</span>
        <span className={styles.thumb}>{thumbContent}</span>
        <span className={styles.title}>{title}</span>
        {meta && <span className={styles.meta}>{meta}</span>}
        <span className={styles.date}>{date}</span>
      </a>
    </li>
  );
};
