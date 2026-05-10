import React from "react";
import { bannerSync, type BannerFontName } from "../../../ascii";
import { AsciiBanner } from "../../organisms/AsciiBanner";
import { cx } from "../../../utils/classNames";
import { HeaderNav } from "../HeaderNav";
import type { HeaderNavVariant } from "../HeaderNav";
import { LocaleSwitch } from "../../molecules/LocaleSwitch";
import type {
  LocaleSwitchItem,
  LocaleSwitchVariant,
} from "../../molecules/LocaleSwitch";
import "./Header.scss";

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
  tagline?: React.ReactNode;
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
  tagline,
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
  const art = React.useMemo(
    () => bannerArt ?? bannerSync(title, bannerFont),
    [bannerArt, bannerFont, title],
  );
  const resolvedNavVariant =
    navVariant ?? (variant === "terminal" ? "command" : variant === "compact" ? "tabs" : "plain");
  const resolvedLocaleVariant =
    localeVariant ?? (variant === "terminal" ? "terminal" : variant === "compact" ? "inline" : "segmented");
  const showLocales = locales && locales.length > 1;
  const mobileNavItems = nav.map((item) => ({
    ...item,
    glyph: item.active ? ">" : undefined,
  }));

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
      {variant === "masthead" ? (
        <AsciiBanner
          art={art}
          fallback={title}
          href={homeHref}
          label={`${title} home`}
          className="pho-header__banner"
        />
      ) : (
        <a className="pho-header__brand" href={homeHref} aria-label={`${title} home`}>
          {variant === "terminal" ? (
            <span className="pho-header__prompt" aria-hidden="true">
              &gt;
            </span>
          ) : null}
          <span className="pho-header__title">{title}</span>
        </a>
      )}

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

          {showLocales ? (
            <LocaleSwitch
              className="locale-switch"
              locales={locales}
              ariaLabel={localeAriaLabel}
              variant={resolvedLocaleVariant}
              size={variant === "masthead" ? "md" : "sm"}
            />
          ) : null}
        </div>
      ) : null}

      {rule ? <hr className="rule" /> : null}
    </header>
  );
};

export default Header;
