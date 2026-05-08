import React from "react";
import { Header, Footer, CrtShell, NerdTree, Flex, Grid } from "../components";
import type { NerdTreeNode } from "../components";
import { useHashRoute as useLibHashRoute, useReadingProgress } from "../hooks";
import { cx } from "../utils/classNames";
import "./demo.scss";

export type Route = "home" | "post" | "course";

export const useHashRoute = () =>
  useLibHashRoute<Route>({
    routes: {
      post: /^#\/posts/,
      course: /^#\/courses/,
      home: /.*/,
    },
    fallback: "home",
  });

export { useReadingProgress };

export const SITE_TITLE = "phosphor ui";
export const SITE_TAGLINE = "// СЕКРЕТНО // single-channel transmissions";

export const NAV_ITEMS = [
  { label: "home", href: "#/" },
  { label: "posts", href: "#/posts" },
  { label: "courses", href: "#/courses" },
  { label: "archive", href: "#/archive" },
  { label: "contact", href: "#/contact" },
];

export const SiteHeader: React.FC<{ active?: string }> = ({ active }) => (
  <Header
    title={SITE_TITLE}
    homeHref="#/"
    tagline={SITE_TAGLINE}
    align="center"
    nav={NAV_ITEMS.map((n) => ({
      label: n.label,
      href: n.href,
      active: n.label === active,
    }))}
    locales={[
      { code: "en", label: "EN", href: "#/?lang=en", active: true },
      { code: "ru", label: "RU", href: "#/?lang=ru" },
    ]}
  />
);

export const SiteFooter: React.FC = () => (
  <Footer
    brand="phosphor ui"
    year={2026}
    links={[
      { label: "rss", href: "#/rss" },
      { label: "log", href: "#/log" },
      { label: "contact", href: "#/contact" },
      { label: "github", href: "https://github.com" },
    ]}
    status={{ label: "link", value: "STABLE" }}
    prompt="~/phosphor-ui $"
    command="logout"
  />
);

const buildTree = (active?: string): NerdTreeNode[] => [
  {
    kind: "dir",
    label: "zone-net/",
    defaultOpen: true,
    children: [
      {
        kind: "leaf",
        label: "index.md",
        href: "#/",
        active: active === "home",
      },
      {
        kind: "dir",
        label: "posts/",
        defaultOpen: active === "posts",
        children: [
          {
            kind: "leaf",
            label: "boot-the-terminal.md",
            href: "#/posts/boot-the-terminal",
            active: active === "posts",
          },
          {
            kind: "leaf",
            label: "decode-the-signal.md",
            href: "#/posts/decode-the-signal",
          },
          {
            kind: "leaf",
            label: "phosphor-protocol-intro.md",
            href: "#/posts/phosphor-protocol-intro",
          },
          {
            kind: "leaf",
            label: "anomaly-catalog-1.md",
            href: "#/posts/anomaly-catalog-1",
          },
          {
            kind: "leaf",
            label: "cold-cathode.md",
            href: "#/posts/cold-cathode",
          },
        ],
      },
      {
        kind: "dir",
        label: "courses/",
        defaultOpen: active === "courses",
        children: [
          {
            kind: "leaf",
            label: "cold-boot.md",
            href: "#/courses/cold-boot",
            active: active === "courses",
          },
          {
            kind: "leaf",
            label: "signal-decoding.md",
            href: "#/courses/signal-decoding",
          },
          {
            kind: "leaf",
            label: "anomaly-triage.md",
            href: "#/courses/anomaly-triage",
          },
        ],
      },
      {
        kind: "dir",
        label: "archive/",
        defaultOpen: false,
        children: [
          { kind: "leaf", label: "2025.md", href: "#/archive/2025" },
          { kind: "leaf", label: "2024.md", href: "#/archive/2024" },
        ],
      },
      { kind: "leaf", label: "contact.md", href: "#/contact" },
    ],
  },
  {
    kind: "dir",
    label: ".meta/",
    defaultOpen: false,
    children: [
      { kind: "leaf", label: "rss.xml", href: "#/rss" },
      { kind: "leaf", label: "robots.txt", href: "#/robots" },
    ],
  },
];

