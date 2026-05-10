import React from "react";
import styles from "./Post.module.scss";
import { cx } from "../../../utils/classNames";
import { PostBody } from "../../content/MdxComponents";
import type { PostBodyProps } from "../../content/MdxComponents";
import { PostHeader } from "../../organisms/PostHeader";
import type { PostHeaderProps } from "../../organisms/PostHeader";
import type { PostFrontmatterData } from "../../content/PostFrontmatter";

export interface PostProps
  extends Omit<React.HTMLAttributes<HTMLElement>, "title"> {
  title: PostHeaderProps["title"];
  children: React.ReactNode;
  header?: React.ReactNode;
  headerProps?: Omit<PostHeaderProps, "title" | "children">;
  headerExtra?: React.ReactNode;
  bodyProps?: Omit<PostBodyProps, "children">;
  frontmatter?: PostFrontmatterData;
  frontmatterLabel?: React.ReactNode;
  beforeContent?: React.ReactNode;
  betweenHeaderAndBody?: React.ReactNode;
  beforeBody?: React.ReactNode;
  afterBody?: React.ReactNode;
  afterContent?: React.ReactNode;
  sidebar?: React.ReactNode;
  sidebarLabel?: string;
  footer?: React.ReactNode;
  stickySidebar?: boolean;
  contentClassName?: string;
  sidebarClassName?: string;
}

export const Post = React.forwardRef<HTMLElement, PostProps>(
  (
    {
      title,
      children,
      header,
      headerProps,
      headerExtra,
      bodyProps,
      frontmatter,
      frontmatterLabel,
      beforeContent,
      betweenHeaderAndBody,
      beforeBody,
      afterBody,
      afterContent,
      sidebar,
      sidebarLabel = "post sidebar",
      footer,
      stickySidebar = true,
      contentClassName,
      sidebarClassName,
      className,
      ...rest
    },
    ref,
  ) => {
    const hasSidebar =
      sidebar !== null && sidebar !== undefined && sidebar !== false;
    const resolvedHeader =
      header ?? (
        <PostHeader title={title} {...headerProps}>
          {headerExtra}
        </PostHeader>
      );

    return (
      <article
        ref={ref}
        className={cx(styles.root, className)}
        {...rest}
      >
        {beforeContent}
        <div
          className={cx(
            styles.content,
            hasSidebar && styles.withSidebar,
            contentClassName,
          )}
        >
          <div className={styles.main}>
            {resolvedHeader}
            {betweenHeaderAndBody}
            <PostBody
              frontmatter={frontmatter}
              frontmatterLabel={frontmatterLabel}
              before={beforeBody}
              after={afterBody}
              {...bodyProps}
            >
              {children}
            </PostBody>
          </div>

          {hasSidebar ? (
            <aside
              className={cx(
                styles.sidebar,
                stickySidebar && styles.stickySidebar,
                sidebarClassName,
              )}
              aria-label={sidebarLabel}
            >
              {sidebar}
            </aside>
          ) : null}
        </div>
        {afterContent}
        {footer ? <footer className={styles.footer}>{footer}</footer> : null}
      </article>
    );
  },
);

Post.displayName = "Post";

export const PostTemplate = Post;
export type PostTemplateProps = PostProps;
