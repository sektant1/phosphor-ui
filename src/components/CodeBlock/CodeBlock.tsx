import React from "react";
import styles from "./CodeBlock.module.scss";
import { phosphorTheme } from "./phosphorTheme";

export interface CodeBlockProps {
  code: string;
  lang?: string;
  filename?: string;
  /** Pre-rendered Shiki HTML (for SSR/SSG — skips client-side highlight). */
  html?: string;
  className?: string;
}

export const CodeBlock: React.FC<CodeBlockProps> = ({
  code,
  lang = "text",
  filename,
  html: htmlProp,
  className,
}) => {
  const [html, setHtml] = React.useState(htmlProp ?? "");
  const [copied, setCopied] = React.useState(false);

  React.useEffect(() => {
    if (htmlProp) { setHtml(htmlProp); return; }
    let cancelled = false;
    import("shiki")
      .then(({ codeToHtml }) =>
        codeToHtml(code, { lang, theme: phosphorTheme as never })
      )
      .then((result) => { if (!cancelled) setHtml(result); })
      .catch(() => {});
    return () => { cancelled = true; };
  }, [code, lang, htmlProp]);

  const copy = () => {
    navigator.clipboard?.writeText(code).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    });
  };

  return (
    <div className={[styles.block, className ?? ""].filter(Boolean).join(" ")}>
      <div className={styles.bar}>
        <span className={styles.leds} aria-hidden="true">
          <span className={styles.led} />
          <span className={styles.led} />
          <span className={styles.led} />
        </span>
        {filename && (
          <span className={styles.filename}>
            <span className={styles.fileglyph} aria-hidden="true">▸</span>
            {filename}
          </span>
        )}
        <span className={styles.spacer} />
        {lang !== "text" && (
          <span className={styles.lang}>{lang}</span>
        )}
        <button
          type="button"
          className={[styles.copy, copied ? styles.copied : ""]
            .filter(Boolean)
            .join(" ")}
          onClick={copy}
          aria-label={copied ? "Copied" : "Copy code"}
        >
          {copied ? "✓ copied" : "⎘ copy"}
        </button>
      </div>

      {html ? (
        <div
          className={styles.code}
          dangerouslySetInnerHTML={{ __html: html }}
        />
      ) : (
        <pre className={styles.fallback}>
          <code>{code}</code>
        </pre>
      )}
    </div>
  );
};

/** Utility: extract lang + raw code from a MDX <pre><code> element. */
export function extractMdxCode(children: React.ReactNode): {
  code: string;
  lang: string;
} {
  const codeEl = React.Children.only(children) as React.ReactElement<{
    className?: string;
    children?: React.ReactNode;
  }>;
  const className = codeEl?.props?.className ?? "";
  const lang = className.replace("language-", "") || "text";
  const code = String(codeEl?.props?.children ?? "").trimEnd();
  return { code, lang };
}
