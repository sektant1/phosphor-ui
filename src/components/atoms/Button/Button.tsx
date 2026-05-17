import React from "react";
import styles from "./Button.module.scss";
import { cx } from "../../../utils/classNames";
import { getSafeExternalRel } from "../../../utils/browser";

export type ButtonVariant =
  | "primary"
  | "secondary"
  | "accent"
  | "ghost"
  | "quiet"
  | "danger";
export type ButtonSize = "sm" | "md" | "lg";

type ButtonBaseProps = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  pressed?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
  className?: string;
  children?: React.ReactNode;
};

type ButtonElementProps = ButtonBaseProps &
  Omit<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    keyof ButtonBaseProps | "href"
  > & {
    href?: never;
  };

type AnchorElementProps = ButtonBaseProps &
  Omit<
    React.AnchorHTMLAttributes<HTMLAnchorElement>,
    keyof ButtonBaseProps | "type"
  > & {
    href: string;
    disabled?: boolean;
    type?: never;
  };

export type ButtonProps = ButtonElementProps | AnchorElementProps;

const variantClass: Record<ButtonVariant, string> = {
  primary: styles.primary,
  secondary: styles.secondary,
  accent: styles.accent,
  ghost: styles.ghost,
  quiet: styles.quiet,
  danger: styles.danger,
};

function isAnchorButton(props: ButtonProps): props is AnchorElementProps {
  return typeof props.href === "string";
}

function getClassName(
  variant: ButtonVariant,
  size: ButtonSize,
  pressed: boolean | undefined,
  fullWidth: boolean | undefined,
  className: string | undefined,
): string {
  return cx(
    styles.btn,
    variantClass[variant],
    size === "sm" && styles.sm,
    size === "lg" && styles.lg,
    pressed && styles.pressed,
    fullWidth && styles.fullWidth,
    className,
  );
}

export const Button = React.forwardRef<
  HTMLButtonElement | HTMLAnchorElement,
  ButtonProps
>((props, ref) => {
  if (isAnchorButton(props)) {
    const {
      variant = "primary",
      size = "md",
      pressed,
      loading,
      fullWidth,
      className,
      children,
      href,
      disabled,
      target,
      rel,
      onClick,
      tabIndex,
      ...anchorProps
    } = props;

    const safeRel = getSafeExternalRel(target, rel);

    return (
      <a
        ref={ref as React.ForwardedRef<HTMLAnchorElement>}
        href={disabled ? undefined : href}
        className={getClassName(variant, size, pressed, fullWidth, className)}
        aria-disabled={disabled ? true : undefined}
        aria-busy={loading || undefined}
        tabIndex={disabled ? -1 : tabIndex}
        target={target}
        rel={safeRel}
        onClick={(event) => {
          if (disabled) {
            event.preventDefault();
            return;
          }

          onClick?.(event);
        }}
        {...anchorProps}
      >
        {loading ? (
          <span className={styles.loader} aria-hidden="true">
            ▮
          </span>
        ) : null}
        {children}
      </a>
    );
  }

  const {
    variant = "primary",
    size = "md",
    pressed,
    loading,
    fullWidth,
    className,
    children,
    type = "button",
    disabled,
    ...buttonProps
  } = props;

  return (
    <button
      ref={ref as React.ForwardedRef<HTMLButtonElement>}
      className={getClassName(variant, size, pressed, fullWidth, className)}
      type={type}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      {...buttonProps}
    >
      {loading ? (
        <span className={styles.loader} aria-hidden="true">
          ▮
        </span>
      ) : null}
      {children}
    </button>
  );
});

Button.displayName = "Button";
