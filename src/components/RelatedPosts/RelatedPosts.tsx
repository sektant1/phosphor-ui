import React from "react";
import styles from "./RelatedPosts.module.scss";

export interface RelatedPost {
  href: string;
  title: string;
  date?: string;
  tags?: string[];
}

export interface RelatedPostsProps {
  posts: RelatedPost[];
  label?: string;
  className?: string;
}

export const RelatedPosts: React.FC<RelatedPostsProps> = ({
  posts,
  label = "related transmissions",
  className,
}) => {
  return (
    <section className={[styles.wrap, className ?? ""].join(" ")}>
      <div className={styles.heading}>
        <span className={styles.headingGlyph}>▌</span>
        <span className={styles.headingLabel}>{label}</span>
      </div>
      <div className={styles.cards}>
        {posts.map((post, i) => (
          <a key={i} href={post.href} className={styles.card}>
            {post.date && <span className={styles.date}>{post.date}</span>}
            <span className={styles.title}>{post.title}</span>
            {post.tags && post.tags.length > 0 && (
              <span className={styles.tags}>
                {post.tags.map((tag) => (
                  <span key={tag} className={styles.tag}>#{tag}</span>
                ))}
              </span>
            )}
          </a>
        ))}
      </div>
    </section>
  );
};
