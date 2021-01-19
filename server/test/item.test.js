const server = require("./helper/server");

const AccountModel = require("../models/account");
const ItemModel = require("../models/item");

const AccountService = require("../services/account");
const ItemService = require("../services/item");
const CartService = require("../services/cart");

const SIGN_IN_1 = { email: "some_1@email.com", password: "123123" };
const SIGN_IN_2 = { email: "some_2@email.com", password: "123123" };
const account = { token: "" };
const items = {};

// The tests order  matters
describe("Cart", () => {
  beforeAll(async () => {
    console.error = () => {};

    await server.initialize();

    await AccountService.create(SIGN_IN_1);
    await AccountService.create(SIGN_IN_2);
  });
  afterAll(async () => {
    await server.terminate();
  });

  test("POST /items", async () => {
    account.token = (await AccountService.signIn(SIGN_IN_1)).token;

    for (let i = 0; i < 99; i++)
      await server.request
        .post("/items")
        .send({
          title: "some title " + i,
          price: 5 + i + 1,
          stock: 5 + (i + 1) * 10,
          description: "some description " + i
        })
        .set("Authorization", "Bearer " + account.token)
        .expect(200);

    let results = await ItemModel.find({}, { _id: 0 });
    expect(results.length).toBe(99);
    for (const result of results) items[result.id] = result;
  });

  test("POST /items/watch", async () => {
    account.token = (await AccountService.signIn(SIGN_IN_1)).token;

    const itemId = Object.keys(items)[0];

    await server.request
      .post("/items/watch")
      .send({ id: itemId, watching: true })
      .set("Authorization", "Bearer " + account.token)
      .expect(200);
    {
      let result = await AccountModel.findOne(
        { id: SIGN_IN_1.email },
        { _id: 0, items_watching: 1 }
      ).lean();
      expect(result.items_watching).toEqual([itemId]);
    }

    await server.request
      .post("/items/watch")
      .send({ id: itemId, watching: false })
      .set("Authorization", "Bearer " + account.token)
      .expect(200);
    {
      let result = await AccountModel.findOne(
        { id: SIGN_IN_1.email },
        { _id: 0, items_watching: 1 }
      ).lean();
      expect(result.items_watching).toEqual([]);
    }
  });

  describe("POST /items/search", () => {
    test("by ids", async () => {
      const itemsCount = 3;
      const ids = Object.keys(items).slice(0, itemsCount);

      await server.request
        .post("/items/search")
        .send({ ids })
        .expect(200)
        .then((response) => {
          expect(Object.keys(response.body.items).length).toBe(itemsCount);
          expect(Object.keys(response.body.items).sort()).toEqual(ids.sort());
        });
    });

    test("by text", async () => {
      const data = { page: 1, sort: "priceAsc", searchText: "some" };
      await server.request
        .post("/items/search")
        .send(data)
        .expect(200)
        .then((response) => {
          const maxItemsPerPage = 10;
          expect(Object.keys(response.body.items).length).toBe(maxItemsPerPage);
          for (const item of Object.values(response.body.items))
            expect(item.title.includes(data.searchText)).toBeTruthy();
        });
    });
  });

  test("POST /items/watching", async () => {
    account.token = (await AccountService.signIn(SIGN_IN_1)).token;

    const itemsCount = 6;

    const ids = Object.keys(items).slice(0, itemsCount);
    for (const id of ids)
      await ItemService.setWatch({
        accountId: SIGN_IN_1.email,
        id,
        watching: true
      });

    const data = { page: 1, sort: "priceAsc", searchText: "some" };
    await server.request
      .post("/items/watching")
      .send(data)
      .set("Authorization", "Bearer " + account.token)
      .expect(200)
      .then((response) => {
        expect(Object.keys(response.body.items).length).toBe(itemsCount);
      });

    let result = await AccountModel.findOne(
      { id: SIGN_IN_1.email },
      { _id: 0, items_watching: 1 }
    ).lean();
    expect(result.items_watching.sort()).toEqual(ids.sort());
  });

  test("POST /items/selling", async () => {
    account.token = (await AccountService.signIn(SIGN_IN_2)).token;

    const itemsCount = 7;

    // Force change account id of some items
    const ids = Object.keys(items).slice(0, itemsCount);
    await ItemModel.updateMany(
      { id: { $in: ids } },
      { account_id: SIGN_IN_2.email }
    );

    const data = { page: 1, sort: "priceAsc", searchText: "some" };
    await server.request
      .post("/items/selling")
      .send(data)
      .set("Authorization", "Bearer " + account.token)
      .expect(200)
      .then((response) => {
        expect(Object.keys(response.body.items).length).toBe(itemsCount);
        for (const item of Object.values(response.body.items))
          expect(ids.includes(item.id)).toBeTruthy();
      });
  });

  test("POST /items/sold", async () => {
    account.token = (await AccountService.signIn(SIGN_IN_2)).token;

    const itemsCount = 4;

    const shipping = {
      name: "some-name",
      street1: "some-street",
      street2: "some-street",
      city: "some-city",
      state: "123456",
      postalCode: "12-234",
      phone: "555222444",
      payWith: "cashOnDelivery"
    };

    const results = await ItemModel.find({
      account_id: SIGN_IN_2.email
    }).limit(itemsCount);
    expect(results.length).toBe(itemsCount);

    const ids = [];
    for (const result of results) {
      ids.push(result.id);

      await CartService.transaction({
        accountId: SIGN_IN_2.email,
        shipping,
        id: result.id,
        quantity: 2
      });

      await ItemService.close({ accountId: SIGN_IN_2.email, id: result.id });
    }

    const data = { page: 1, sort: "priceAsc", searchText: "" };
    await server.request
      .post("/items/sold")
      .send(data)
      .set("Authorization", "Bearer " + account.token)
      .expect(200)
      .then((response) => {
        expect(Object.keys(response.body.items).length).toBe(itemsCount);
        for (const item of Object.values(response.body.items))
          expect(ids.includes(item.id)).toBeTruthy();
      });
  });

  test("POST /items/unsold", async () => {
    account.token = (await AccountService.signIn(SIGN_IN_2)).token;

    const itemsCount = 4;

    const data = { page: 1, sort: "priceAsc", searchText: "" };
    await server.request
      .post("/items/unsold")
      .send(data)
      .set("Authorization", "Bearer " + account.token)
      .expect(200)
      .then((response) => {
        expect(Object.keys(response.body.items).length).toBe(itemsCount);
      });
  });

  test("POST /items/bought", async () => {
    account.token = (await AccountService.signIn(SIGN_IN_2)).token;

    const itemsCount = 4;

    const data = { page: 1, sort: "priceAsc", searchText: "" };
    await server.request
      .post("/items/bought")
      .send(data)
      .set("Authorization", "Bearer " + account.token)
      .expect(200)
      .then((response) => {
        expect(Object.keys(response.body.items).length).toBe(itemsCount);
      });
  });

  test("DELETE /items", async () => {
    const itemId = Object.keys(items)[0];

    expect(await ItemModel.countDocuments({ id: itemId }).exec()).toBe(1);

    await server.request
      .delete("/items")
      .send({ id: itemId })
      .set("Authorization", "Bearer " + account.token)
      .expect(200);
    // Too be sure date wont be the same
    await new Promise((r) => setTimeout(r, 10));

    expect(
      await ItemModel.countDocuments({
        id: itemId,
        expiration_date: { $gte: new Date() }
      }).exec()
    ).toBe(0);
  });
});
