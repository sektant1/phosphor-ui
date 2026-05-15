import React from "react";
import styles from "./Input.module.scss";
import { cx } from "../../../utils/classNames";
import type { DataAttributes } from "../primitive";
import { hasVisibleContent } from "../primitive";

type FieldState = "default" | "error" | "success";
export type InputVariant = "default" | "terminal";
export type InputSize = "sm" | "md" | "lg";

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
  label?: React.ReactNode;
  helpText?: React.ReactNode;
  error?: React.ReactNode;
  prompt?: string;
  command?: React.ReactNode;
  cursor?: boolean;
  size?: InputSize;
  variant?: InputVariant;
  state?: FieldState;
  inputClassName?: string;
  rootProps?: React.HTMLAttributes<HTMLLabelElement> & DataAttributes;
  onValueChange?: (
    value: string,
    event: React.ChangeEvent<HTMLInputElement>,
  ) => void;
}

export interface InputControlProps
  extends Omit<InputProps, "label" | "helpText" | "error" | "rootProps" | "state"> {}

export const InputControl = React.forwardRef<HTMLInputElement, InputControlProps>(
  (
    {
      prompt = "~/ $",
      command,
      cursor = true,
      size = "md",
      variant = "default",
      className,
      inputClassName,
      id,
      type = "text",
      disabled,
      readOnly,
      value,
      defaultValue,
      onKeyDown,
      onKeyUp,
      onFocus,
      onBlur,
      onMouseUp,
      onSelect,
      onChange,
      onValueChange,
      ...rest
    },
    ref,
  ) => {
    const idleTimeoutRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);
    const inputRef = React.useRef<HTMLInputElement | null>(null);
    const setRefs = React.useCallback(
      (node: HTMLInputElement | null) => {
        inputRef.current = node;
        if (typeof ref === "function") ref(node);
        else if (ref) (ref as React.MutableRefObject<HTMLInputElement | null>).current = node;
      },
      [ref],
    );
    const [cursorVisible, setCursorVisible] = React.useState(false);
    const [cursorSteady, setCursorSteady] = React.useState(false);
    const [cursorIndex, setCursorIndex] = React.useState(0);
    const [hasSelection, setHasSelection] = React.useState(false);
    const [isComposing, setIsComposing] = React.useState(false);
    const [localValue, setLocalValue] = React.useState(() =>
      defaultValue === undefined ? "" : String(defaultValue),
    );
    const rawVisibleValue = value === undefined ? localValue : String(value);
    const clampedCursorIndex = Math.min(cursorIndex, rawVisibleValue.length);
    const textBeforeCursor = rawVisibleValue.slice(0, clampedCursorIndex);
    const visibleValueBeforeCursor =
      type === "password" ? "•".repeat(textBeforeCursor.length) : textBeforeCursor;
    const showBlock = cursor && cursorVisible && !hasSelection && !isComposing;

    const syncSelection = React.useCallback((input: HTMLInputElement) => {
      const start = input.selectionStart ?? input.value.length;
      const end = input.selectionEnd ?? start;
      setCursorIndex(start);
      setHasSelection(start !== end);
    }, []);
    const markCursorActive = React.useCallback(() => {
      if (!cursor || disabled || readOnly) return;
      setCursorSteady(true);
      if (idleTimeoutRef.current) clearTimeout(idleTimeoutRef.current);
      idleTimeoutRef.current = setTimeout(() => {
        setCursorSteady(false);
        idleTimeoutRef.current = null;
      }, 520);
    }, [cursor, disabled, readOnly]);

    React.useEffect(() => {
      if (!cursor || disabled || readOnly) {
        setCursorVisible(false);
        setCursorSteady(false);
        if (idleTimeoutRef.current) {
          clearTimeout(idleTimeoutRef.current);
          idleTimeoutRef.current = null;
        }
      }
    }, [cursor, disabled, readOnly]);
    React.useEffect(
      () => () => {
        if (idleTimeoutRef.current) clearTimeout(idleTimeoutRef.current);
      },
      [],
    );
    React.useEffect(() => {
      if (!cursor || !cursorVisible) return;
      const handler = () => {
        const node = inputRef.current;
        if (!node || document.activeElement !== node) return;
        syncSelection(node);
      };
      document.addEventListener("selectionchange", handler);
      return () => document.removeEventListener("selectionchange", handler);
    }, [cursor, cursorVisible, syncSelection]);

    if (variant === "terminal" && hasVisibleContent(command)) {
      return (
        <span className={cx(styles.terminalPrompt, styles[size], className)}>
          {prompt ? <span className={styles.terminalPromptText}>{prompt}</span> : null}
          <span className={styles.terminalCommand}>{command}</span>
          {cursor ? <span className={styles.terminalPromptCursor} aria-hidden="true" /> : null}
        </span>
      );
    }

    return (
      <span
        className={cx(
          styles.wrap,
          styles[size],
          variant === "terminal" && styles.terminalWrap,
          className,
        )}
      >
        {prompt ? (
          <span className={cx(styles.prompt, variant === "terminal" && styles.terminalPromptText)}>
            {prompt}
          </span>
        ) : null}
        <span className={styles.inputCell}>
          <input
            {...rest}
            ref={setRefs}
            id={id}
            type={type}
            value={value}
            defaultValue={defaultValue}
            disabled={disabled}
            readOnly={readOnly}
            className={cx(
              styles.input,
              styles[size],
              variant === "terminal" && styles.terminalInput,
              showBlock && styles.inputWithCursor,
              showBlock && styles.inputHidePlaceholder,
              inputClassName,
            )}
            onKeyDown={(event) => {
              markCursorActive();
              onKeyDown?.(event);
            }}
            onKeyUp={(event) => {
              if (cursor) {
                syncSelection(event.currentTarget);
                markCursorActive();
              }
              onKeyUp?.(event);
            }}
            onFocus={(event) => {
              if (cursor && !disabled && !readOnly) {
                syncSelection(event.currentTarget);
                setCursorVisible(true);
                markCursorActive();
              }
              onFocus?.(event);
            }}
            onBlur={(event) => {
              setCursorVisible(false);
              setCursorSteady(false);
              setHasSelection(false);
              setIsComposing(false);
              if (idleTimeoutRef.current) {
                clearTimeout(idleTimeoutRef.current);
                idleTimeoutRef.current = null;
              }
              onBlur?.(event);
            }}
            onMouseDown={(event) => {
              if (cursor) markCursorActive();
              rest.onMouseDown?.(event);
            }}
            onMouseUp={(event) => {
              if (cursor) {
                syncSelection(event.currentTarget);
                markCursorActive();
              }
              onMouseUp?.(event);
            }}
            onSelect={(event) => {
              if (cursor) {
                syncSelection(event.currentTarget);
                markCursorActive();
              }
              onSelect?.(event);
            }}
            onCompositionStart={(event) => {
              setIsComposing(true);
              rest.onCompositionStart?.(event);
            }}
            onCompositionEnd={(event) => {
              setIsComposing(false);
              if (cursor) syncSelection(event.currentTarget);
              rest.onCompositionEnd?.(event);
            }}
            onChange={(event) => {
              setLocalValue(event.currentTarget.value);
              if (cursor) {
                syncSelection(event.currentTarget);
                markCursorActive();
              }
              onChange?.(event);
              onValueChange?.(event.currentTarget.value, event);
            }}
          />
          {cursor ? (
            <span
              className={cx(styles.cursorLayer, showBlock && styles.cursorLayerActive)}
              aria-hidden="true"
            >
              <span
                className={cx(
                  styles.cursorMirror,
                  variant === "terminal" && styles.terminalCursorMirror,
                )}
              >
                {visibleValueBeforeCursor}
              </span>
              <span
                className={cx(
                  styles.cursor,
                  variant === "terminal" && styles.terminalPromptCursor,
                  cursorSteady && styles.cursorSteady,
                )}
              />
            </span>
          ) : null}
        </span>
      </span>
    );
  },
);
InputControl.displayName = "InputControl";

