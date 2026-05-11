import React from "react";
import { cx } from "../../../utils/classNames";
import type { MDXComponents as ProviderComponents } from "mdx/types.js";
import Prose from "../../content/Prose";
import { Callout } from "../../molecules/Callout";
import { Hr } from "../../atoms/Hr";
import Link from "../../atoms/Link";
import { Kbd } from "../../atoms/Kbd";
import { Exercise } from "../../organisms/Exercise";
import { CodeBlock, extractMdxCode } from "../../content/CodeBlock";
import { PostFrontmatter } from "../../content/PostFrontmatter";
import type { PostFrontmatterData } from "../../content/PostFrontmatter";

type AnyProps = React.HTMLAttributes<HTMLElement>;

const Pass = <K extends keyof JSX.IntrinsicElements>(tag: K) => {
  const C = (props: JSX.IntrinsicElements[K]) =>
    React.createElement(tag, props);
  C.displayName = `Md${String(tag)}`;
  return C;
};

const MdPre: React.FC<AnyProps> = ({ children }) => {
  try {
    const { code, lang } = extractMdxCode(children);
    return <CodeBlock code={code} lang={lang} />;
  } catch {
    return <pre>{children}</pre>;
  }
};

const renderPostChild = (child: React.ReactNode): React.ReactNode => {
  if (!React.isValidElement(child)) return child;

  if (child.type === React.Fragment) {
    return React.cloneElement(child, {
      children: React.Children.map(child.props.children, renderPostChild),
    });
  }

  if (child.type === "pre") {
    return <MdPre {...(child.props as AnyProps)} />;
  }

  return child;
};

const MdBlockquote: React.FC<AnyProps> = ({ children, ...rest }) => (
  <Callout variant="quote" {...(rest as React.HTMLAttributes<HTMLDivElement>)}>
    {children}
  </Callout>
);

const MdHr: React.FC<AnyProps> = (props) => (
  <Hr {...(props as React.HTMLAttributes<HTMLHRElement>)} />
);

const MdImg: React.FC<React.ImgHTMLAttributes<HTMLImageElement>> = ({
  alt,
  ...rest
}) => (
  <figure className="pho-mdx-figure">
    <img alt={alt ?? ""} loading="lazy" {...rest} />
    {alt ? <figcaption>{alt}</figcaption> : null}
  </figure>
);

const MdA: React.FC<React.AnchorHTMLAttributes<HTMLAnchorElement>> = ({
  href,
  children,
  ...rest
}) => {
  const isExternal = !!href && /^https?:\/\//.test(href);
  return (
    <Link
      href={href}
      external={isExternal}
      {...rest}
    >
      {children}
    </Link>
  );
};

export const mdxComponents: ProviderComponents = {
  h1: Pass("h1"),
  h2: Pass("h2"),
  h3: Pass("h3"),
  h4: Pass("h4"),
  h5: Pass("h5"),
  h6: Pass("h6"),
  p: Pass("p"),
  ul: Pass("ul"),
  ol: Pass("ol"),
  li: Pass("li"),
  pre: MdPre,
  code: Pass("code"),
  table: Pass("table"),
  thead: Pass("thead"),
  tbody: Pass("tbody"),
  tr: Pass("tr"),
  th: Pass("th"),
  td: Pass("td"),
  hr: MdHr,
  blockquote: MdBlockquote,
  img: MdImg,
  a: MdA,
  kbd: Kbd,
  Callout,
  CodeBlock,
  Exercise,
};

export type MdxComponents = typeof mdxComponents;

export interface PostBodyProps {
  children: React.ReactNode;
  className?: string;
  rootClassName?: string;
  components?: ProviderComponents;
  frontmatter?: PostFrontmatterData;
  frontmatterLabel?: React.ReactNode;
  before?: React.ReactNode;
  after?: React.ReactNode;
}

export const PostBody: React.FC<PostBodyProps> = ({
  children,
  className,
  rootClassName,
  components,
  frontmatter,
  frontmatterLabel,
  before,
  after,
}) => {
  const ComponentProvider =
    React.useMemo(
      () => components ? { ...mdxComponents, ...components } : mdxComponents,
      [components],
    );

  return (
    <div
      className={cx("pho-post-body", rootClassName)}
      data-mdx-components={Object.keys(ComponentProvider).join(" ")}
    >
      {before}
      {frontmatter ? (
        <PostFrontmatter
          className="pho-post-body-frontmatter"
          data={frontmatter}
          label={frontmatterLabel}
        />
      ) : null}

      <Prose className={className}>
        {React.Children.map(children, renderPostChild)}
      </Prose>
      {after}
    </div>
  );
};
