import "regenerator-runtime/runtime";
import { renderHook, act } from "@testing-library/react-hooks";

import usePaginationAndSortSearch from "../usePaginationAndSortSearch.js";

jest.mock("react-router-dom", () => ({
  useHistory: jest.fn(() => {
    return {
      push: () => {}
    };
  }),
  useLocation: jest.fn(() => "")
}));

describe("Component - Items View - usePaginationAndSortSearch", () => {
  test("update", async () => {
    const { result } = renderHook(() => usePaginationAndSortSearch("one"));

    expect(result.current.sort).toEqual("dateDesc");
    expect(result.current.page).toEqual(1);
    expect(result.current.searchText).toEqual("");

    act(() => {
      result.current.update({
        sort: "priceAsc",
        page: 2,
        searchText: "some-text"
      });
    });

    expect(result.current.sort).toEqual("priceAsc");
    expect(result.current.page).toEqual(2);
    expect(result.current.searchText).toEqual("some-text");
  });
});
