import "regenerator-runtime/runtime";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";

import * as actions from "../actions";
import * as CART from "../const";

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const token = "some-token";
let store = {}; // as redux store
let storage = {}; // as localStorage

describe("Redux - Cart - actions", () => {
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

  describe("add", () => {
    it("sign in", async () => {
      expect(await store.dispatch(actions.add({}))).toEqual(
        "Error: Account is not signed in."
      );

      store = mockStore({ account: { token } });
      const data = { id: "", quantity: "" };
      expect(await store.dispatch(actions.update(data))).toEqual(undefined);
    });
  });

  describe("update", () => {
    it("sign in", async () => {
      expect(await store.dispatch(actions.update({}))).toEqual(
        "Error: Account is not signed in."
      );

      store = mockStore({ account: { token } });
      const data = { id: "", quantity: "" };
      expect(await store.dispatch(actions.update(data))).toEqual(undefined);
    });
  });

  describe("remove", () => {
    it("sign in", async () => {
      expect(await store.dispatch(actions.remove({}))).toEqual(
        "Error: Account is not signed in."
      );

      store = mockStore({ account: { token } });
      const data = { id: "" };
      expect(await store.dispatch(actions.remove(data))).toEqual(undefined);
    });
  });

  describe("get", () => {
    it("sign in", async () => {
      expect(await store.dispatch(actions.get({}))).toEqual(
        "Error: Account is not signed in."
      );

      store = mockStore({ account: { token } });

      expect(await store.dispatch(actions.get())).toEqual(undefined);
    });

    it("signed in", async () => {
      const items = {};
      store = mockStore({ account: { token } });
      global.fetch = jest.fn(() =>
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve({ items })
        })
      );

      expect(await store.dispatch(actions.get())).toEqual(undefined);
      expect(store.getActions()).toEqual([
        { type: CART.UPDATE_ITEMS, payload: items }
      ]);
    });
  });

  describe("transaction", () => {
    it("sign in", async () => {
      expect(await store.dispatch(actions.transaction({}))).toEqual(
        "Error: Account is not signed in."
      );

      store = mockStore({ account: { token } });
      const data = {
        shipping: {
          name: "some-name",
          street1: "some-street",
          street2: "some-street",
          city: "some-city",
          state: "some-state",
          postalCode: "66-666",
          phone: "555444333",
          payWith: "cashOnDelivery"
        },
        id: "",
        quantity: ""
      };

      expect(await store.dispatch(actions.transaction(data))).toEqual(
        undefined
      );
    });

    it("wrong args", async () => {
      store = mockStore({ account: { token } });

      expect(
        await store.dispatch(actions.transaction({ shipping: { name: "" } }))
      ).toEqual("Error: Name is empty.");
    });
  });

  describe("clear", () => {
    it(" ", async () => {
      expect(await store.dispatch(actions.clear({}))).toEqual(undefined);
      expect(store.getActions()).toEqual([{ type: CART.RESET }]);
    });
  });

  describe("setCheckoutFailure", () => {
    it("sing in and update", async () => {
      expect(await store.dispatch(actions.setCheckoutFailure({}))).toEqual(
        "Error: Account is not signed in."
      );

      const checkoutFailure = "";
      store = mockStore({ account: { token } });

      expect(
        await store.dispatch(actions.setCheckoutFailure(checkoutFailure))
      ).toEqual(undefined);
      expect(store.getActions()).toEqual([
        { type: CART.UPDATE_CHECKOUT_FAILURE, payload: checkoutFailure }
      ]);
    });
  });
});
