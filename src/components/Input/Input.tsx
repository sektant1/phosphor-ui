import React from "react";
import styles from "./Input.module.scss";
import { cx } from "../../utils/classNames";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  prompt?: string;
  cursor?: boolean;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ prompt = "~/zone-net $", cursor = true, className, ...rest }, ref) => (
    <label className={cx(styles.wrap, className)}>
      {prompt && <span className={styles.prompt}>{prompt}</span>}
      <input ref={ref} type="text" className={styles.input} {...rest} />
      {cursor && <span className={styles.cursor}>▮</span>}
    </label>
  )
);
Input.displayName = "Input";

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}
export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...rest }, ref) => (
    <textarea ref={ref} className={cx(styles.wrap, styles.textarea, className)} {...rest} />
  )
);
Textarea.displayName = "Textarea";
