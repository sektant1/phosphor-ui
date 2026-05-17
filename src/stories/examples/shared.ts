import type { NerdTreeNavItem } from "../../components";

export const demoNav: NerdTreeNavItem[] = [
  {
    label: "posts",
    defaultOpen: true,
    children: [
      { label: "field-notes.md", href: "#field-notes", active: true },
      { label: "signal-archive.md", href: "#signal" },
      { label: "rf-primer.md", href: "#rf" },
    ],
  },
  {
    label: "projects",
    children: [
      { label: "pip-boy-clone", href: "#pip-boy" },
      { label: "phosphor-ui", href: "#phosphor" },
    ],
  },
  {
    label: "courses",
    children: [
      { label: "intro-to-crt", href: "#crt" },
      { label: "vim-survival", href: "#vim" },
    ],
  },
  {
    label: "admin",
    children: [
      { label: "dashboard", href: "#admin" },
      { label: "drafts", href: "#drafts" },
    ],
  },
];