export const InputField = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      helpText,
      error,
      className,
      rootProps,
      id,
      state = error ? "error" : "default",
      "aria-describedby": ariaDescribedBy,
      ...rest
    },
    ref,
  ) => {
    const generatedId = React.useId();
    const resolvedId = id ?? generatedId;
    const helpId = `${resolvedId}-help`;
    const errorId = `${resolvedId}-error`;
    const describedBy =
      [
        ariaDescribedBy,
        hasVisibleContent(helpText) ? helpId : undefined,
        hasVisibleContent(error) ? errorId : undefined,
      ]
        .filter(Boolean)
        .join(" ") || undefined;

    return (
      <label
        {...rootProps}
        className={cx(
          styles.field,
          state === "error" && styles.errorField,
          state === "success" && styles.successField,
          rootProps?.className,
          className,
        )}
        htmlFor={resolvedId}
      >
        {hasVisibleContent(label) ? (
          <span className={styles.label}>{label}</span>
        ) : null}
        <InputControl
          {...rest}
          ref={ref}
          id={resolvedId}
          aria-invalid={state === "error" || undefined}
          aria-describedby={describedBy}
        />
        {hasVisibleContent(helpText) ? (
          <span id={helpId} className={styles.help}>
            {helpText}
          </span>
        ) : null}
        {hasVisibleContent(error) ? (
          <span id={errorId} className={styles.error}>
            {error}
          </span>
        ) : null}
      </label>
    );
  },
);

