import React from "react";
import { bannerSync } from "../../ascii";
import { AsciiBanner } from "../AsciiBanner";
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
  bannerFont?: string;
  tagline?: React.ReactNode;
  nav?: HeaderNavItem[];
  locales?: HeaderLocale[];
  rule?: boolean;
  align?: "left" | "center";
}

const Header: React.FC<HeaderProps> = ({
  title,
  homeHref = "/",
  bannerFont = "Slant",
  tagline,
  nav = [],
  locales,
  rule = true,
  align = "center",
  className,
  ...rest
}) => {
  const cls = [
    "pho-header site-header",
    align === "center" ? "pho-header--center" : "pho-header--left",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const art = bannerSync(title, bannerFont as never);

  return (
    <header className={cls} {...rest}>
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
            <nav className="boot-nav" aria-label="primary">
              <ul>
                {nav.map((n, i) => (
                  <li
                    key={n.href + i}
                    className={["nav-item", n.active ? "nav-item--active" : ""]
                      .filter(Boolean)
                      .join(" ")}
                    style={{ ["--i" as never]: i + 1 }}
                  >
                    <a href={n.href}>&gt; {n.label}</a>
                  </li>
                ))}
              </ul>
            </nav>
          ) : null}

          {locales && locales.length > 1 ? (
            <nav className="locale-switch" aria-label="language">
              <span className="prompt">$</span> band={" "}
              {locales.map((l, i) => (
                <React.Fragment key={l.code}>
                  {i > 0 ? <span className="locale-sep">|</span> : null}
                  <a
                    className={["locale-link", l.active ? "active" : ""]
                      .filter(Boolean)
                      .join(" ")}
                    href={l.href}
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
