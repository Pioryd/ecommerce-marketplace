import "regenerator-runtime/runtime";
import React from "react";
import { render, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

import store from "../../redux/store";
import * as ITEMS from "../../redux/modules/items/const";

import ItemView from "./index.js";

const ITEM = {
  title: "some-title",
  watching: true,
  description: "some-description",
  id: "some-id",
  price: 1,
  expirationDate: "5/20/2000, 11:47:59 AM"
};

function renderWithReduxAndRouter() {
  return render(
    <Provider store={store}>
      <BrowserRouter>
        <ItemView id={ITEM.id} />
      </BrowserRouter>
    </Provider>
  );
}

describe("Component - Item View", () => {
  beforeAll(() => {
    console.error = () => {};
  });

  test("no item", async () => {
    const rendered = renderWithReduxAndRouter();

    expect(rendered.getByText("Not found (404)")).toBeTruthy();
  });

  test("found item", async () => {
    const rendered = renderWithReduxAndRouter();

    await store.dispatch({
      type: ITEMS.UPDATE_ITEMS,
      payload: { "some-id": ITEM }
    });

    await waitFor(() => {});
    expect(rendered.getByText(ITEM.title)).toBeTruthy();
    expect(rendered.getByText("Watching")).toBeTruthy();
    expect(rendered.getByText("Price: €1.00")).toBeTruthy();
    expect(rendered.getByText(ITEM.description)).toBeTruthy();
    expect(rendered.getByText(`ID: ${ITEM.id}`)).toBeTruthy();
    expect(
      rendered.getByText(`Expiration: ${ITEM.expirationDate}`)
    ).toBeTruthy();
  });
});
