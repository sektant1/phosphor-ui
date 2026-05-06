import React from "react";
export interface FooterObject {
    trefoil?: string;
    stamp?: string;
    fields?: {
        label: string;
        value: React.ReactNode;
    }[];
}
export interface FooterDossier {
    heading?: string;
    fields?: {
        label: string;
        value: React.ReactNode;
    }[];
    links?: {
        label: string;
        href: string;
        glyph?: string;
    }[];
}
export interface FooterRxRow {
    label: string;
    bars?: string;
    value: React.ReactNode;
}
export interface FooterRx {
    heading?: string;
    rows?: FooterRxRow[];
    status?: {
        label: string;
        value: React.ReactNode;
    };
}
export interface FooterStencilProps {
    tape?: string;
    tapeSpeed?: number;
    object?: FooterObject;
    dossier?: FooterDossier;
    rx?: FooterRx;
    prompt?: string;
    eofMark?: string;
    eofText?: string;
    className?: string;
}
export declare const FooterStencil: React.FC<FooterStencilProps>;
