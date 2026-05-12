import React from "react";
import type { PairColumn } from "./ContentEditor";
export type PairRow = Record<string, string>;
export interface PairListFieldProps {
    label: string;
    addLabel: string;
    columns: [PairColumn, PairColumn];
    rows: PairRow[];
    onChange: (rows: PairRow[]) => void;
}
export declare const PairListField: React.FC<PairListFieldProps>;
