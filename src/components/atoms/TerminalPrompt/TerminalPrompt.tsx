import React from "react";
import styles from "./TerminalPrompt.module.scss";

export interface TerminalPromptProps {
  prompt?: string;
  command: string;
  cursor?: boolean;
  className?: string;
}

export const TerminalPrompt: React.FC<TerminalPromptProps> = ({
  prompt = "~/zone-net $",
  command,
  cursor = false,
  className,
}) => (
  <div className={[styles.row, className ?? ""].join(" ")}>
    <span className={styles.prompt}>{prompt}</span>
    <span className={styles.typed}>{command}</span>
    {cursor && <span className={styles.cursor} aria-hidden="true">▮</span>}
  </div>
);
