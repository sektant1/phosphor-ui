import React from "react";
import { bannerSync, type BannerFontName } from "../../../ascii";
import { AsciiBanner } from "../../organisms/AsciiBanner";
import { cx } from "../../../utils/classNames";
import { HeaderNav } from "../../molecules/HeaderNav";
import type { HeaderNavVariant } from "../../molecules/HeaderNav";
import { LocaleSwitch } from "../../molecules/LocaleSwitch";
import type {
  LocaleSwitchItem,
  LocaleSwitchVariant,
} from "../../molecules/LocaleSwitch";
import "./Header.scss";

const DEFAULT_HIDEOUT_ASCII = [
  "  ____  _____ _  _______  _    _   _ _____ _ ____    _   _ ___ ____  _____ ___  _   _ _____",
  " / ___|| ____| |/ /_   _|/ \\  | \\ | |_   _( ) ___|  | | | |_ _|  _ \\| ____/ _ \\| | | |_   _|",
  " \\___ \\|  _| | ' /  | | / _ \\ |  \\| | | | |/\\___ \\  | |_| || || | | |  _|| | | | | | | | |",
  "  ___) | |___| . \\  | |/ ___ \\| |\\  | | |    ___) | |  _  || || |_| | |__| |_| | |_| | | |",
  " |____/|_____|_|\\_\\ |_/_/   \\_\\_| \\_| |_|   |____/  |_| |_|___|____/|_____\\___/ \\___/  |_|",
].join("\n");

const normalizeAsciiArt = (art: string) =>
  art
    .replace(/^\n+|\n+$/g, "")
    .split("\n")
    .map((line) => line.trimEnd())
    .join("\n");

export interface HeaderNavItem {
  label: React.ReactNode;
  href: string;
  active?: boolean;
}

export interface HeaderLocale extends LocaleSwitchItem {}

export type HeaderVariant = "masthead" | "compact" | "terminal";
export type HeaderMobileLayout = "scroll" | "stack";

export interface HeaderProps extends React.HTMLAttributes<HTMLElement> {
  title: string;
  homeHref?: string;
  bannerArt?: string;
  bannerFont?: BannerFontName;
  showAsciiBanner?: boolean;
  tagline?: React.ReactNode;
  status?: React.ReactNode;
  nav?: HeaderNavItem[];
  locales?: HeaderLocale[];
  navAriaLabel?: string;
  localeAriaLabel?: string;
  variant?: HeaderVariant;
  navVariant?: HeaderNavVariant;
  localeVariant?: LocaleSwitchVariant;
  mobileLayout?: HeaderMobileLayout;
  rule?: boolean;
  align?: "left" | "center";
}

const Header: React.FC<HeaderProps> = ({
  title,
  homeHref = "/",
  bannerArt,
  bannerFont = "Slant",
  showAsciiBanner,
  tagline,
  status,
  nav = [],
  locales,
  navAriaLabel = "primary",
  localeAriaLabel = "language",
  variant = "masthead",
  navVariant,
  localeVariant,
  mobileLayout = "scroll",
  rule = true,
  align = "center",
  className,
  ...rest
}) => {
  const showBanner = showAsciiBanner ?? true;
  const art = React.useMemo(() => {
    if (bannerArt) return normalizeAsciiArt(bannerArt);

    const asciiTitle = title.toUpperCase();
    const generated = normalizeAsciiArt(bannerSync(asciiTitle, bannerFont));
    if (generated !== asciiTitle) return generated;

    return title.trim().toLowerCase() === "sektant's hideout"
      ? DEFAULT_HIDEOUT_ASCII
      : generated;
  }, [bannerArt, bannerFont, title]);
  const resolvedNavVariant =
    navVariant ?? (variant === "terminal" ? "command" : variant === "compact" ? "tabs" : "plain");
  const resolvedLocaleVariant = localeVariant ?? "inline";
  const showLocales = locales && locales.length > 1;
  const mobileNavItems = nav.map((item) => ({
    ...item,
    glyph: item.active ? ">" : undefined,
  }));
  const statusText = status;

  return (
    <header
      className={cx(
        "pho-header site-header",
        align === "center" ? "pho-header--center" : "pho-header--left",
        `pho-header--${variant}`,
        `pho-header--mobile-${mobileLayout}`,
        className,
      )}
      {...rest}
    >
      {showBanner ? (
        <AsciiBanner
          art={art}
          fallback={title}
          href={homeHref}
          label={`${title} home`}
          className="pho-header__banner"
        />
      ) : null}

      {!showBanner && variant !== "masthead" ? (
        <a className="pho-header__brand" href={homeHref} aria-label={`${title} home`}>
          {variant === "terminal" ? (
            <span className="pho-header__prompt" aria-hidden="true">
              &gt;
            </span>
          ) : null}
          <span className="pho-header__title">{title}</span>
        </a>
      ) : null}

      {tagline ? <p className="tagline">{tagline}</p> : null}

      {nav.length > 0 || (locales && locales.length > 1) ? (
        <div className="header-toolbar">
          {nav.length > 0 ? (
            <>
              <HeaderNav
                className="header-nav header-nav--desktop"
                items={nav}
                ariaLabel={navAriaLabel}
                variant={resolvedNavVariant}
              />
              <HeaderNav
                className="header-nav header-nav--mobile"
                items={mobileNavItems}
                ariaLabel={navAriaLabel}
                variant="mobile"
              />
            </>
          ) : null}

          {showLocales || statusText ? (
            <div className="header-trailing">
              {showLocales ? (
                <LocaleSwitch
                  className="locale-switch"
                  locales={locales}
                  ariaLabel={localeAriaLabel}
                  variant={resolvedLocaleVariant}
                  size={variant === "masthead" ? "md" : "sm"}
                />
              ) : null}

              {statusText ? <span className="pho-header__status">{statusText}</span> : null}
            </div>
          ) : null}
        </div>
      ) : null}

      {rule ? <hr className="rule" /> : null}
    </header>
  );
};

export default Header;
