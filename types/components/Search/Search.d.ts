import React from "react";
import type { SearchHit } from "../SearchResult/SearchResult";
export interface SearchProps {
    hits: SearchHit[];
    placeholder?: string;
    prompt?: string;
    label?: string;
    emptyMessage?: React.ReactNode;
    className?: string;
}
export declare const Search: React.FC<SearchProps>;
