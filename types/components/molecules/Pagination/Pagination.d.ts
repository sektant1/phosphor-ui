import React from "react";
import "./Pagination.scss";
export interface PaginationProps extends Omit<React.HTMLAttributes<HTMLElement>, "onChange"> {
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
declare const Pagination: React.FC<PaginationProps>;
export default Pagination;
