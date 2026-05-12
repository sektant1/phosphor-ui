import React from "react";
import "./Prose.scss";
export interface ProseProps extends React.HTMLAttributes<HTMLDivElement> {
    as?: keyof JSX.IntrinsicElements;
}
declare const Prose: React.FC<ProseProps>;
export default Prose;
