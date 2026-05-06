import React from "react";
import styles from "./Hr.module.scss";

export const Hr: React.FC<React.HTMLAttributes<HTMLHRElement>> = ({ className, ...rest }) => (
  <hr className={[styles.rule, className ?? ""].join(" ")} {...rest} />
);
