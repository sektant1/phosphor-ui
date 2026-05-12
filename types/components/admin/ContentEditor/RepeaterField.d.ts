import React from "react";
export type ListRow = Record<string, unknown> & {
    id?: string;
};
export interface RepeaterFieldProps {
    label: string;
    addLabel: string;
    placeholder: string;
    leading?: string;
    itemKey?: string;
    rows: ListRow[];
    createRow: () => ListRow;
    getString: (value: unknown) => string;
    onChange: (rows: ListRow[]) => void;
}
export declare const RepeaterField: React.FC<RepeaterFieldProps>;
