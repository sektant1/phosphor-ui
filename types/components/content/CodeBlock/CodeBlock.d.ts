import React from "react";
export declare function codeToPhosphorHtml(code: string, lang?: string): Promise<string>;
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
export declare const CodeBlock: React.FC<CodeBlockProps>;
/** Utility: extract lang + raw code from a MDX <pre><code> element. */
export declare function extractMdxCode(children: React.ReactNode): {
    code: string;
    lang: string;
};
