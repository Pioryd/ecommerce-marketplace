import "regenerator-runtime/runtime";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";

import * as actions from "../actions";
import * as ACCOUNT from "../const";

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const token = "some-token";
let store = {}; // as redux store
let storage = {}; // as localStorage

describe("Redux - Account - actions", () => {
  beforeAll(() => {
    console.error = () => {};
    Storage.prototype.getItem = jest.fn((key) => {
      return storage[key];
    });
    Storage.prototype.setItem = jest.fn((key, value) => (storage[key] = value));
    Storage.prototype.removeItem = jest.fn((key) => delete storage[key]);
    Storage.prototype.clear = jest.fn((key) => {
      storage = {};
    });
  });

  beforeEach(() => {
    store = mockStore({ account: {} });
    global.fetch = jest.fn(() =>
      Promise.resolve({ ok: true, json: () => Promise.resolve({}) })
    );

    localStorage.clear();
  });

  describe("signIn", () => {
    it("wrong args", async () => {
      expect(
        await store.dispatch(actions.signIn({ email: "", password: "" }))
      ).toEqual("Error: Wrong email.");
    });

    it("correct args", async () => {
      global.fetch = jest.fn(() =>
        Promise.resolve({ ok: true, json: () => Promise.resolve({ token }) })
      );

      expect(localStorage.getItem("token")).toEqual(undefined);

      expect(
        await store.dispatch(
          actions.signIn({ email: "some@email.com", password: "some-password" })
        )
      ).toEqual(undefined);
      expect(store.getActions()).toEqual([
        { type: ACCOUNT.UPDATE_TOKEN, payload: token }
      ]);

      expect(localStorage.getItem("token")).toEqual(token);
    });
  });

  describe("create", () => {
    it("wrong args", async () => {
      expect(
        await store.dispatch(actions.create({ email: "", password: "" }))
      ).toEqual("Error: Wrong email.");
    });

    it("correct args", async () => {
      global.fetch = jest.fn(() =>
        Promise.resolve({ ok: true, json: () => Promise.resolve({ token }) })
      );

      expect(localStorage.getItem("token")).toEqual(undefined);

      expect(
        await store.dispatch(
          actions.create({ email: "some@email.com", password: "some-password" })
        )
      ).toEqual(undefined);
      expect(store.getActions()).toEqual([
        { type: ACCOUNT.UPDATE_TOKEN, payload: token }
      ]);

      expect(localStorage.getItem("token")).toEqual(token);
    });
  });

  describe("recover", () => {
    it("wrong args", async () => {
      expect(await store.dispatch(actions.recover({ email: "" }))).toEqual(
        "Error: Wrong email."
      );
    });

    it("correct args", async () => {
      expect(localStorage.getItem("token")).toEqual(undefined);

      expect(
        await store.dispatch(
          actions.recover({
            email: "some@email.com"
          })
        )
      ).toEqual(undefined);
      expect(store.getActions()).toEqual([]);

      expect(localStorage.getItem("token")).toEqual(undefined);
    });
  });

  describe("remove", () => {
    it("not signed in", async () => {
      expect(await store.dispatch(actions.remove({}))).toEqual(
        "Error: Account is not signed in."
      );
    });

    it("wrong args", async () => {
      store = mockStore({ account: { token } });

      expect(await store.dispatch(actions.remove({ password: "" }))).toEqual(
        "Error: Wrong password. Password must have at least 6 characters."
      );
    });

    it("correct args", async () => {
      store = mockStore({ account: { token } });
      global.fetch = jest.fn(() =>
        Promise.resolve({ ok: true, json: () => Promise.resolve({ token }) })
      );

      expect(localStorage.getItem("token")).toEqual(undefined);
      expect(
        await store.dispatch(
          actions.remove({
            password: "some-password"
          })
        )
      ).toEqual(undefined);

      expect(store.getActions()).toEqual([{ type: ACCOUNT.RESET }]);
      expect(localStorage.getItem("token")).toEqual(undefined);
    });
  });

  describe("update", () => {
    it("not signed in", async () => {
      expect(await store.dispatch(actions.update({}))).toEqual(
        "Error: Account is not signed in."
      );
    });

    it("wrong args", async () => {
      store = mockStore({ account: { token } });

      expect(await store.dispatch(actions.update({ password: "" }))).toEqual(
        "Error: Wrong password. Password must have at least 6 characters."
      );
    });

    it("correct args", async () => {
      store = mockStore({ account: { token } });
      global.fetch = jest.fn(() =>
        Promise.resolve({ ok: true, json: () => Promise.resolve({ token }) })
      );

      expect(localStorage.getItem("token")).toEqual(undefined);
      expect(
        await store.dispatch(
          actions.update({
            password: "some-password",
            oldPassword: "some-password",
            newPassword: "some-password"
          })
        )
      ).toEqual(undefined);

      expect(store.getActions()).toEqual([]);
      expect(localStorage.getItem("token")).toEqual(undefined);
    });
  });

  describe("get", () => {
    it("not signed in", async () => {
      expect(await store.dispatch(actions.get({}))).toEqual(
        "Error: Account is not signed in."
      );
    });

    it("signed in", async () => {
      const accountDetails = { id: "some-id", itemsWatching: [] };
      store = mockStore({ account: { token } });
      global.fetch = jest.fn(() =>
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve(accountDetails)
        })
      );

      expect(localStorage.getItem("token")).toEqual(undefined);
      expect(await store.dispatch(actions.get())).toEqual(undefined);

      expect(store.getActions()).toEqual([
        { type: ACCOUNT.UPDATE_DETAILS, payload: accountDetails }
      ]);
      expect(localStorage.getItem("token")).toEqual(undefined);
    });
  });

  describe("signOut", () => {
    it("signed in", async () => {
      store = mockStore({ account: { token } });

      expect(localStorage.getItem("token")).toEqual(undefined);

      expect(await store.dispatch(actions.signOut())).toEqual(undefined);
      expect(store.getActions()).toEqual([{ type: ACCOUNT.RESET }]);

      expect(localStorage.getItem("token")).toEqual(undefined);
    });
  });

  describe("refreshToken", () => {
    it("not signed in", async () => {
      expect(await store.dispatch(actions.refreshToken({}))).toEqual(
        "Error: Account is not signed in."
      );
    });

    it("signed in", async () => {
      store = mockStore({ account: { token } });
      global.fetch = jest.fn(() =>
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve({ token })
        })
      );

      expect(localStorage.getItem("token")).toEqual(undefined);
      expect(await store.dispatch(actions.refreshToken())).toEqual(undefined);

      expect(store.getActions()).toEqual([
        { type: ACCOUNT.UPDATE_TOKEN, payload: token }
      ]);
      expect(localStorage.getItem("token")).toEqual(token);
    });
  });
});
