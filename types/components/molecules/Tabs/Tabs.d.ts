import React from "react";
export interface TabItem {
    id: string;
    label: React.ReactNode;
    content: React.ReactNode;
    disabled?: boolean;
}
export interface TabsProps {
    items: TabItem[];
    value?: string;
    defaultValue?: string;
    onValueChange?: (value: string) => void;
    ariaLabel?: string;
    orientation?: "horizontal" | "vertical";
    lazy?: boolean;
    className?: string;
    listClassName?: string;
    tabClassName?: string;
    panelClassName?: string;
}
export declare const Tabs: React.FC<TabsProps>;
