import React from "react";
import styles from "./Button.module.scss";

export type ButtonVariant = "primary" | "ghost" | "danger";
export type ButtonSize = "sm" | "md";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  pressed?: boolean;
}

const variantClass: Record<ButtonVariant, string> = {
  primary: styles.primary,
  ghost: styles.ghost,
  danger: styles.danger,
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "primary", size = "md", pressed, className, children, ...rest }, ref) => {
    const cls = [
      styles.btn,
      variantClass[variant],
      size === "sm" ? styles.sm : "",
      pressed ? styles.pressed : "",
      className ?? "",
    ]
      .filter(Boolean)
      .join(" ");
    return (
      <button ref={ref} className={cls} {...rest}>
        {children}
      </button>
    );
  }
);
Button.displayName = "Button";
