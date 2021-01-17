import "regenerator-runtime/runtime";
import React from "react";
import { render } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";

import Item from "../Item.js";

function renderWithRouter(props) {
  return render(
    <BrowserRouter>
      <Item {...props} />
    </BrowserRouter>
  );
}

describe("Component - Cart View - Item", () => {
  beforeAll(() => {
    console.error = () => {};
  });

  test("update", async () => {
    const data = { price: 2, total: 24, quantity: 12 };
    const rendered = renderWithRouter({ data });

    expect(rendered.getByText("Total: €24.00")).toBeTruthy();
    expect(rendered.getByText("Price: €2.00")).toBeTruthy();
  });
});
