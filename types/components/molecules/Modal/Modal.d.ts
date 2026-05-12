import React from "react";
type OverlayCommonProps = {
    open: boolean;
    onClose: () => void;
    title?: React.ReactNode;
    description?: React.ReactNode;
    closeLabel?: string;
    closeOnEscape?: boolean;
    closeOnOverlayClick?: boolean;
    footer?: React.ReactNode;
    children?: React.ReactNode;
    className?: string;
};
export interface ModalProps extends OverlayCommonProps {
    overlayClassName?: string;
}
export declare const Modal: React.FC<ModalProps>;
export type DrawerSide = "left" | "right";
export interface DrawerProps extends OverlayCommonProps {
    side?: DrawerSide;
    width?: string;
    overlayClassName?: string;
}
export declare const Drawer: React.FC<DrawerProps>;
export {};
