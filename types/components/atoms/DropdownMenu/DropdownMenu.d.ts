import React from "react";
export interface DropdownMenuItem {
    label: React.ReactNode;
    value: string;
    href?: string;
    target?: string;
    rel?: string;
    disabled?: boolean;
    destructive?: boolean;
}
export interface DropdownMenuProps extends Omit<React.HTMLAttributes<HTMLSpanElement>, "onSelect"> {
    label: React.ReactNode;
    items: DropdownMenuItem[];
    onSelect?: (value: string, item: DropdownMenuItem) => void;
    align?: "start" | "end";
    disabled?: boolean;
    menuLabel?: string;
    menuRole?: "menu" | "listbox";
    selectedValue?: string;
    triggerId?: string;
    triggerClassName?: string;
    menuClassName?: string;
    triggerProps?: Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "children" | "className" | "disabled" | "type">;
}
export declare const DropdownMenu: React.FC<DropdownMenuProps>;
