import React, { useMemo, useId } from "react";
import { Input } from "../../atoms/Input";
import SearchResultList from "../../molecules/SearchResult/SearchResult";
import type { SearchHit, SearchResultListProps } from "../../molecules/SearchResult/SearchResult";
import { cx } from "../../../utils/classNames";
import styles from "./Search.module.scss";

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
  query: queryProp,
  defaultQuery = "",
  onQueryChange,
  placeholder = "search transmissions...",
  prompt = "/>",
  label = "search",
  emptyMessage,
  minQueryLength = 1,
  maxResults,
  filterHit = matches,
  resultListProps,
  className,
  ...rest
}) => {
  const [internalQuery, setInternalQuery] = React.useState(defaultQuery);
  const query = queryProp ?? internalQuery;
  const isControlled = queryProp !== undefined;
  const id = useId();
  const results = useMemo(
    () => {
      const trimmed = query.trim();
      if (trimmed.length < minQueryLength) return [];
      const filtered = hits.filter((h) => filterHit(h, trimmed));
      const sliced = typeof maxResults === "number" ? filtered.slice(0, maxResults) : filtered;
      return sliced.map((h) => highlightHit(h, trimmed));
    },
    [filterHit, hits, maxResults, minQueryLength, query],
  );
  const showResults = query.trim().length >= minQueryLength;
  const setQuery = (next: string) => {
    if (!isControlled) setInternalQuery(next);
    onQueryChange?.(next);
  };

  return (
    <div className={cx(styles.wrap, className)} role="search" {...rest}>
      <label htmlFor={id} className={styles.label}>
        {label}
      </label>
      <Input
        id={id}
        prompt={prompt}
        placeholder={placeholder}
        cursor={false}
        value={query}
        onValueChange={setQuery}
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
            {...resultListProps}
            hits={results}
            emptyMessage={emptyMessage ?? "no transmissions found."}
          />
        </div>
      )}
    </div>
  );
};
