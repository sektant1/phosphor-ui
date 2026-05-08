import React from "react";
import { render, screen } from "@testing-library/react";
import SearchResultList from "./SearchResult";

describe("SearchResultList", () => {
  test("renders hits", () => {
    render(
      <SearchResultList
        hits={[{ href: "/x", title: "Hello", snippet: "world" }]}
      />
    );
    expect(screen.getByText("Hello")).toBeTruthy();
    expect(screen.getByText("world")).toBeTruthy();
  });

  test("renders empty state", () => {
    render(<SearchResultList hits={[]} emptyMessage="zilch" />);
    expect(screen.getByText("zilch")).toBeTruthy();
  });
});
