import "regenerator-runtime/runtime";
import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";

import Item from "../Item.js";

const ITEM = {
  title: "some-title",
  watching: true,
  description: "some-description",
  id: "some-id",
  price: 1,
  quantity: 2,
  sold: 7,
  stock: 12,
  expirationDate: "5/20/2000, 11:47:59 AM"
};

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

  test("options - allowClose", async () => {
    {
      const { container } = renderWithRouter({
        data: ITEM,
        options: { allowClose: false }
      });
      expect(container.querySelector("#closeButton")).not.toBeTruthy();
      expect(container.querySelector("#confirmButton")).not.toBeTruthy();
      expect(container.querySelector("#cancelButton")).not.toBeTruthy();
    }
    {
      const { container } = renderWithRouter({
        data: ITEM,
        options: { allowClose: true }
      });
      expect(container.querySelector("#closeButton")).toBeTruthy();
      expect(container.querySelector("#confirmButton")).not.toBeTruthy();
      expect(container.querySelector("#cancelButton")).not.toBeTruthy();
      fireEvent.click(container.querySelector("#closeButton"));
      expect(container.querySelector("#confirmButton")).toBeTruthy();
      expect(container.querySelector("#cancelButton")).toBeTruthy();
      fireEvent.click(container.querySelector("#cancelButton"));
      expect(container.querySelector("#confirmButton")).not.toBeTruthy();
      expect(container.querySelector("#cancelButton")).not.toBeTruthy();
    }
  });

  test("options - showQuantity/showSold/showStock", async () => {
    {
      const { container } = renderWithRouter({
        data: ITEM,
        options: {}
      });
      expect(container.querySelector("#additionalInfo")).not.toBeTruthy();
    }
    {
      const { container } = renderWithRouter({
        data: ITEM,
        options: { showQuantity: true }
      });
      expect(container.querySelector("#additionalInfo").textContent).toEqual(
        "Quantity: 2"
      );
    }
    {
      const { container } = renderWithRouter({
        data: ITEM,
        options: { showSold: true }
      });
      expect(container.querySelector("#additionalInfo").textContent).toEqual(
        "Sold: 7"
      );
    }
    {
      const { container } = renderWithRouter({
        data: ITEM,
        options: { showStock: true }
      });
      expect(container.querySelector("#additionalInfo").textContent).toEqual(
        "Stock: 12"
      );
    }
  });
});
