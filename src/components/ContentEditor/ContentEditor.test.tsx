import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { ContentEditor, FieldSpec } from "./ContentEditor";

interface TestData {
  title: string;
  slug: string;
  status: "draft" | "published" | "archived";
}

const fields: FieldSpec[] = [
  { kind: "text", key: "title", prompt: "title >", placeholder: "title" },
  { kind: "text", key: "slug", prompt: "slug >", placeholder: "slug" },
];

describe("ContentEditor", () => {
  test("auto-generates slug and saves current payload", () => {
    const onSave = jest.fn();
    const { container } = render(
      <ContentEditor<TestData>
        kindLabel="TEST"
        saveLabel="save test"
        fields={fields}
        autoSlug={{ from: "title", to: "slug" }}
        onSave={onSave}
      />
    );

    const title = container.querySelector(
      'input[placeholder="title"]'
    ) as HTMLInputElement;
    const slug = container.querySelector(
      'input[placeholder="slug"]'
    ) as HTMLInputElement;

    fireEvent.change(title, { target: { value: "Hello Production UI" } });
    expect(slug.value).toBe("hello-production-ui");

    fireEvent.click(screen.getByText("save test"));
    expect(onSave).toHaveBeenCalledWith({
      title: "Hello Production UI",
      slug: "hello-production-ui",
      status: "draft",
    });
  });
});
