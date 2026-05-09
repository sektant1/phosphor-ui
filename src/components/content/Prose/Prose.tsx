import React from "react";
import "./Prose.scss";
import { cx } from "../../../utils/classNames";

export interface ProseProps extends React.HTMLAttributes<HTMLDivElement> {
  as?: keyof JSX.IntrinsicElements;
}

const Prose: React.FC<ProseProps> = ({
  as = "div",
  className,
  children,
  ...rest
}) => {
  return React.createElement(as, { className: cx("pho-prose prose", className), ...rest }, children);
};

export default Prose;
