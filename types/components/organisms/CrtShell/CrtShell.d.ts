import React from "react";
export interface CrtShellProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
    disableTick?: boolean;
    disableNoise?: boolean;
    disableScanlines?: boolean;
    disableVignette?: boolean;
    disableFrame?: boolean;
}
export declare const CrtShell: React.FC<CrtShellProps>;
