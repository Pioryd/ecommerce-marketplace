import "regenerator-runtime/runtime";
import React from "react";
import { render, fireEvent } from "@testing-library/react";

import Pagination from "../Pagination.js";

describe("Component - Items View - Pagination", () => {
  beforeAll(() => {
    console.error = () => {};
  });

  test("update", async () => {
    let retVal = null;
    const update = jest.fn((data) => {
      retVal = data;
    });

    const { container } = render(
      <Pagination update={update} currentPage="4" totalPages="10" />
    );

    const pagePrevButton = container.querySelector("#pagePrevButton");
    fireEvent.click(pagePrevButton);
    expect(Number(retVal.page)).toEqual(3);

    const pageMinButton = container.querySelector("#pageMinButton");
    fireEvent.click(pageMinButton);
    expect(Number(retVal.page)).toEqual(1);

    const pageMaxButton = container.querySelector("#pageMaxButton");
    fireEvent.click(pageMaxButton);
    expect(Number(retVal.page)).toEqual(10);

    const pageNextButton = container.querySelector("#pageNextButton");
    fireEvent.click(pageNextButton);
    expect(Number(retVal.page)).toBe(5);
  });
});
