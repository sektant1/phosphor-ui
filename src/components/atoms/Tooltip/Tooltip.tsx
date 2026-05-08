import React from "react";
import { createPortal } from "react-dom";
import styles from "./Tooltip.module.scss";
import { cx } from "../../../utils/classNames";

export type TooltipPlacement = "top" | "right" | "bottom" | "left";

export interface TooltipProps {
  content: React.ReactNode;
  children: React.ReactElement;
  placement?: TooltipPlacement;
  offset?: number;
  className?: string;
}

const MARGIN = 8;

const opposite: Record<TooltipPlacement, TooltipPlacement> = {
  top: "bottom",
  bottom: "top",
  left: "right",
  right: "left",
};

const computePos = (
  trigger: DOMRect,
  tip: { width: number; height: number },
  placement: TooltipPlacement,
  offset: number,
) => {
  switch (placement) {
    case "top":
      return {
        top: trigger.top - tip.height - offset,
        left: trigger.left + trigger.width / 2 - tip.width / 2,
      };
    case "bottom":
      return {
        top: trigger.bottom + offset,
        left: trigger.left + trigger.width / 2 - tip.width / 2,
      };
    case "left":
      return {
        top: trigger.top + trigger.height / 2 - tip.height / 2,
        left: trigger.left - tip.width - offset,
      };
    case "right":
      return {
        top: trigger.top + trigger.height / 2 - tip.height / 2,
        left: trigger.right + offset,
      };
  }
};

const fits = (
  pos: { top: number; left: number },
  tip: { width: number; height: number },
  vw: number,
  vh: number,
) =>
  pos.top >= MARGIN &&
  pos.left >= MARGIN &&
  pos.top + tip.height <= vh - MARGIN &&
  pos.left + tip.width <= vw - MARGIN;

export const Tooltip: React.FC<TooltipProps> = ({
  content,
  children,
  placement = "top",
  offset = 8,
  className,
}) => {
  const id = React.useId();
  const child = React.Children.only(children);
  const triggerRef = React.useRef<HTMLElement | null>(null);
  const tipRef = React.useRef<HTMLSpanElement | null>(null);
  const [open, setOpen] = React.useState(false);
  const [pos, setPos] = React.useState<{
    top: number;
    left: number;
    placement: TooltipPlacement;
  } | null>(null);

  const update = React.useCallback(() => {
    const trig = triggerRef.current;
    const tip = tipRef.current;
    if (!trig || !tip) return;
    const tRect = trig.getBoundingClientRect();
    const tipBox = { width: tip.offsetWidth, height: tip.offsetHeight };
    const vw = window.innerWidth;
    const vh = window.innerHeight;

    const order: TooltipPlacement[] = [
      placement,
      opposite[placement],
      ...(["top", "bottom", "right", "left"] as TooltipPlacement[]).filter(
        (p) => p !== placement && p !== opposite[placement],
      ),
    ];

    let chosen = placement;
    let p = computePos(tRect, tipBox, placement, offset);
    for (const candidate of order) {
      const candPos = computePos(tRect, tipBox, candidate, offset);
      if (fits(candPos, tipBox, vw, vh)) {
        chosen = candidate;
        p = candPos;
        break;
      }
    }

    p = {
      top: Math.min(
        Math.max(p.top, MARGIN),
        Math.max(MARGIN, vh - tipBox.height - MARGIN),
      ),
      left: Math.min(
        Math.max(p.left, MARGIN),
        Math.max(MARGIN, vw - tipBox.width - MARGIN),
      ),
    };

    setPos({ top: p.top, left: p.left, placement: chosen });
  }, [placement, offset]);

  React.useLayoutEffect(() => {
    if (!open) return;
    update();
    const onScroll = () => update();
    window.addEventListener("scroll", onScroll, true);
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll, true);
      window.removeEventListener("resize", onScroll);
    };
  }, [open, update, content]);

  const childProps = (child.props ?? {}) as React.HTMLAttributes<HTMLElement> & {
    ref?: React.Ref<HTMLElement>;
  };

  const setRef = (node: HTMLElement | null) => {
    triggerRef.current = node;
    const r = (child as unknown as { ref?: React.Ref<HTMLElement> }).ref;
    if (typeof r === "function") r(node);
    else if (r && typeof r === "object")
      (r as React.MutableRefObject<HTMLElement | null>).current = node;
  };

  const cloned = React.cloneElement(child, {
    ref: setRef,
    "aria-describedby": id,
    onMouseEnter: (e: React.MouseEvent<HTMLElement>) => {
      childProps.onMouseEnter?.(e);
      setOpen(true);
    },
    onMouseLeave: (e: React.MouseEvent<HTMLElement>) => {
      childProps.onMouseLeave?.(e);
      setOpen(false);
    },
    onFocus: (e: React.FocusEvent<HTMLElement>) => {
      childProps.onFocus?.(e);
      setOpen(true);
    },
    onBlur: (e: React.FocusEvent<HTMLElement>) => {
      childProps.onBlur?.(e);
      setOpen(false);
    },
  } as React.HTMLAttributes<HTMLElement> & { ref: React.Ref<HTMLElement> });

  const portal =
    typeof document !== "undefined" && open
      ? createPortal(
          <span
            id={id}
            role="tooltip"
            ref={tipRef}
            className={cx(
              styles.tip,
              styles.fixed,
              pos && styles.shown,
              pos && styles[pos.placement],
              className,
            )}
            style={
              pos
                ? { top: `${pos.top}px`, left: `${pos.left}px` }
                : { top: 0, left: 0, visibility: "hidden" }
            }
          >
            {content}
          </span>,
          document.body,
        )
      : null;

  return (
    <>
      {cloned}
      {portal}
    </>
  );
};
