import "regenerator-runtime/runtime";
import React from "react";
import { render, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

import store from "../../../redux/store";
import * as CART from "../../../redux/modules/cart/const";
import * as ACCOUNT from "../../../redux/modules/account/const";

import Navigation from "./index.js";

function renderWithReduxAndRouter() {
  return render(
    <Provider store={store}>
      <BrowserRouter>
        <Navigation />
      </BrowserRouter>
    </Provider>
  );
}
describe("Component - Layout - Navigation", () => {
  beforeAll(() => {
    console.error = () => {};
  });

  test("initialize", async () => {
    const rendered = renderWithReduxAndRouter();

    expect(rendered.getByText("Cart (0)")).toBeTruthy();
    expect(rendered.queryByText("Account")).toBeTruthy();
  });

  test("after cart update and sing in", async () => {
    const rendered = renderWithReduxAndRouter();

    expect(rendered.getByText("Cart (0)")).toBeTruthy();

    await store.dispatch({
      type: CART.UPDATE_ITEMS,
      payload: { item1: { quantity: 1 }, item2: { quantity: 1 } }
    });

    expect(rendered.getByText("Cart (0)")).toBeTruthy();

    await store.dispatch({
      type: ACCOUNT.UPDATE_TOKEN,
      payload: "some-token"
    });

    await waitFor(() => expect(rendered.getByText("Cart (2)")).toBeTruthy());
  });
});
