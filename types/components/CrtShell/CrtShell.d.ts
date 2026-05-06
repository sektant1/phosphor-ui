import React from "react";
export interface CrtShellProps {
    children: React.ReactNode;
    disableTick?: boolean;
    disableNoise?: boolean;
    disableScanlines?: boolean;
    disableVignette?: boolean;
    disableFrame?: boolean;
    className?: string;
}
export declare const CrtShell: React.FC<CrtShellProps>;
