import React from "react";
import "./Link.scss";
export interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
}
declare const Link: React.ForwardRefExoticComponent<LinkProps & React.RefAttributes<HTMLAnchorElement>>;
export default Link;
