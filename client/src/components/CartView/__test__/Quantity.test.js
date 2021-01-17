import "regenerator-runtime/runtime";
import React from "react";
import { render, fireEvent } from "@testing-library/react";

import Quantity from "../Quantity.js";

describe("Component - Cart View - Quantity", () => {
  beforeAll(() => {
    console.error = () => {};
  });

  test("update", async () => {
    const { rerender, container } = render(
      <Quantity updating={false} quantity="2" stock="3" />
    );
    expect(container.querySelector("#selectQuantity")).toBeTruthy();
    expect(container.querySelector("#inputQuantity")).not.toBeTruthy();

    rerender(<Quantity updating={false} quantity="12" stock="20" />);

    expect(container.querySelector("#selectQuantity")).not.toBeTruthy();
    expect(container.querySelector("#inputQuantity")).toBeTruthy();
    expect(container.querySelector("#inputButtonQuantity")).not.toBeTruthy();

    const input = container.querySelector("#inputQuantity");
    fireEvent.change(input, { target: { value: 12 + 1 } });

    expect(container.querySelector("#inputButtonQuantity")).toBeTruthy();
  });
});
