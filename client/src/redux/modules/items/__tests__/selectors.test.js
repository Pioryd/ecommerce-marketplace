import * as selectors from "../selectors";

const state = {
  items: {
    items: { "some-item-id": {} },
    totalItems: 1,
    currentPage: 1,
    totalPages: 1
  }
};

describe("Redux - Items - selector", () => {
  it("get", () => {
    expect(selectors.get()(state)).toEqual(state.items);
  });
  it("getItems", () => {
    expect(selectors.getItems()(state)).toEqual(state.items.items);
  });
  it("getItem", () => {
    expect(selectors.getItem("some-item-id")(state)).toEqual(
      state.items.items["some-item-id"]
    );
  });
  it("getPagination", () => {
    const data = { ...state.items };
    delete data.items;

    expect(selectors.getPagination()(state)).toEqual(data);
  });
});
