import React from "react";
import styles from "./FooterStencil.module.scss";
import type { CssVars } from "../../utils/browser";
import { cx } from "../../utils/classNames";

export interface FooterObject {
  trefoil?: string;
  stamp?: string;
  fields?: { label: string; value: React.ReactNode }[];
}
export interface FooterDossier {
  heading?: string;
  fields?: { label: string; value: React.ReactNode }[];
  links?: { label: string; href: string; glyph?: string }[];
}
export interface FooterRxRow {
  label: string;
  bars?: string;
  value: React.ReactNode;
}
export interface FooterRx {
  heading?: string;
  rows?: FooterRxRow[];
  status?: { label: string; value: React.ReactNode };
}

export interface FooterStencilProps {
  tape?: string;
  tapeSpeed?: number;
  object?: FooterObject;
  dossier?: FooterDossier;
  rx?: FooterRx;
  prompt?: string;
  eofMark?: string;
  eofText?: string;
  className?: string;
}

export const FooterStencil: React.FC<FooterStencilProps> = ({
  tape,
  tapeSpeed = 26,
  object,
  dossier,
  rx,
  prompt,
  eofMark = "// EOF //",
  eofText,
  className,
}) => (
  <footer className={cx(styles.zf, className)}>
    {tape && (
      <div className={styles.tape} aria-hidden="true">
        <span
          className={styles.tapeRun}
          style={{ "--footer-tape-speed": `${tapeSpeed}s` } as CssVars}
        >
          {tape} {tape}{" "}
        </span>
      </div>
    )}

    <div className={styles.stencil}>
      <span className={cx(styles.corner, styles.cTl)}>+</span>
      <span className={cx(styles.corner, styles.cTr)}>+</span>
      <span className={cx(styles.corner, styles.cBl)}>+</span>
      <span className={cx(styles.corner, styles.cBr)}>+</span>

      <div className={styles.grid}>
        {object && (
          <section className={cx(styles.cell, styles.object)} aria-label="object">
            {object.trefoil && (
              <pre className={styles.trefoil} aria-hidden="true">
                {object.trefoil}
              </pre>
            )}
            {object.stamp && <p className={styles.stamp}>{object.stamp}</p>}
            {object.fields && (
              <dl className={styles.miniDl}>
                {object.fields.map((f) => (
                  <React.Fragment key={f.label}>
                    <dt>{f.label}</dt>
                    <dd>{f.value}</dd>
                  </React.Fragment>
                ))}
              </dl>
            )}
          </section>
        )}

        {dossier && (
          <section className={cx(styles.cell, styles.dossier)} aria-label="dossier">
            {dossier.heading && <h3 className={styles.h}>{dossier.heading}</h3>}
            {dossier.fields && (
              <dl className={styles.dl}>
                {dossier.fields.map((f) => (
                  <React.Fragment key={f.label}>
                    <dt>{f.label}</dt>
                    <dd>{f.value}</dd>
                  </React.Fragment>
                ))}
              </dl>
            )}
            {dossier.links && (
              <ul className={styles.links}>
                {dossier.links.map((l) => (
                  <li key={l.href + l.label}>
                    <a href={l.href}>
                      <span className={styles.linkGlyph}>{l.glyph ?? "▌"}</span>
                      <span className={styles.linkText}>{l.label}</span>
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </section>
        )}

        {rx && (
          <section className={cx(styles.cell, styles.rx)} aria-label="rx">
            {rx.heading && <h3 className={styles.h}>{rx.heading}</h3>}
            {rx.rows?.map((r) => (
              <p key={r.label} className={styles.row}>
                <span className={styles.k}>{r.label}</span>
                {r.bars && (
                  <span className={styles.bars} aria-hidden="true">
                    {r.bars}
                  </span>
                )}
                <span className={styles.v}>{r.value}</span>
              </p>
            ))}
            {rx.status && (
              <p className={styles.ledRow}>
                <span className={styles.led} aria-hidden="true" />
                <span className={styles.k}>{rx.status.label}</span>
                <span className={styles.v}>{rx.status.value}</span>
              </p>
            )}
          </section>
        )}
      </div>
    </div>

    {(prompt || eofText) && (
      <div className={styles.bar}>
        {prompt && (
          <p className={styles.prompt}>
            <span className={styles.promptText}>{prompt}</span>{" "}
            <span className={styles.cursor}>▮</span>
          </p>
        )}
        {eofText && (
          <p className={styles.eof}>
            <span className={styles.eofMark}>{eofMark}</span>
            <span className={styles.eofText}>{eofText}</span>
          </p>
        )}
      </div>
    )}
  </footer>
);
