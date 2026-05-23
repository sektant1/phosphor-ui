import React from "react";
import { Button } from "../../atoms/Button";
import type { ButtonSize, ButtonVariant } from "../../atoms/Button";
import { cx } from "../../../utils/classNames";
import styles from "./Theme.module.scss";

export type PhosphorTheme = "phosphor" | "amber" | "cyan" | "red";

export const PHOSPHOR_THEMES = ["phosphor", "amber", "cyan", "red"] as const;
export const PHOSPHOR_THEME_STORAGE_KEY = "phosphor-theme";

export interface ThemeContextValue {
  theme: PhosphorTheme;
  setTheme: (theme: PhosphorTheme) => void;
  toggleTheme: () => void;
  mounted: boolean;
}

export interface ThemeProviderProps {
  children: React.ReactNode;
  defaultTheme?: PhosphorTheme;
  storageKey?: string;
  attributeTarget?: HTMLElement | null;
  value?: PhosphorTheme;
  onChange?: (theme: PhosphorTheme) => void;
}

export interface ThemeToggleProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "children" | "onClick"> {
  labels?: Partial<Record<PhosphorTheme, React.ReactNode>>;
  showLabel?: boolean;
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
}

const ThemeContext = React.createContext<ThemeContextValue | null>(null);

function isTheme(value: string | null | undefined): value is PhosphorTheme {
  return (PHOSPHOR_THEMES as readonly string[]).includes(value ?? "");
}

function getTarget(explicitTarget?: HTMLElement | null) {
  if (explicitTarget) return explicitTarget;
  if (typeof document === "undefined") return null;
  return document.documentElement;
}

function getStoredTheme(storageKey: string) {
  if (typeof window === "undefined") return null;

  try {
    const stored = window.localStorage.getItem(storageKey);
    return isTheme(stored) ? stored : null;
  } catch {
    return null;
  }
}

function persistTheme(storageKey: string, theme: PhosphorTheme) {
  if (typeof window === "undefined") return;

  try {
    window.localStorage.setItem(storageKey, theme);
  } catch {
    // Storage can be unavailable in private or embedded contexts.
  }
}

function applyTheme(target: HTMLElement | null, theme: PhosphorTheme) {
  if (!target) return;
  target.dataset.theme = theme;
}

export function getInitialThemeScript(storageKey = PHOSPHOR_THEME_STORAGE_KEY) {
  const key = JSON.stringify(storageKey);
  const themes = JSON.stringify(PHOSPHOR_THEMES);

  return `(function(){try{var k=${key};var T=${themes};var t=localStorage.getItem(k);if(T.indexOf(t)===-1)t=T[0];document.documentElement.dataset.theme=t;}catch(e){document.documentElement.dataset.theme=${JSON.stringify(PHOSPHOR_THEMES[0])};}})();`;
}

export function ThemeProvider({
  children,
  defaultTheme = "phosphor",
  storageKey = PHOSPHOR_THEME_STORAGE_KEY,
  attributeTarget,
  value,
  onChange,
}: ThemeProviderProps) {
  const controlled = value !== undefined;
  const [themeState, setThemeState] = React.useState<PhosphorTheme>(defaultTheme);
  const [mounted, setMounted] = React.useState(false);
  const theme = value ?? themeState;

  React.useEffect(() => {
    const target = getTarget(attributeTarget);
    const stored = controlled ? null : getStoredTheme(storageKey);
    const nextTheme = value ?? stored ?? defaultTheme;

    if (!controlled) {
      setThemeState(nextTheme);
    }

    applyTheme(target, nextTheme);
    setMounted(true);
  }, [attributeTarget, controlled, defaultTheme, storageKey, value]);

  const setTheme = React.useCallback(
    (nextTheme: PhosphorTheme) => {
      if (!controlled) {
        setThemeState(nextTheme);
      }

      applyTheme(getTarget(attributeTarget), nextTheme);
      persistTheme(storageKey, nextTheme);
      onChange?.(nextTheme);
    },
    [attributeTarget, controlled, onChange, storageKey],
  );

  const toggleTheme = React.useCallback(() => {
    const currentIndex = PHOSPHOR_THEMES.indexOf(theme);
    const nextTheme = PHOSPHOR_THEMES[(currentIndex + 1) % PHOSPHOR_THEMES.length];
    setTheme(nextTheme);
  }, [setTheme, theme]);

  const context = React.useMemo<ThemeContextValue>(
    () => ({ theme, setTheme, toggleTheme, mounted }),
    [mounted, setTheme, theme, toggleTheme],
  );

  return <ThemeContext.Provider value={context}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const context = React.useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider");
  }

  return context;
}

export function ThemeToggle({
  labels = { phosphor: "phosphor", amber: "amber", cyan: "cyan", red: "red" },
  showLabel = true,
  className,
  variant = "ghost",
  size = "sm",
  "aria-label": ariaLabel,
  ...props
}: ThemeToggleProps) {
  const { theme, toggleTheme, mounted } = useTheme();
  const nextTheme = PHOSPHOR_THEMES[(PHOSPHOR_THEMES.indexOf(theme) + 1) % PHOSPHOR_THEMES.length];

  return (
    <Button
      {...props}
      className={cx(styles.toggle, className)}
      variant={variant}
      size={size}
      type="button"
      pressed={theme !== "phosphor"}
      data-theme-toggle={theme}
      aria-label={ariaLabel ?? `Switch to ${nextTheme} theme`}
      onClick={toggleTheme}
    >
      <span className={styles.indicator} aria-hidden="true" />
      {showLabel ? (
        <span className={styles.label} suppressHydrationWarning>
          {mounted ? (labels[theme] ?? theme) : (labels.phosphor ?? "phosphor")}
        </span>
      ) : null}
    </Button>
  );
}
