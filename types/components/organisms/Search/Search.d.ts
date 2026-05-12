import React from "react";
import type { SearchHit, SearchResultListProps } from "../../molecules/SearchResult/SearchResult";
export interface SearchProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
    hits: SearchHit[];
    query?: string;
    defaultQuery?: string;
    onQueryChange?: (query: string) => void;
    placeholder?: string;
    prompt?: string;
    label?: string;
    emptyMessage?: React.ReactNode;
    minQueryLength?: number;
    maxResults?: number;
    filterHit?: (hit: SearchHit, query: string) => boolean;
    resultListProps?: Omit<SearchResultListProps, "hits" | "emptyMessage">;
}
export declare const Search: React.FC<SearchProps>;
