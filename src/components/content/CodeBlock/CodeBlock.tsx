import React from "react";
import type { BundledLanguage } from "shiki";
import styles from "./CodeBlock.module.scss";
import { phosphorTheme } from "./phosphorTheme";
import { copyText } from "../../../utils/browser";
import { cx } from "../../../utils/classNames";

type HighlightState = {
  html: string;
  failed: boolean;
};

const highlightCache = new Map<string, Promise<string>>();

const getHighlightKey = (code: string, lang: string) => `${lang}\u0000${code}`;

export async function codeToPhosphorHtml(
  code: string,
  lang = "text",
): Promise<string> {
  const normalizedLang = lang || "text";
  const key = getHighlightKey(code, normalizedLang);
  const cached = highlightCache.get(key);
  if (cached) return cached;

  const promise = import("shiki")
    .then(({ codeToHtml }) =>
      codeToHtml(code, {
        lang: normalizedLang as BundledLanguage,
        theme: phosphorTheme,
      }),
    )
    .catch((error) => {
      highlightCache.delete(key);
      throw error;
    });

  highlightCache.set(key, promise);
  return promise;
}

export interface CodeBlockProps {
  code: string;
  lang?: string;
  language?: string;
  filename?: string;
  /** Pre-rendered Shiki HTML (for SSR/SSG — skips client-side highlight). */
  html?: string;
  copyable?: boolean;
  copyLabel?: React.ReactNode;
  copiedLabel?: React.ReactNode;
  className?: string;
  "aria-label"?: string;
}

export const CodeBlock: React.FC<CodeBlockProps> = ({
  code,
  lang,
  language,
  filename,
  html: htmlProp,
  copyable = true,
  copyLabel = "⎘ copy",
  copiedLabel = "✓ copied",
  className,
  "aria-label": ariaLabel,
}) => {
  const resolvedLang = lang ?? language ?? "text";
  const [highlight, setHighlight] = React.useState<HighlightState>({
    html: "",
    failed: false,
  });
  const [copied, setCopied] = React.useState(false);

  const timerRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  React.useEffect(() => {
    if (htmlProp) {
      setHighlight({ html: "", failed: false });
      return;
    }
    let cancelled = false;
    setHighlight({ html: "", failed: false });
    codeToPhosphorHtml(code, resolvedLang)
      .then((result) => {
        if (!cancelled) setHighlight({ html: result, failed: false });
      })
      .catch(() => {
        if (!cancelled) setHighlight({ html: "", failed: true });
      });
    return () => {
      cancelled = true;
    };
  }, [code, resolvedLang, htmlProp]);

  React.useEffect(
    () => () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    },
    [],
  );

  const copy = React.useCallback(async () => {
    const didCopy = await copyText(code);
    if (!didCopy) return;
    setCopied(true);
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => setCopied(false), 1800);
  }, [code]);

  const highlightedHtml = htmlProp ?? highlight.html;
  const isHighlighting = !htmlProp && !highlightedHtml && !highlight.failed;
  const regionLabel =
    ariaLabel ??
    [filename, resolvedLang !== "text" ? resolvedLang : undefined, "code"]
      .filter(Boolean)
      .join(" ");

  return (
    <figure className={cx(styles.block, className)} aria-label={regionLabel}>
      <div className={styles.bar}>
        <span className={styles.leds} aria-hidden="true">
          <span className={styles.led} />
          <span className={styles.led} />
          <span className={styles.led} />
        </span>
        <span className={styles.identity}>
          {filename ? (
            <span className={styles.filename}>
              <span className={styles.fileglyph} aria-hidden="true">
                ▸
              </span>
              {filename}
            </span>
          ) : null}
        </span>
        <span className={styles.spacer} />
        {resolvedLang !== "text" && (
          <span className={styles.lang}>{resolvedLang}</span>
        )}
        {copyable ? (
          <button
            type="button"
            className={cx(styles.copy, copied && styles.copied)}
            onClick={copy}
            aria-label={copied ? "Copied" : "Copy code"}
          >
            {copied ? copiedLabel : copyLabel}
          </button>
        ) : null}
      </div>

      <div className={styles.viewport}>
        {highlightedHtml ? (
          <div
            className={styles.code}
            dangerouslySetInnerHTML={{ __html: highlightedHtml }}
          />
        ) : (
          <pre
            className={cx(styles.fallback, isHighlighting && styles.loading)}
            aria-busy={isHighlighting || undefined}
          >
            <code>{code}</code>
          </pre>
        )}
      </div>
    </figure>
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
