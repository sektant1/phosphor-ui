import React from "react";
import { render } from "@testing-library/react";
import {
  AutoGrid,
  ContentFrame,
  ContentShell,
  ContentWidth,
  DashboardGrid,
  Grid,
  PageShell,
  ResponsiveColumns,
  SidebarLayout,
  SplitLayout,
  SplitPane,
} from "./Layout";

describe("Layout primitives", () => {
  test("keeps custom grid item minimums responsive", () => {
    const { container } = render(
      <Grid minItemWidth="18rem" mobileMinItemWidth={240}>
        <div>alpha</div>
        <div>beta</div>
      </Grid>,
    );

    const grid = container.firstElementChild as HTMLElement;
    expect(grid.style.getPropertyValue("--pho-grid-min")).toBe(
      "min(100%, 18rem)",
    );
    expect(grid.style.getPropertyValue("--pho-mobile-grid-min")).toBe(
      "min(100%, 240px)",
    );
  });

  test("applies content frame width and padding variables", () => {
    const { getByText } = render(
      <ContentFrame width="42rem" padding="md">
        Frame content
      </ContentFrame>,
    );

    const frame = getByText("Frame content");
    expect(frame.style.getPropertyValue("--pho-content-frame-width")).toBe(
      "42rem",
    );
    expect(frame.style.getPropertyValue("--pho-content-frame-padding")).toBe(
      "var(--pho-space-5)",
    );
  });

  test("renders page shell header and actions", () => {
    const { getByRole, getByText } = render(
      <PageShell
        eyebrow="docs"
        title="Knowledge base"
        description="Field notes and runbooks."
        actions={<button type="button">New note</button>}
      >
        Body
      </PageShell>,
    );

    expect(getByRole("heading", { level: 1 }).textContent).toBe(
      "Knowledge base",
    );
    expect(getByText("docs")).toBeTruthy();
    expect(getByRole("button", { name: "New note" })).toBeTruthy();
  });

  test("renders accessible sidebar and aside regions", () => {
    const { getByLabelText, getByRole } = render(
      <SidebarLayout
        sidebar={<nav>Tree</nav>}
        sidebarLabel="content tree"
        aside={<nav>On this page</nav>}
        asideLabel="table of contents"
      >
        <h1>Post</h1>
      </SidebarLayout>,
    );

    expect(getByLabelText("content tree")).toBeTruthy();
    expect(getByLabelText("table of contents")).toBeTruthy();
    expect(getByRole("main").textContent).toContain("Post");
  });

  test("supports left main right aliases for sidebar layout", () => {
    const { getByLabelText, getByRole } = render(
      <SidebarLayout
        left={<nav>Tree</nav>}
        main={<h1>Docs</h1>}
        right={<nav>On this page</nav>}
        sidebarLabel="docs nav"
        asideLabel="page toc"
        collapseAt="lg"
      />,
    );

    expect(getByLabelText("docs nav").textContent).toContain("Tree");
    expect(getByLabelText("page toc").textContent).toContain("On this page");
    expect(getByRole("main").textContent).toContain("Docs");
  });

  test("renders named grid convenience primitives", () => {
    const { container } = render(
      <>
        <AutoGrid minItemWidth="18rem">
          <div>card</div>
        </AutoGrid>
        <ResponsiveColumns columns={3}>
          <div>column</div>
        </ResponsiveColumns>
        <DashboardGrid>
          <div>stat</div>
        </DashboardGrid>
      </>,
    );

    const [autoGrid, responsiveColumns, dashboardGrid] = Array.from(
      container.children,
    ) as HTMLElement[];
    expect(autoGrid.style.getPropertyValue("--pho-grid-min")).toBe(
      "min(100%, 18rem)",
    );
    expect(responsiveColumns.style.getPropertyValue("--pho-grid-columns")).toBe(
      "repeat(3, minmax(0, 1fr))",
    );
    expect(dashboardGrid.className).toContain("dashboardGrid");
  });

  test("renders content width and content shell primitives", () => {
    const { getByText, getByRole } = render(
      <>
        <ContentWidth width="40rem">Readable measure</ContentWidth>
        <ContentShell title="Article" description="Readable body">
          Body
        </ContentShell>
      </>,
    );

    const width = getByText("Readable measure");
    expect(width.style.getPropertyValue("--pho-content-width")).toBe("40rem");
    expect(getByRole("heading", { level: 1 }).textContent).toBe("Article");
  });

  test("applies split pane sizing variables", () => {
    const { container } = render(
      <SplitPane start="Editor" end="Preview" startWidth="minmax(0, 2fr)" />,
    );

    const split = container.firstElementChild as HTMLElement;
    expect(split.style.getPropertyValue("--pho-split-pane-start")).toBe(
      "minmax(0, 2fr)",
    );
  });

  test("exports split layout as split pane alias", () => {
    expect(SplitLayout).toBe(SplitPane);
  });
});
