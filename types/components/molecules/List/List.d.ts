import React from "react";
export type ListVariant = "plain" | "ruled" | "terminal";
export type ListMarker = "dot" | "dash" | "chevron" | "index" | "none";
export type ListDensity = "default" | "compact";
export interface ListItem {
    id?: string;
    title: React.ReactNode;
    description?: React.ReactNode;
    meta?: React.ReactNode;
    href?: string;
    marker?: React.ReactNode;
    action?: React.ReactNode;
}
export interface ListProps extends Omit<React.HTMLAttributes<HTMLOListElement | HTMLUListElement>, "children"> {
    items: ListItem[];
    as?: "ul" | "ol";
    variant?: ListVariant;
    marker?: ListMarker;
    density?: ListDensity;
    renderItem?: (item: ListItem, index: number) => React.ReactNode;
}
export declare const List: React.ForwardRefExoticComponent<ListProps & React.RefAttributes<HTMLOListElement | HTMLUListElement>>;
