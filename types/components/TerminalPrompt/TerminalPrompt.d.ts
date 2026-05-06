import React from "react";
export interface TerminalPromptProps {
    prompt?: string;
    command: string;
    cursor?: boolean;
    className?: string;
}
export declare const TerminalPrompt: React.FC<TerminalPromptProps>;
