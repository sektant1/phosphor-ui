import React from "react";
import "./SearchResult.scss";
import { EmptyState } from "../EmptyState";

export interface SearchHit {
  id?: string;
  href: string;
  title: React.ReactNode;
  date?: React.ReactNode;
  tags?: React.ReactNode[];
  snippet?: React.ReactNode;
}

export interface SearchResultProps extends React.HTMLAttributes<HTMLLIElement> {
  hit: SearchHit;
}

export const SearchResult: React.FC<SearchResultProps> = ({
  hit,
  className,
  ...rest
}) => {
  const cls = ["pho-search-hit search-hit", className].filter(Boolean).join(" ");
  return (
    <li className={cls} {...rest}>
      <a href={hit.href}>
        {hit.date ? <span className="hit-date">{hit.date}</span> : null}
        <span className="hit-title">{hit.title}</span>
        {hit.tags && hit.tags.length > 0 ? (
          <span className="hit-tags">
            {hit.tags.map((t, i) => (
              <React.Fragment key={i}>
                {i > 0 ? " " : null}
                {t}
              </React.Fragment>
            ))}
          </span>
        ) : null}
        {hit.snippet ? <p className="hit-snippet">{hit.snippet}</p> : null}
      </a>
    </li>
  );
};

export interface SearchResultListProps
  extends React.HTMLAttributes<HTMLUListElement> {
  hits: SearchHit[];
  emptyMessage?: React.ReactNode;
  emptyState?: React.ReactNode;
  getHitKey?: (hit: SearchHit, index: number) => React.Key;
  renderHit?: (hit: SearchHit, index: number) => React.ReactNode;
}

const SearchResultList: React.FC<SearchResultListProps> = ({
  hits,
  emptyMessage = "no matches found.",
  emptyState,
  getHitKey = (hit, index) => hit.id ?? hit.href ?? index,
  renderHit,
  className,
  ...rest
}) => {
  const cls = ["pho-search-list search-list", className].filter(Boolean).join(" ");
  if (hits.length === 0) {
    return emptyState ? (
      <>{emptyState}</>
    ) : (
      <div className="pho-search-miss search-miss" role="status">
        <EmptyState glyph="[ ? ]" title={emptyMessage} status />
      </div>
    );
  }
  return (
    <ul className={cls} {...rest}>
      {hits.map((hit, index) => (
        renderHit ? (
          <React.Fragment key={getHitKey(hit, index)}>{renderHit(hit, index)}</React.Fragment>
        ) : (
          <SearchResult key={getHitKey(hit, index)} hit={hit} />
        )
      ))}
    </ul>
  );
};

export default SearchResultList;
