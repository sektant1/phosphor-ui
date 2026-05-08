import React from "react";
import "./Prose.scss";

export interface ProseProps extends React.HTMLAttributes<HTMLDivElement> {
  as?: keyof JSX.IntrinsicElements;
}

const Prose: React.FC<ProseProps> = ({
  as = "div",
  className,
  children,
  ...rest
}) => {
  const cls = ["pho-prose prose", className].filter(Boolean).join(" ");
  return React.createElement(as, { className: cls, ...rest }, children);
};

export default Prose;
