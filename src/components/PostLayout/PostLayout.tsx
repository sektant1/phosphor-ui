import React from "react";
import { PageLayout } from "../PageLayout";

export interface PostLayoutProps extends React.HTMLAttributes<HTMLElement> {
  header?: React.ReactNode;
  sidebar?: React.ReactNode;
  footer?: React.ReactNode;
  children: React.ReactNode;
  sidebarLabel?: string;
  stickySidebar?: boolean;
}

export const PostLayout = React.forwardRef<HTMLElement, PostLayoutProps>(
  (
    {
      header,
      sidebar,
      footer,
      children,
      sidebarLabel = "post sidebar",
      stickySidebar,
      ...rest
    },
    ref,
  ) => (
    <PageLayout
      ref={ref}
      variant="post"
      header={header}
      sidebar={sidebar}
      footer={footer}
      sidebarLabel={sidebarLabel}
      stickySidebar={stickySidebar}
      {...rest}
    >
      {children}
    </PageLayout>
  ),
);
PostLayout.displayName = "PostLayout";
