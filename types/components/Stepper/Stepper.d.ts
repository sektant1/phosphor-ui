import React from "react";
export interface StepperItem {
    label: React.ReactNode;
    href?: string;
    num?: string;
    done?: boolean;
    current?: boolean;
}
export interface StepperProps {
    items: StepperItem[];
    separator?: string;
    className?: string;
    ariaLabel?: string;
}
export declare const Stepper: React.FC<StepperProps>;
export interface StepperFootLink {
    href: string;
    kind?: React.ReactNode;
    name: React.ReactNode;
}
export interface StepperFootProps {
    prev?: StepperFootLink;
    next?: StepperFootLink;
    className?: string;
}
export declare const StepperFoot: React.FC<StepperFootProps>;
