import React from "react";
import styles from "./RelatedPosts.module.scss";
import { cx } from "../../../utils/classNames";
import { EmptyState } from "../../molecules/EmptyState";
import { Cluster, Grid, Stack } from "../../templates/Layout";

export interface RelatedPost {
  id?: string;
  href: string;
  title: React.ReactNode;
  date?: React.ReactNode;
  tags?: string[];
}

export interface RelatedPostsProps extends React.HTMLAttributes<HTMLElement> {
  posts: RelatedPost[];
  label?: React.ReactNode;
  emptyMessage?: React.ReactNode;
  emptyState?: React.ReactNode;
}

export const RelatedPosts: React.FC<RelatedPostsProps> = ({
  posts,
  label = "related transmissions",
  emptyMessage = "no related posts.",
  emptyState,
  className,
  ...rest
}) => {
  return (
    <Stack as="section" gap="sm" className={cx(styles.wrap, className)} {...rest}>
      <Cluster className={styles.heading} gap="0.4ch">
        <span className={styles.headingGlyph}>▌</span>
        <span className={styles.headingLabel}>{label}</span>
      </Cluster>
      {posts.length === 0 ? (
        emptyState ?? <EmptyState glyph="[ 0 ]" title={emptyMessage} status />
      ) : (
        <Grid className={styles.cards} minItemWidth="10rem" gap="sm">
        {posts.map((post, i) => (
          <Stack
            as="a"
            key={post.id ?? post.href ?? i}
            href={post.href}
            gap="xs"
            className={styles.card}
          >
            {post.date && <span className={styles.date}>{post.date}</span>}
            <span className={styles.title}>{post.title}</span>
            {post.tags && post.tags.length > 0 && (
              <Cluster as="span" className={styles.tags} gap="0.3ch">
                {post.tags.map((tag) => (
                  <span key={tag} className={styles.tag}>#{tag}</span>
                ))}
              </Cluster>
            )}
          </Stack>
        ))}
        </Grid>
      )}
    </Stack>
  );
};