export const SiteTree: React.FC<{ active?: string }> = ({ active }) => (
  <NerdTree
    title="~/zone-net"
    bufferLabel="[content/]"
    hint="γ-2 // single-channel"
    command=":NERDTree"
    footerMeta="42 files · 7 dirs"
    tree={buildTree(active)}
  />
);

type DemoGap = "xs" | "sm" | "md" | "lg" | "xl";
type DemoSpace = "none" | "sm" | "md" | "lg";
type DemoContainerTag = "div" | "section" | "article" | "header" | "aside";

interface DemoContainerProps extends React.HTMLAttributes<HTMLElement> {
  as?: DemoContainerTag;
  gap?: DemoGap;
  space?: DemoSpace;
  fade?: boolean;
  stagger?: boolean;
}

const getDemoClassName = ({
  baseClass,
  space,
  fade,
  stagger,
  className,
}: {
  baseClass: string;
  space: DemoSpace;
  fade: boolean;
  stagger: boolean;
  className?: string;
}) =>
  cx(
    baseClass,
    space !== "none" && `demo-space--${space}`,
    fade && "pho-fade-up",
    stagger && "pho-stagger",
    className,
  );

export const DemoSection: React.FC<DemoContainerProps> = ({
  as = "section",
  gap = "md",
  space = "none",
  fade = false,
  stagger = false,
  className,
  children,
  ...rest
}) => (
  <Grid
    as={as}
    columns="1fr"
    gap={gap}
    className={getDemoClassName({
      baseClass: "demo-section",
      space,
      fade,
      stagger,
      className,
    })}
    {...rest}
  >
    {children}
  </Grid>
);

export const DemoStack: React.FC<DemoContainerProps> = ({
  as = "div",
  gap = "md",
  space = "none",
  fade = false,
  stagger = false,
  className,
  children,
  ...rest
}) => (
  <Flex
    as={as}
    direction="column"
    gap={gap}
    className={getDemoClassName({
      baseClass: "demo-stack",
      space,
      fade,
      stagger,
      className,
    })}
    {...rest}
  >
    {children}
  </Flex>
);

export const DemoCluster: React.FC<DemoContainerProps> = ({
  as = "div",
  gap = "sm",
  space = "none",
  fade = false,
  stagger = false,
  className,
  children,
  ...rest
}) => (
  <Flex
    as={as}
    align="center"
    wrap="wrap"
    gap={gap}
    className={getDemoClassName({
      baseClass: "demo-cluster",
      space,
      fade,
      stagger,
      className,
    })}
    {...rest}
  >
    {children}
  </Flex>
);

export const DemoGrid: React.FC<DemoContainerProps> = ({
  as = "div",
  gap = "md",
  space = "none",
  fade = false,
  stagger = false,
  className,
  children,
  ...rest
}) => (
  <Grid
    as={as}
    minItemWidth="20rem"
    gap={gap}
    mobileColumns="1fr"
    className={getDemoClassName({
      baseClass: "demo-card-grid",
      space,
      fade,
      stagger,
      className,
    })}
    {...rest}
  >
    {children}
  </Grid>
);

export const DemoSplit: React.FC<DemoContainerProps> = ({
  as = "div",
  gap = "lg",
  space = "none",
  fade = false,
  stagger = false,
  className,
  children,
  ...rest
}) => (
  <Grid
    as={as}
    columns="minmax(0, 1fr) minmax(220px, 280px)"
    mobileColumns="1fr"
    gap={gap}
    align="start"
    className={getDemoClassName({
      baseClass: "demo-split",
      space,
      fade,
      stagger,
      className,
    })}
    {...rest}
  >
    {children}
  </Grid>
);

export const Page: React.FC<{
  active?: string;
  children: React.ReactNode;
  routeKey?: string;
}> = ({ active, children, routeKey }) => (
  <CrtShell>
    <div className="demo-shell">
      <SiteHeader active={active} />

      <Grid
        className="demo-layout"
        columns="minmax(220px, 260px) minmax(0, 1fr)"
        mobileColumns="1fr"
        gap="lg"
        align="start"
      >
        <aside className="demo-aside">
          <SiteTree active={active} />
        </aside>

        <main
          key={routeKey ?? active ?? "main"}
          className="demo-main pho-page-enter"
        >
          {children}
        </main>
      </Grid>
    </div>

    <SiteFooter />
  </CrtShell>
);
