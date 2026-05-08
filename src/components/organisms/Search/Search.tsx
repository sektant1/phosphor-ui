import React, { useState, useMemo, useId } from "react";
import { Input } from "../../atoms/Input/Input";
import SearchResultList from "../../molecules/SearchResult/SearchResult";
import type { SearchHit } from "../../molecules/SearchResult/SearchResult";
import styles from "./Search.module.scss";

export interface SearchProps {
  hits: SearchHit[];
  placeholder?: string;
  prompt?: string;
  label?: string;
  emptyMessage?: React.ReactNode;
  className?: string;
}

function normalize(s: React.ReactNode): string {
  if (typeof s === "string") return s.toLowerCase();
  if (typeof s === "number") return String(s);
  return "";
}

function matches(hit: SearchHit, query: string): boolean {
  const q = query.toLowerCase().trim();
  if (!q) return true;
  return (
    normalize(hit.title).includes(q) ||
    normalize(hit.snippet).includes(q) ||
    (hit.tags ?? []).some((t) => normalize(t).includes(q))
  );
}

function highlight(text: React.ReactNode, query: string): React.ReactNode {
  if (typeof text !== "string" || !query.trim()) return text;
  const q = query.trim();
  const regex = new RegExp(`(${q.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`, "gi");
  const parts = text.split(regex);
  const matchRe = new RegExp(`^${q.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}$`, "i");
  return parts.map((part, i) =>
    matchRe.test(part) ? <mark key={i}>{part}</mark> : part
  );
}

function highlightHit(hit: SearchHit, query: string): SearchHit {
  return {
    ...hit,
    title:   highlight(hit.title,   query),
    snippet: highlight(hit.snippet, query),
  };
}

export const Search: React.FC<SearchProps> = ({
  hits,
  placeholder = "search transmissions...",
  prompt = "/>",
  label = "search",
  emptyMessage,
  className,
}) => {
  const [query, setQuery] = useState("");
  const id = useId();
  const results = useMemo(
    () =>
      query.trim()
        ? hits.filter((h) => matches(h, query)).map((h) => highlightHit(h, query))
        : [],
    [hits, query]
  );
  const showResults = query.trim().length > 0;

  return (
    <div className={[styles.wrap, className ?? ""].join(" ")} role="search">
      <label htmlFor={id} className={styles.label}>
        {label}
      </label>
      <Input
        id={id}
        prompt={prompt}
        placeholder={placeholder}
        cursor={false}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        aria-controls={`${id}-results`}
        aria-autocomplete="list"
        autoComplete="off"
        spellCheck={false}
      />
      {showResults && (
        <div id={`${id}-results`} className={styles.results} role="region" aria-live="polite">
          <p className={styles.count}>
            {results.length > 0
              ? `${results.length} match${results.length === 1 ? "" : "es"}`
              : null}
          </p>
          <SearchResultList
            hits={results}
            emptyMessage={emptyMessage ?? "no transmissions found."}
          />
        </div>
      )}
    </div>
  );
};
