import "regenerator-runtime/runtime";
import React from "react";
import { render, fireEvent } from "@testing-library/react";

import SortSearch from "../SortSearch.js";

describe("Component - Items View - SortSearch", () => {
  test("update search", async () => {
    let retVal = null;
    const update = jest.fn((data) => {
      retVal = data;
    });

    const { container } = render(
      <SortSearch options={{}} sort="" update={update} />
    );

    const input = container.querySelector("#searchInput");

    fireEvent.change(input, { target: { value: "some-text" } });
    expect(update).toBeCalledTimes(0);

    fireEvent.keyDown(input, { key: "Enter", code: "Enter" });
    expect(update).toBeCalledTimes(1);
    expect(retVal).toEqual({ searchText: "some-text" });

    expect(input.value).toEqual("some-text");
  });

  test("update sort", async () => {
    const SORT_OPTIONS = {
      priceAsc: "Price: low to hight",
      priceDesc: "Price: hight to low",
      dateAsc: "Date: old to new",
      dateDesc: "Date: new to old"
    };

    let retVal = null;
    const update = jest.fn((data) => {
      retVal = data;
    });

    const { container } = render(
      <SortSearch options={SORT_OPTIONS} sort="dateDesc" update={update} />
    );

    const select = container.querySelector("#selectSort");
    expect(select.value).toEqual("dateDesc");

    fireEvent.change(select, { target: { value: "priceDesc" } });
    expect(retVal).toEqual({ sort: "priceDesc" });

    expect(select.value).toEqual("dateDesc");
  });
});