InputField.displayName = "InputField";

export const Input = InputField;
Input.displayName = "Input";

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: React.ReactNode;
  helpText?: React.ReactNode;
  error?: React.ReactNode;
  cursor?: boolean;
  size?: InputSize;
  state?: FieldState;
  textareaClassName?: string;
  rootProps?: React.HTMLAttributes<HTMLLabelElement> & DataAttributes;
  onValueChange?: (
    value: string,
    event: React.ChangeEvent<HTMLTextAreaElement>,
  ) => void;
}

export interface TextareaControlProps
  extends Omit<TextareaProps, "label" | "helpText" | "error" | "rootProps" | "state"> {}

export const TextareaControl = React.forwardRef<HTMLTextAreaElement, TextareaControlProps>(
  (
    {
      cursor = true,
      size = "md",
      className,
      textareaClassName,
      id,
      disabled,
      readOnly,
      value,
      defaultValue,
      onKeyDown,
      onKeyUp,
      onFocus,
      onBlur,
      onMouseUp,
      onSelect,
      onChange,
      onValueChange,
      ...rest
    },
    ref,
  ) => {
    const idleTimeoutRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);
    const textareaRef = React.useRef<HTMLTextAreaElement | null>(null);
    const setRefs = React.useCallback(
      (node: HTMLTextAreaElement | null) => {
        textareaRef.current = node;
        if (typeof ref === "function") ref(node);
        else if (ref) (ref as React.MutableRefObject<HTMLTextAreaElement | null>).current = node;
      },
      [ref],
    );
    const [cursorVisible, setCursorVisible] = React.useState(false);
    const [cursorSteady, setCursorSteady] = React.useState(false);
    const [cursorIndex, setCursorIndex] = React.useState(0);
    const [hasSelection, setHasSelection] = React.useState(false);
    const [isComposing, setIsComposing] = React.useState(false);
    const [localValue, setLocalValue] = React.useState(() =>
      defaultValue === undefined ? "" : String(defaultValue),
    );
    const rawVisibleValue = value === undefined ? localValue : String(value);
    const clampedCursorIndex = Math.min(cursorIndex, rawVisibleValue.length);
    const visibleValueBeforeCursor = rawVisibleValue.slice(0, clampedCursorIndex);
    const showBlock = cursor && cursorVisible && !hasSelection && !isComposing;

    const syncSelection = React.useCallback((textarea: HTMLTextAreaElement) => {
      const start = textarea.selectionStart ?? textarea.value.length;
      const end = textarea.selectionEnd ?? start;
      setCursorIndex(start);
      setHasSelection(start !== end);
    }, []);
    const markCursorActive = React.useCallback(() => {
      if (!cursor || disabled || readOnly) return;
      setCursorSteady(true);
      if (idleTimeoutRef.current) clearTimeout(idleTimeoutRef.current);
      idleTimeoutRef.current = setTimeout(() => {
        setCursorSteady(false);
        idleTimeoutRef.current = null;
      }, 520);
    }, [cursor, disabled, readOnly]);

    React.useEffect(() => {
      if (!cursor || disabled || readOnly) {
        setCursorVisible(false);
        setCursorSteady(false);
        if (idleTimeoutRef.current) {
          clearTimeout(idleTimeoutRef.current);
          idleTimeoutRef.current = null;
        }
      }
    }, [cursor, disabled, readOnly]);
    React.useEffect(
      () => () => {
        if (idleTimeoutRef.current) clearTimeout(idleTimeoutRef.current);
      },
      [],
    );
    React.useEffect(() => {
      if (!cursor || !cursorVisible) return;
      const handler = () => {
        const node = textareaRef.current;
        if (!node || document.activeElement !== node) return;
        syncSelection(node);
      };
      document.addEventListener("selectionchange", handler);
      return () => document.removeEventListener("selectionchange", handler);
    }, [cursor, cursorVisible, syncSelection]);

    return (
      <span className={cx(styles.textareaCell, styles[size], className)}>
        <textarea
          {...rest}
          ref={setRefs}
          id={id}
          value={value}
          defaultValue={defaultValue}
          disabled={disabled}
          readOnly={readOnly}
          className={cx(
            styles.wrap,
            styles.textarea,
            styles[size],
            showBlock && styles.inputWithCursor,
            showBlock && styles.inputHidePlaceholder,
            textareaClassName,
          )}
          onKeyDown={(event) => {
            markCursorActive();
            onKeyDown?.(event);
          }}
          onKeyUp={(event) => {
            if (cursor) {
              syncSelection(event.currentTarget);
              markCursorActive();
            }
            onKeyUp?.(event);
          }}
          onFocus={(event) => {
            if (cursor && !disabled && !readOnly) {
              syncSelection(event.currentTarget);
              setCursorVisible(true);
              markCursorActive();
            }
            onFocus?.(event);
          }}
          onBlur={(event) => {
            setCursorVisible(false);
            setCursorSteady(false);
            setHasSelection(false);
            setIsComposing(false);
            if (idleTimeoutRef.current) {
              clearTimeout(idleTimeoutRef.current);
              idleTimeoutRef.current = null;
            }
            onBlur?.(event);
          }}
          onMouseDown={(event) => {
            if (cursor) markCursorActive();
            rest.onMouseDown?.(event);
          }}
          onMouseUp={(event) => {
            if (cursor) {
              syncSelection(event.currentTarget);
              markCursorActive();
            }
            onMouseUp?.(event);
          }}
          onSelect={(event) => {
            if (cursor) {
              syncSelection(event.currentTarget);
              markCursorActive();
            }
            onSelect?.(event);
          }}
          onCompositionStart={(event) => {
            setIsComposing(true);
            rest.onCompositionStart?.(event);
          }}
          onCompositionEnd={(event) => {
            setIsComposing(false);
            if (cursor) syncSelection(event.currentTarget);
            rest.onCompositionEnd?.(event);
          }}
          onChange={(event) => {
            setLocalValue(event.currentTarget.value);
            if (cursor) {
              syncSelection(event.currentTarget);
              markCursorActive();
            }
            onChange?.(event);
            onValueChange?.(event.currentTarget.value, event);
          }}
        />
        {cursor ? (
          <span
            className={cx(styles.textareaCursorLayer, showBlock && styles.cursorLayerActive)}
            aria-hidden="true"
          >
            <span className={cx(styles.textareaCursorMirror, styles[size])}>
              {visibleValueBeforeCursor}
            </span>
            <span
              className={cx(
                styles.cursor,
                styles.textareaCursor,
                cursorSteady && styles.cursorSteady,
              )}
            />
          </span>
        ) : null}
      </span>
    );
  },
);
TextareaControl.displayName = "TextareaControl";

