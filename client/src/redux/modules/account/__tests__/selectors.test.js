import * as selectors from "../selectors";

const state = { account: { token: "some-token" } };

describe("Redux - Account - selector", () => {
  it("get", () => {
    expect(selectors.get()(state)).toEqual(state.account);
  });
  it("getToken", () => {
    expect(selectors.getToken()(state)).toEqual(state.account.token);
  });
});
