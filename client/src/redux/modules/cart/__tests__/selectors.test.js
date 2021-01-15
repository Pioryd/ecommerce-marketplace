import * as selectors from "../selectors";

const state = { cart: { items: {}, checkoutFailure: "" } };

describe("Redux - Cart - selector", () => {
  it("getItems", () => {
    expect(selectors.getItems()(state)).toEqual(state.cart.items);
  });
  it("getCheckoutFailure", () => {
    expect(selectors.getCheckoutFailure()(state)).toEqual(
      state.cart.checkoutFailure
    );
  });
});
