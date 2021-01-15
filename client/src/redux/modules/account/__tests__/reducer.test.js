import reducer from "../reducer";
import * as ACCOUNT from "../const";

describe("Redux - Account - reducer", () => {
  it("Initialization", () => {
    const token = "some-token";
    Storage.prototype.getItem = jest.fn(() => token);

    expect(reducer(undefined, {})).toStrictEqual({ token });
  });

  it("UPDATE_TOKEN", () => {
    const token = "some-token";

    expect(
      reducer({}, { type: ACCOUNT.UPDATE_TOKEN, payload: token })
    ).toEqual({ token });
  });

  it("UPDATE_DETAILS", () => {
    const payload = { id: "some-id", itemsWatching: [] };
    const payload2 = { id: "some-id", itemsWatching: [] };

    expect(reducer({}, { type: ACCOUNT.UPDATE_DETAILS, payload })).toEqual(
      payload2
    );
  });

  it("RESET", () => {
    const token1 = "some-token1";
    const token2 = "some-token1";
    Storage.prototype.getItem = jest.fn(() => token2);

    expect(
      reducer({}, { type: ACCOUNT.UPDATE_TOKEN, payload: token1 })
    ).toEqual({ token: token1 });

    expect(reducer({}, { type: ACCOUNT.RESET })).toEqual({ token: token2 });
  });
});
