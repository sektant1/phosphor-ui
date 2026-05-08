import React, { useState } from "react";
import "./Pagination.scss";

export interface PaginationProps
  extends Omit<React.HTMLAttributes<HTMLElement>, "onChange"> {
  page?: number;
  defaultPage?: number;
  totalPages: number;
  prevHref?: string;
  nextHref?: string;
  prevLabel?: React.ReactNode;
  nextLabel?: React.ReactNode;
  marker?: React.ReactNode;
  onPrev?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
  onNext?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
  onPageChange?: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  page,
  defaultPage = 1,
  totalPages,
  prevHref,
  nextHref,
  prevLabel = "← prev",
  nextLabel = "next →",
  marker,
  onPrev,
  onNext,
  onPageChange,
  className,
  ...rest
}) => {
  const isControlled = page !== undefined;
  const [internalPage, setInternalPage] = useState(defaultPage);
  const current = isControlled ? (page as number) : internalPage;

  const setPage = (next: number) => {
    const clamped = Math.max(1, Math.min(totalPages, next));
    if (!isControlled) setInternalPage(clamped);
    onPageChange?.(clamped);
  };

  const handlePrev = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (onPrev) {
      onPrev(e);
      return;
    }
    if (!prevHref) e.preventDefault();
    setPage(current - 1);
  };

  const handleNext = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (onNext) {
      onNext(e);
      return;
    }
    if (!nextHref) e.preventDefault();
    setPage(current + 1);
  };

  const hasPrev = current > 1;
  const hasNext = current < totalPages;
  const cls = ["pho-pagination", className].filter(Boolean).join(" ");
  const markerNode = marker ?? `[ ${current} / ${totalPages} ]`;

  return (
    <nav className={cls} aria-label="Pagination" {...rest}>
      {hasPrev ? (
        <a className="pho-pagination__link page-prev" href={prevHref ?? "#"} onClick={handlePrev}>
          {prevLabel}
        </a>
      ) : (
        <span className="pho-pagination__link disabled page-prev">{prevLabel}</span>
      )}
      <span className="pho-pagination__marker page-marker">{markerNode}</span>
      {hasNext ? (
        <a className="pho-pagination__link page-next" href={nextHref ?? "#"} onClick={handleNext}>
          {nextLabel}
        </a>
      ) : (
        <span className="pho-pagination__link disabled page-next">{nextLabel}</span>
      )}
    </nav>
  );
};

export default Pagination;
