import React from "react";
import type { ContentStatus } from "./ContentEditor";
export interface StatusSelectProps {
    value: ContentStatus;
    onChange: (value: ContentStatus) => void;
}
export declare const StatusSelect: React.FC<StatusSelectProps>;
