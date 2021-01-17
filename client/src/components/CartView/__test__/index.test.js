import "regenerator-runtime/runtime";
import React from "react";
import { render, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

import store from "../../../redux/store";
import * as CART from "../../../redux/modules/cart/const";

import CartView from "../index.js";

const ITEM = {
  title: "some-title",
  watching: true,
  description: "some-description",
  id: "some-id",
  price: 1,
  quantity: 2,
  expirationDate: "5/20/2000, 11:47:59 AM"
};

function renderWithReduxAndRouter(props) {
  return render(
    <Provider store={store}>
      <BrowserRouter>
        <CartView {...props} />
      </BrowserRouter>
    </Provider>
  );
}

describe("Component - Cart View", () => {
  beforeAll(() => {
    console.error = () => {};
  });

  test("loading", async () => {
    const rendered = renderWithReduxAndRouter();

    expect(rendered.queryByText("loading...")).toBeTruthy();

    await store.dispatch({
      type: CART.UPDATE_ITEMS,
      payload: { "some-id": ITEM }
    });

    await waitFor(() => {});
    expect(rendered.queryByText("loading...")).not.toBeTruthy();
  });

  test("view", async () => {
    const rendered = renderWithReduxAndRouter();

    await store.dispatch({
      type: CART.UPDATE_ITEMS,
      payload: {}
    });
    await waitFor(() => {});

    expect(rendered.getByText("Subtotal: €0.00")).toBeTruthy();

    await store.dispatch({
      type: CART.UPDATE_ITEMS,
      payload: { "some-id": ITEM }
    });
    await waitFor(() => {});

    expect(rendered.getByText("Subtotal: €2.00")).toBeTruthy();
  });
});
