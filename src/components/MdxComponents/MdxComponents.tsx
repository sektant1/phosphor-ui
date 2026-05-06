import React from "react";
import { MDXProvider } from "@mdx-js/react";
import Prose from "../Prose";
import { Callout } from "../Callout";
import { Hr } from "../Hr";
import { Exercise } from "../Exercise";
import { CodeBlock, extractMdxCode } from "../CodeBlock";

type AnyProps = React.HTMLAttributes<HTMLElement> & { [key: string]: unknown };

const Pass = (tag: keyof JSX.IntrinsicElements) => {
  const C: React.FC<AnyProps> = (props) => React.createElement(tag, props);
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
    <a
      href={href}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noopener noreferrer" : undefined}
      {...rest}
    >
      {children}
    </a>
  );
};

export const mdxComponents = {
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
  Exercise,
};

export type MdxComponents = typeof mdxComponents;

export interface PostBodyProps {
  children: React.ReactNode;
  className?: string;
}

export const PostBody: React.FC<PostBodyProps> = ({ children, className }) => (
  <MDXProvider components={mdxComponents as never}>
    <Prose className={className}>{children}</Prose>
  </MDXProvider>
);
