import React from "react";
import { bannerSync, type BannerFontName } from "../../../ascii";
import { AsciiBanner } from "../../organisms/AsciiBanner";
import type { CssVars } from "../../../utils/browser";
import { cx } from "../../../utils/classNames";
import "./Header.scss";

export interface HeaderNavItem {
  label: React.ReactNode;
  href: string;
  active?: boolean;
}

export interface HeaderLocale {
  code: string;
  label: React.ReactNode;
  href: string;
  active?: boolean;
}

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
  rule = true,
  align = "center",
  className,
  ...rest
}) => {
  const art = React.useMemo(
    () => bannerArt ?? bannerSync(title, bannerFont),
    [bannerArt, bannerFont, title],
  );

  return (
    <header
      className={cx(
        "pho-header site-header",
        align === "center" ? "pho-header--center" : "pho-header--left",
        className,
      )}
      {...rest}
    >
      <AsciiBanner
        art={art}
        fallback={title}
        href={homeHref}
        label={`${title} home`}
        className="pho-header__banner"
      />

      {tagline ? <p className="tagline">{tagline}</p> : null}

      {nav.length > 0 || (locales && locales.length > 1) ? (
        <div className="header-toolbar">
          {nav.length > 0 ? (
            <nav className="boot-nav" aria-label={navAriaLabel}>
              <ul>
                {nav.map((n, i) => (
                  <li
                    key={n.href + i}
                    className={cx("nav-item", n.active && "nav-item--active")}
                    style={{ "--i": i + 1 } as CssVars}
                  >
                    <a href={n.href} aria-current={n.active ? "page" : undefined}>
                      &gt; {n.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ) : null}

          {locales && locales.length > 1 ? (
            <nav className="locale-switch" aria-label={localeAriaLabel}>
              <span className="prompt">$</span> band={" "}
              {locales.map((l, i) => (
                <React.Fragment key={l.code}>
                  {i > 0 ? <span className="locale-sep">|</span> : null}
                  <a
                    className={cx("locale-link", l.active && "active")}
                    href={l.href}
                    aria-current={l.active ? "true" : undefined}
                  >
                    {l.label}
                  </a>
                </React.Fragment>
              ))}
            </nav>
          ) : null}
        </div>
      ) : null}

      {rule ? <hr className="rule" /> : null}
    </header>
  );
};

export default Header;
