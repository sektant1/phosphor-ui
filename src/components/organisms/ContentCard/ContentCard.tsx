import React from "react";
import { Button } from "../../atoms/Button";
import type { ButtonVariant } from "../../atoms/Button";
import { cx } from "../../../utils/classNames";
import type { SlotClassNames } from "../../../types/slots";
import styles from "./ContentCard.module.scss";

export type ContentCardSlot =
  | "root"
  | "cover"
  | "coverRail"
  | "stamp"
  | "thumb"
  | "coverMeta"
  | "body"
  | "header"
  | "tag"
  | "title"
  | "description"
  | "stats"
  | "footer"
  | "cta";

export interface ContentCardAction {
  label: React.ReactNode;
  href: string;
  external?: boolean;
  variant?: ButtonVariant;
}

export interface ContentCardMedia {
  src: string;
  alt?: string;
}

export interface ContentCardProps
  extends Omit<React.HTMLAttributes<HTMLElement>, "title"> {
  eyebrow?: React.ReactNode;
  stamp?: React.ReactNode;
  media?: ContentCardMedia | React.ReactNode;
  mediaAlt?: string;
  coverMeta?: React.ReactNode;
  tag?: React.ReactNode;
  title: React.ReactNode;
  description?: React.ReactNode;
  stats?: React.ReactNode;
  actions?: ContentCardAction[];
  variant?: "terminal" | "dossier" | "course" | "compact";
  chrome?: "default" | "minimal" | "bare";
  slotClassNames?: SlotClassNames<ContentCardSlot>;
}

function isMediaObject(media: ContentCardProps["media"]): media is ContentCardMedia {
  return Boolean(media && typeof media === "object" && "src" in media);
}

export const ContentCard: React.FC<ContentCardProps> = ({
  eyebrow,
  stamp = eyebrow,
  media,
  mediaAlt,
  coverMeta,
  tag,
  title,
  description,
  stats,
  actions,
  variant = "terminal",
  chrome = "default",
  slotClassNames,
  className,
  ...rest
}) => {
  const mediaContent = isMediaObject(media) ? (
    <img src={media.src} alt={media.alt ?? mediaAlt ?? ""} loading="lazy" />
  ) : media ? (
    media
  ) : null;
  const hasCover = Boolean(mediaContent || stamp || coverMeta);

  return (
    <article
      className={cx(
        styles.card,
        styles[`variant-${variant}`],
        styles[`chrome-${chrome}`],
        !hasCover && styles.noCover,
        slotClassNames?.root,
        className,
      )}
      data-pho-component="ContentCard"
      data-pho-slot="root"
      data-pho-variant={variant}
      data-pho-chrome={chrome}
      {...rest}
    >
      {hasCover ? (
        <div className={cx(styles.cover, slotClassNames?.cover)} data-pho-slot="cover">
          <span className={cx(styles.coverRail, slotClassNames?.coverRail)} aria-hidden="true" data-pho-slot="coverRail" />
          {stamp ? <span className={cx(styles.stamp, slotClassNames?.stamp)} data-pho-slot="stamp">{stamp}</span> : null}
          {mediaContent ? <span className={cx(styles.thumb, slotClassNames?.thumb)} data-pho-slot="thumb">{mediaContent}</span> : null}
          {coverMeta ? <p className={cx(styles.coverMeta, slotClassNames?.coverMeta)} data-pho-slot="coverMeta">{coverMeta}</p> : null}
        </div>
      ) : null}
      <div className={cx(styles.body, slotClassNames?.body)} data-pho-slot="body">
        {(tag || eyebrow) ? (
          <header className={cx(styles.header, slotClassNames?.header)} data-pho-slot="header">
            {tag ? <span className={cx(styles.tag, slotClassNames?.tag)} data-pho-slot="tag">{tag}</span> : null}
            {eyebrow && !tag ? <span className={cx(styles.tag, slotClassNames?.tag)} data-pho-slot="tag">{eyebrow}</span> : null}
          </header>
        ) : null}
        <h2 className={cx(styles.title, slotClassNames?.title)} data-pho-slot="title">{title}</h2>
        {description ? <p className={cx(styles.description, slotClassNames?.description)} data-pho-slot="description">{description}</p> : null}
        {stats ? <p className={cx(styles.stats, slotClassNames?.stats)} data-pho-slot="stats">{stats}</p> : null}
        {actions?.length ? (
          <footer className={cx(styles.footer, slotClassNames?.footer)} data-pho-slot="footer">
            {actions.map((action, index) => (
              <Button
                key={`${String(action.label)}-${index}`}
                className={slotClassNames?.cta}
                href={action.href}
                size="sm"
                target={action.external ? "_blank" : undefined}
                rel={action.external ? "noopener noreferrer" : undefined}
                variant={action.variant ?? (index === 0 ? "primary" : "ghost")}
                data-pho-slot="cta"
              >
                {action.label}
              </Button>
            ))}
          </footer>
        ) : null}
      </div>
    </article>
  );
};
