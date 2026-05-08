import { Page } from "../Page";
import type { PageProps, PageSidebarPosition, PageVariant } from "../Page";

export type PageLayoutVariant = PageVariant;
export type PageLayoutSidebarPosition = PageSidebarPosition;
export type PageLayoutProps = PageProps;

/**
 * @deprecated Use `Page` from the templates layer instead.
 */
export const PageLayout = Page;
