import React from "react";
import styles from "./PostHeader.module.scss";
import { cx } from "../../../utils/classNames";
import { H1 } from "../../atoms/Headings";
import { PostMeta } from "../../molecules/PostMeta";
import type { PostMetaProps } from "../../molecules/PostMeta";
import { Tag } from "../../atoms/Tag";
import { Cluster, Grid, Stack } from "../../templates/Layout";

type PostHeaderMetaProps = Omit<PostMetaProps, "className" | "tags"> & {
  tags?: string[];
};

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
  meta?: PostHeaderMetaProps;
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
  meta,
  actions,
  className,
  children,
  ...rest
}) => {
  const resolvedTags = tags ?? meta?.tags;

  return (
    <Stack as="header" gap="sm" className={cx(styles.root, className)} {...rest}>
      <Grid
        className={styles.top}
        columns="minmax(0, 1fr) auto"
        gap="md"
        mobileColumns="1fr"
        mobileGap="sm"
        align="start"
      >
        <Stack gap="sm" className={styles.copy}>
          {eyebrow ? <p className={styles.eyebrow}>{eyebrow}</p> : null}
          {resolvedTags && resolvedTags.length > 0 ? (
            <Cluster className={styles.tags} gap="0.45rem">
              {resolvedTags.map((tag, index) => (
                <Tag key={tag} color={index % 2 === 0 ? "phosphor" : "magenta"}>{tag}</Tag>
              ))}
            </Cluster>
          ) : null}
          <H1 className={styles.title}>{title}</H1>
          {subtitle ? <p className={styles.subtitle}>{subtitle}</p> : null}
        </Stack>
        {actions ? <Cluster className={styles.actions} gap="sm">{actions}</Cluster> : null}
      </Grid>

      <PostMeta
        className={styles.meta}
        date={date ?? meta?.date}
        readTime={readTime ?? meta?.readTime}
        wordCount={wordCount ?? meta?.wordCount}
        updated={updated ?? meta?.updated}
      />
      {children ? <div className={styles.extra}>{children}</div> : null}
    </Stack>
  );
};
