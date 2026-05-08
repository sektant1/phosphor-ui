import React from "react";
import { PostBody } from "../../content/MdxComponents";
import type { PostBodyProps } from "../../content/MdxComponents";
import { PostHeader } from "../../organisms/PostHeader";
import type { PostHeaderProps } from "../../organisms/PostHeader";
import { Page } from "../../templates/Page";
import type { PageProps } from "../../templates/Page";

export interface PostProps
  extends Omit<PageProps, "children" | "header" | "title" | "variant"> {
  title: PostHeaderProps["title"];
  children: React.ReactNode;
  header?: React.ReactNode;
  headerProps?: Omit<PostHeaderProps, "title" | "children">;
  headerExtra?: React.ReactNode;
  bodyProps?: Omit<PostBodyProps, "children">;
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
      sidebarLabel = "post sidebar",
      ...pageProps
    },
    ref,
  ) => {
    const resolvedHeader =
      header ?? (
        <PostHeader title={title} {...headerProps}>
          {headerExtra}
        </PostHeader>
      );

    return (
      <Page
        ref={ref}
        variant="post"
        header={resolvedHeader}
        sidebarLabel={sidebarLabel}
        {...pageProps}
      >
        <PostBody {...bodyProps}>{children}</PostBody>
      </Page>
    );
  },
);

Post.displayName = "Post";
