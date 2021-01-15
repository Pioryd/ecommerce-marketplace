import reducer from "../reducer";
import * as ACCOUNT from "../const";

describe("Redux - Cart - reducer", () => {
  it("Initialization", () => {
    Storage.prototype.getItem = jest.fn(() => {});

    expect(reducer(undefined, {})).toStrictEqual({});
  });

  it("UPDATE_ITEMS", () => {
    const payload = {};

    expect(reducer({}, { type: ACCOUNT.UPDATE_ITEMS, payload: {} })).toEqual({
      items: payload
    });
  });

  it("UPDATE_CHECKOUT_FAILURE", () => {
    const payload = "";

    expect(
      reducer({}, { type: ACCOUNT.UPDATE_CHECKOUT_FAILURE, payload })
    ).toEqual({ checkoutFailure: payload });
  });

  it("RESET", () => {
    const payload = {};

    expect(reducer({}, { type: ACCOUNT.RESET, payload })).toEqual(payload);
  });
});
