import React from "react";
import styles from "./Post.module.scss";
import { cx } from "../../../utils/classNames";
import { PostBody } from "../../content/MdxComponents";
import type { PostBodyProps } from "../../content/MdxComponents";
import { PostHeader } from "../../organisms/PostHeader";
import type { PostHeaderProps } from "../../organisms/PostHeader";
import type { PostFrontmatterData } from "../../content/PostFrontmatter";
import { ThreePanelLayout } from "../ThreePanelLayout";

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
  leftPanel?: React.ReactNode;
  rightPanel?: React.ReactNode;
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
      leftPanel,
      rightPanel,
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
    const resolvedRightPanel = rightPanel ?? sidebar;
    const hasRightPanel =
      resolvedRightPanel !== null &&
      resolvedRightPanel !== undefined &&
      resolvedRightPanel !== false;
    const hasLeftPanel =
      leftPanel !== null && leftPanel !== undefined && leftPanel !== false;
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
        <ThreePanelLayout
          className={cx(
            styles.content,
            hasLeftPanel && styles.withLeftPanel,
            hasRightPanel && styles.withSidebar,
            contentClassName,
          )}
          mainAs="div"
          left={leftPanel}
          leftLabel="post navigation"
          right={resolvedRightPanel}
          rightLabel={sidebarLabel}
          rightClassName={cx(styles.sidebar, sidebarClassName)}
          sticky={stickySidebar}
          main={
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
          }
        />
        {afterContent}
        {footer ? <footer className={styles.footer}>{footer}</footer> : null}
      </article>
    );
  },
);

Post.displayName = "Post";

export const PostTemplate = Post;
export type PostTemplateProps = PostProps;
