import React from "react";
import "./Link.scss";
import { cx } from "../../../utils/classNames";

export interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  external?: boolean;
}

const Link = React.forwardRef<HTMLAnchorElement, LinkProps>(
  ({ className, children, external, target, rel, ...rest }, ref) => {
    const resolvedTarget = external ? "_blank" : target;
    const safeRel =
      resolvedTarget === "_blank"
        ? rel?.includes("noopener")
          ? rel
          : rel
            ? `${rel} noopener noreferrer`
            : "noopener noreferrer"
        : rel;
    return (
      <a ref={ref} className={cx("pho-link", className)} target={resolvedTarget} rel={safeRel} {...rest}>
        {children}
      </a>
    );
  }
);

Link.displayName = "Link";

export default Link;
