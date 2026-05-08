import React from "react";
import { render, screen } from "@testing-library/react";
import { Page } from "./Page";

describe("Page", () => {
  test("renders header, hero, sidebar, children, and footer", () => {
    render(
      <Page
        header={<span>Header</span>}
        hero={<span>Hero</span>}
        sidebar={<nav>Sidebar</nav>}
        footer={<span>Footer</span>}
        sidebarLabel="test sidebar"
      >
        Body
      </Page>,
    );

    expect(screen.getByText("Header")).toBeTruthy();
    expect(screen.getByText("Hero")).toBeTruthy();
    expect(screen.getByLabelText("test sidebar")).toBeTruthy();
    expect(screen.getByText("Body")).toBeTruthy();
    expect(screen.getByText("Footer")).toBeTruthy();
  });

  test("supports left sidebar placement", () => {
    const { container } = render(
      <Page sidebar={<nav>Left rail</nav>} sidebarPosition="left">
        Body
      </Page>,
    );

    const body = container.querySelector("article > div");
    expect(body?.className).toContain("sidebarLeft");
  });
});
