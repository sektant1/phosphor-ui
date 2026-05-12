import React from "react";
export type ToastVariant = "info" | "success" | "warn" | "error";
export interface ToastProps {
    message: string;
    variant?: ToastVariant;
    visible?: boolean;
    inline?: boolean;
    onDismiss?: () => void;
    className?: string;
}
export declare const Toast: React.FC<ToastProps>;
export declare function useToast(duration?: number): {
    visible: boolean;
    message: string;
    variant: ToastVariant;
    show: (msg: string, variant?: ToastVariant) => void;
    dismiss: () => void;
};
