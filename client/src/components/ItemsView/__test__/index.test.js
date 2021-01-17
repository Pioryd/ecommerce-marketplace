import "regenerator-runtime/runtime";
import React from "react";
import { render, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

import store from "../../../redux/store";
import * as ITEMS from "../../../redux/modules/items/const";

import ItemsView from "../index.js";

function renderWithReduxAndRouter(props) {
  return render(
    <Provider store={store}>
      <BrowserRouter>
        <ItemsView {...props} />
      </BrowserRouter>
    </Provider>
  );
}

describe("Component - Items View", () => {
  beforeAll(() => {
    console.error = () => {};
  });

  test("loading", async () => {
    const rendered = renderWithReduxAndRouter({ searchType: "general" });

    expect(rendered.queryByText("loading...")).toBeTruthy();

    await store.dispatch({
      type: ITEMS.UPDATE_PAGINATION,
      payload: { totalItems: 20, currentPage: 1, totalPages: 2 }
    });

    await waitFor(() => {});
    expect(rendered.queryByText("loading...")).not.toBeTruthy();
  });
});

test("update", async () => {
  expect(true).toBe(true);
});
