import React from "react";
import "./SearchResult.scss";
export interface SearchHit {
    href: string;
    title: React.ReactNode;
    date?: React.ReactNode;
    tags?: React.ReactNode[];
    snippet?: React.ReactNode;
}
export interface SearchResultProps extends React.HTMLAttributes<HTMLLIElement> {
    hit: SearchHit;
}
export declare const SearchResult: React.FC<SearchResultProps>;
export interface SearchResultListProps extends React.HTMLAttributes<HTMLUListElement> {
    hits: SearchHit[];
    emptyMessage?: React.ReactNode;
}
declare const SearchResultList: React.FC<SearchResultListProps>;
export default SearchResultList;
