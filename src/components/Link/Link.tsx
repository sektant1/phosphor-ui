import React from "react";
import "./Link.scss";

export interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {}

const Link = React.forwardRef<HTMLAnchorElement, LinkProps>(
  ({ className, children, ...rest }, ref) => {
    const cls = ["pho-link", className].filter(Boolean).join(" ");
    return (
      <a ref={ref} className={cls} {...rest}>
        {children}
      </a>
    );
  }
);

Link.displayName = "Link";

export default Link;
