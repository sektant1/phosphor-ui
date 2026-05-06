import React from "react";
export interface CodeBlockProps {
    code: string;
    lang?: string;
    filename?: string;
    /** Pre-rendered Shiki HTML (for SSR/SSG — skips client-side highlight). */
    html?: string;
    className?: string;
}
export declare const CodeBlock: React.FC<CodeBlockProps>;
/** Utility: extract lang + raw code from a MDX <pre><code> element. */
export declare function extractMdxCode(children: React.ReactNode): {
    code: string;
    lang: string;
};
