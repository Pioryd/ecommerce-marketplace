import "regenerator-runtime/runtime";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";

import * as actions from "../actions";
import * as ITEMS from "../const";

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const token = "some-token";
let store = {}; // as redux store
let storage = {}; // as localStorage

describe("Redux - Items - actions", () => {
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

  describe("list", () => {
    it("sign in and validate", async () => {
      expect(await store.dispatch(actions.list({}))).toEqual(
        "Error: Account is not signed in."
      );

      store = mockStore({ account: { token } });

      expect(await store.dispatch(actions.list({ title: "" }))).toEqual(
        "Error: Title is too short."
      );

      const data = {
        title: "some-title",
        price: 1,
        stock: 1,
        description: "some-description"
      };
      expect(await store.dispatch(actions.list(data))).toEqual(undefined);
    });
  });

  describe("toggleWatch", () => {
    it("sign in and validate", async () => {
      expect(await store.dispatch(actions.toggleWatch({}))).toEqual(
        "Error: Account is not signed in."
      );

      store = mockStore({ account: { token } });

      const data = { id: "some-id" };
      expect(await store.dispatch(actions.toggleWatch(data))).toEqual(
        undefined
      );
    });
  });

  describe("close", () => {
    it("sign in and validate", async () => {
      expect(await store.dispatch(actions.close({}))).toEqual(
        "Error: Account is not signed in."
      );

      store = mockStore({ account: { token } });

      const data = { id: "some-id" };
      expect(await store.dispatch(actions.close(data))).toEqual(undefined);
    });
  });

  describe("getSearch/getSelling/getSold/getUnsold/getBought/getWatching", () => {
    it("not sign in", async () => {
      expect(await store.dispatch(actions.close({}))).toEqual(
        "Error: Account is not signed in."
      );
    });

    it("update", async () => {
      store = mockStore({ account: { token } });

      const response = {
        items: {},
        totalItems: 1,
        currentPage: 1,
        totalPages: 1
      };
      const payload1 = response.items;
      const payload2 = { ...response };
      delete payload2.items;
      global.fetch = jest.fn(() =>
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve(response)
        })
      );
      const data = { ids: "some-id", page: 1, sort: 1, searchText: "" };
      expect(await store.dispatch(actions.getSearch(data))).toEqual(undefined);

      expect(store.getActions()).toEqual([
        { type: ITEMS.UPDATE_ITEMS, payload: payload1 },
        { type: ITEMS.UPDATE_PAGINATION, payload: payload2 }
      ]);
    });
  });

  describe("getSelling", () => {
    it("not sign in", async () => {
      expect(await store.dispatch(actions.getSelling({}))).toEqual(
        "Error: Account is not signed in."
      );
    });
  });

  describe("getSold", () => {
    it("not sign in", async () => {
      expect(await store.dispatch(actions.getSold({}))).toEqual(
        "Error: Account is not signed in."
      );
    });
  });

  describe("getUnsold", () => {
    it("not sign in", async () => {
      expect(await store.dispatch(actions.getUnsold({}))).toEqual(
        "Error: Account is not signed in."
      );
    });
  });

  describe("getBought", () => {
    it("not sign in", async () => {
      expect(await store.dispatch(actions.getBought({}))).toEqual(
        "Error: Account is not signed in."
      );
    });
  });

  describe("getWatching", () => {
    it("not sign in", async () => {
      expect(await store.dispatch(actions.getWatching({}))).toEqual(
        "Error: Account is not signed in."
      );
    });
  });

  describe("clear", () => {
    it("update", async () => {
      expect(await store.dispatch(actions.clear())).toEqual(undefined);
      expect(store.getActions()).toEqual([{ type: ITEMS.RESET }]);
    });
  });
});
