import React from "react";
export interface FeatureListItemData {
    id?: string;
    title: React.ReactNode;
    body: React.ReactNode;
}
export interface FeatureListItemProps extends Omit<React.LiHTMLAttributes<HTMLLIElement>, "title"> {
    title: React.ReactNode;
    body: React.ReactNode;
}
export interface FeatureListProps extends Omit<React.HTMLAttributes<HTMLUListElement>, "children"> {
    items: FeatureListItemData[];
    renderItem?: (item: FeatureListItemData, index: number) => React.ReactNode;
}
export declare const FeatureListItem: React.ForwardRefExoticComponent<FeatureListItemProps & React.RefAttributes<HTMLLIElement>>;
export declare const FeatureList: React.ForwardRefExoticComponent<FeatureListProps & React.RefAttributes<HTMLUListElement>>;
