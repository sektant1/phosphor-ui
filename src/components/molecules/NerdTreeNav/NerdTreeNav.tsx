import React from "react";
import { NerdTree } from "../../organisms/NerdTree";
import type {
  NerdTreeNode,
  NerdTreeProps,
} from "../../organisms/NerdTree";

export interface NerdTreeNavItem {
  id?: string;
  label: string;
  href?: string;
  active?: boolean;
  defaultOpen?: boolean;
  children?: NerdTreeNavItem[];
}

export interface NerdTreeNavProps
  extends Omit<NerdTreeProps, "tree"> {
  items: NerdTreeNavItem[];
}

const toNode = (item: NerdTreeNavItem): NerdTreeNode => {
  if (item.children && item.children.length > 0) {
    return {
      kind: "dir",
      id: item.id,
      label: item.label,
      defaultOpen: item.defaultOpen,
      children: item.children.map(toNode),
    };
  }
  return {
    kind: "leaf",
    id: item.id,
    label: item.label,
    href: item.href,
    active: item.active,
  };
};

export const NerdTreeNav: React.FC<NerdTreeNavProps> = ({
  items,
  frame = "rail",
  density = "default",
  ...rest
}) => {
  const tree = React.useMemo(() => items.map(toNode), [items]);
  return <NerdTree tree={tree} frame={frame} density={density} {...rest} />;
};

NerdTreeNav.displayName = "NerdTreeNav";
