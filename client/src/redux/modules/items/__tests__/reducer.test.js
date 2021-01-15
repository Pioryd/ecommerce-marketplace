import reducer from "../reducer";
import * as CART from "../const";

describe("Redux - Items - reducer", () => {
  it("Initialization", () => {
    Storage.prototype.getItem = jest.fn(() => {});

    expect(reducer(undefined, {})).toStrictEqual({});
  });

  it("UPDATE_ITEMS", () => {
    const payload = { "some-item-id": {} };

    expect(reducer({}, { type: CART.UPDATE_ITEMS, payload })).toEqual({
      items: payload
    });
  });

  it("UPDATE_PAGINATION", () => {
    const payload = { totalItems: 1, currentPage: 1, totalPages: 1 };

    expect(reducer({}, { type: CART.UPDATE_PAGINATION, payload })).toEqual(
      payload
    );
  });

  it("RESET", () => {
    const payload = {};

    expect(reducer({}, { type: CART.RESET, payload })).toEqual(payload);
  });
});
