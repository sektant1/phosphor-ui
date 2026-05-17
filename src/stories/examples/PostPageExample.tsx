import React from "react";
import {
  CrtShell,
  NerdTreeNav,
  TableOfContents,
  ThreePanelLayout,
} from "../../components";
import type { NerdTreeNavItem, TocItem } from "../../components";

export interface PostPageExampleProps {
  nav?: NerdTreeNavItem[];
  toc?: TocItem[];
}

const defaultToc: TocItem[] = [
  { label: "Carrier wave", href: "#carrier" },
  {
    label: "Modulation",
    href: "#modulation",
    children: [
      { label: "AM", href: "#mod-am" },
      { label: "SSB", href: "#mod-ssb" },
    ],
  },
  { label: "Antenna geometry", href: "#antenna" },
  { label: "References", href: "#refs" },
];

export const PostPageExample: React.FC<PostPageExampleProps> = ({
  nav = [],
  toc = defaultToc,
}) => (
  <CrtShell>
    <div style={{ padding: "1.5rem" }}>
  <ThreePanelLayout
    left={<NerdTreeNav items={nav} title="~/posts" />}
    leftLabel="Site navigation"
    right={
      <TableOfContents
        heading="// on this page"
        items={toc}
        foot={<span>est. 6 min</span>}
      />
    }
    rightLabel="On this page"
    main={
      <article>
        <header>
          <p>05 — May — 2026</p>
          <h1>RF Primer: shortwave on a shoestring</h1>
          <p>How I built a passable receiver from junk-drawer parts.</p>
        </header>
        <section id="carrier">
          <h2>Carrier wave</h2>
          <p>
            Start with a clean carrier. A jittery oscillator will leak harmonics
            into every neighbour band; if you are debugging audio, debug the
            carrier first.
          </p>
        </section>
        <section id="modulation">
          <h2>Modulation</h2>
          <p>
            AM is forgiving but noisy. SSB is parsimonious with bandwidth.
            Choose the one that maps to your patience for filter design.
          </p>
          <section id="mod-am">
            <h3>AM</h3>
            <p>
              Amplitude modulation: rugged and ancient. Detectable with a
              diode and a length of wire.
            </p>
          </section>
          <section id="mod-ssb">
            <h3>SSB</h3>
            <p>
              Single sideband: spectrally efficient, demanding on the
              receiver, kind to the antenna budget.
            </p>
          </section>
        </section>
        <section id="antenna">
          <h2>Antenna geometry</h2>
          <p>
            Length matters more than material. A bad antenna in a good location
            beats a good antenna in a bad one.
          </p>
        </section>
        <section id="refs">
          <h2>References</h2>
          <p>ARRL Handbook; manufacturer datasheets; field notebook entries.</p>
        </section>
      </article>
    }
  />
    </div>
  </CrtShell>
);

PostPageExample.displayName = "PostPageExample";
