const server = require("./helper/server");

const TransactionModel = require("../src/models/transaction");

const AccountService = require("../src/services/account");
const ItemService = require("../src/services/item");
const CartService = require("../src/services/cart");

const SHIPPING = {
  name: "some-name",
  street1: "some-street",
  street2: "some-street",
  city: "some-city",
  state: "123456",
  postalCode: "12-234",
  phone: "555222444",
  payWith: "cashOnDelivery"
};
const SIGN_IN = { email: "some_1@email.com", password: "123123" };
const account = { token: "" };
let items = {};

// The tests order  matters
describe("Cart", () => {
  beforeAll(async () => {
    console.error = () => {};

    await server.initialize();

    await AccountService.create(SIGN_IN);

    for (let i = 0; i < 10; i++)
      await ItemService.list({
        accountId: SIGN_IN.email,
        title: "some title " + i,
        price: 5 + i + 1,
        stock: 5 + (i + 1) * 10,
        description: "some description " + i
      });

    items = (await ItemService.getSearch({})).items;
  });
  afterAll(async () => {
    await server.terminate();
  });

  test("POST /cart/add", async () => {
    account.token = (await AccountService.signIn(SIGN_IN)).token;

    const itemsCount = 3;
    const ids = Object.keys(items).slice(0, itemsCount);
    for (const id of ids)
      await server.request
        .post("/cart/add")
        .send({
          accountId: SIGN_IN.email,
          id: id,
          quantity: 2
        })
        .set("Authorization", "Bearer " + account.token)
        .expect(200);

    const cart = await CartService.get({ accountId: SIGN_IN.email });
    expect(Object.keys(cart.items).length).toBe(itemsCount);
    expect(Object.keys(cart.items).sort()).toEqual(ids.sort());
  });

  test("GET /cart", async () => {
    account.token = (await AccountService.signIn(SIGN_IN)).token;

    await server.request
      .get("/cart")
      .set("Authorization", "Bearer " + account.token)
      .expect(200)
      .then((response) => {
        expect(Object.keys(response.body.items).length).toBe(3);
      });
  });

  test("PUT /cart", async () => {
    account.token = (await AccountService.signIn(SIGN_IN)).token;

    const id = Object.keys(items)[0];
    const quantity = 3;
    await server.request
      .put("/cart")
      .send({
        accountId: SIGN_IN.email,
        id,
        quantity
      })
      .set("Authorization", "Bearer " + account.token)
      .expect(200);

    const cart = await CartService.get({ accountId: SIGN_IN.email });
    expect(cart.items[id].quantity).toBe(quantity);
  });

  test("post /cart/remove", async () => {
    account.token = (await AccountService.signIn(SIGN_IN)).token;

    const id = Object.keys(items)[0];
    await server.request
      .post("/cart/remove")
      .send({ accountId: SIGN_IN.email, id })
      .set("Authorization", "Bearer " + account.token)
      .expect(200);

    const cart = await CartService.get({ accountId: SIGN_IN.email });
    expect(Object.keys(cart.items).length).toBe(2);
  });

  describe("post /cart/transaction", () => {
    test("from cart", async () => {
      account.token = (await AccountService.signIn(SIGN_IN)).token;

      await server.request
        .post("/cart/transaction")
        .send({ accountId: SIGN_IN.email, shipping: SHIPPING })
        .set("Authorization", "Bearer " + account.token)
        .expect(200);

      const cart = await CartService.get({ accountId: SIGN_IN.email });
      expect(Object.keys(cart.items).length).toBe(0);

      const results = await TransactionModel.find({
        buyer_account_id: SIGN_IN.email
      });
      expect(results.length).toBe(1);
    });

    test("not from cart", async () => {
      account.token = (await AccountService.signIn(SIGN_IN)).token;

      const id = Object.keys(items)[0];
      const quantity = 3;
      await server.request
        .post("/cart/transaction")
        .send({ accountId: SIGN_IN.email, shipping: SHIPPING, id, quantity })
        .set("Authorization", "Bearer " + account.token)
        .expect(200);

      const cart = await CartService.get({ accountId: SIGN_IN.email });
      expect(Object.keys(cart.items).length).toBe(0);

      const results = await TransactionModel.find({
        buyer_account_id: SIGN_IN.email
      });
      expect(results.length).toBe(2);
    });
  });
});
