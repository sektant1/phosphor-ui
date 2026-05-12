import React from "react";
export interface ArticleListItem {
    id?: string;
    title: React.ReactNode;
    href: string;
    meta?: React.ReactNode;
    description?: React.ReactNode;
}
export interface ArticleListProps extends React.HTMLAttributes<HTMLUListElement> {
    items: ArticleListItem[];
    glyph?: React.ReactNode;
    renderItem?: (item: ArticleListItem, index: number) => React.ReactNode;
}
export declare const ArticleList: React.FC<ArticleListProps>;
