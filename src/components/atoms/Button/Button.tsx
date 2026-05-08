import React from "react";
import styles from "./Button.module.scss";
import { cx } from "../../../utils/classNames";

export type ButtonVariant = "primary" | "ghost" | "danger";
export type ButtonSize = "sm" | "md";

type ButtonBaseProps = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  pressed?: boolean;
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
  ghost: styles.ghost,
  danger: styles.danger,
};

function isAnchorButton(props: ButtonProps): props is AnchorElementProps {
  return typeof props.href === "string";
}

function getClassName(
  variant: ButtonVariant,
  size: ButtonSize,
  pressed: boolean | undefined,
  className: string | undefined,
): string {
  return cx(
    styles.btn,
    variantClass[variant],
    size === "sm" && styles.sm,
    pressed && styles.pressed,
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

    const safeRel =
      target === "_blank"
        ? rel?.includes("noopener")
          ? rel
          : rel
            ? `${rel} noopener noreferrer`
            : "noopener noreferrer"
        : rel;

    return (
      <a
        ref={ref as React.ForwardedRef<HTMLAnchorElement>}
        href={disabled ? undefined : href}
        className={getClassName(variant, size, pressed, className)}
        aria-disabled={disabled ? true : undefined}
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
        {children}
      </a>
    );
  }

  const {
    variant = "primary",
    size = "md",
    pressed,
    className,
    children,
    type = "button",
    ...buttonProps
  } = props;

  return (
    <button
      ref={ref as React.ForwardedRef<HTMLButtonElement>}
      className={getClassName(variant, size, pressed, className)}
      type={type}
      {...buttonProps}
    >
      {children}
    </button>
  );
});

Button.displayName = "Button";