export const TextareaField = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      label,
      helpText,
      error,
      className,
      rootProps,
      id,
      state = error ? "error" : "default",
      "aria-describedby": ariaDescribedBy,
      ...rest
    },
    ref,
  ) => {
    const generatedId = React.useId();
    const resolvedId = id ?? generatedId;
    const helpId = `${resolvedId}-help`;
    const errorId = `${resolvedId}-error`;
    const describedBy =
      [
        ariaDescribedBy,
        hasVisibleContent(helpText) ? helpId : undefined,
        hasVisibleContent(error) ? errorId : undefined,
      ]
        .filter(Boolean)
        .join(" ") || undefined;

    return (
      <label
        {...rootProps}
        className={cx(
          styles.field,
          state === "error" && styles.errorField,
          state === "success" && styles.successField,
          rootProps?.className,
          className,
        )}
        htmlFor={resolvedId}
      >
        {hasVisibleContent(label) ? (
          <span className={styles.label}>{label}</span>
        ) : null}
        <TextareaControl
          {...rest}
          ref={ref}
          id={resolvedId}
          aria-invalid={state === "error" || undefined}
          aria-describedby={describedBy}
        />
        {hasVisibleContent(helpText) ? (
          <span id={helpId} className={styles.help}>
            {helpText}
          </span>
        ) : null}
        {hasVisibleContent(error) ? (
          <span id={errorId} className={styles.error}>
            {error}
          </span>
        ) : null}
      </label>
    );
  },
);

TextareaField.displayName = "TextareaField";

export const Textarea = TextareaField;
Textarea.displayName = "Textarea";
