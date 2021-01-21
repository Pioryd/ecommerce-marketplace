const { LoremIpsum, getRandomIntInclusive } = require("./lorem-ipsum");

const loadEnv = require("../../loaders/env");
const loadMongoose = require("../../loaders/mongoose");

const AccountService = require("../../services/account");
const CartService = require("../../services/cart");
const ItemService = require("../../services/item");

const ItemModel = require("../../models/item");

const USER_1 = { email: "user1@example.com", password: "123123" };
const USER_2 = { email: "user2@example.com", password: "123123" };
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

let mongoose = null;

async function createAccounts() {
  await AccountService.create(USER_1);
  await AccountService.create(USER_2);
}

async function createItems({
  itemsCount,
  priceMin,
  priceMax,
  stockMin,
  stockMax,
  expirationInDaysMin
}) {
  const TITLE_MAX_LENGTH = 70;

  const loremIpsum = new LoremIpsum({
    paragraphsMin: 3,
    paragraphsMax: 5,
    sentencesMin: 7,
    sentencesMax: 11,
    wordsMin: 7,
    wordsMax: 11
  });

  for (let i = 1; i < itemsCount + 1; i++) {
    let title = loremIpsum.generateSentence();

    if (title.length > TITLE_MAX_LENGTH) {
      title.length = TITLE_MAX_LENGTH;
      title += ".";
    }

    const expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + expirationInDaysMin + i);

    const user = i % 2 === 0 ? USER_1 : USER_2;

    await ItemModel.create({
      id: mongoose.Types.ObjectId().toString(),
      title,
      price: getRandomIntInclusive(priceMin, priceMax) / 100,
      description: loremIpsum.generateText(),
      expiration_date: expirationDate,
      account_id: user.email,
      stock: getRandomIntInclusive(stockMin, stockMax)
    });
  }
}

async function generateUserActions(user) {
  let boughtItemsCount = 0;

  for (const seller of [USER_1, USER_2]) {
    const results = await ItemModel.find({ account_id: seller.email }).limit(3);
    for (const result of results) {
      await CartService.transaction({
        accountId: user.email,
        shipping: SHIPPING,
        id: result.id,
        quantity: getRandomIntInclusive(1, 8)
      });
      boughtItemsCount++;
    }
  }
  {
    // Set watch items.
    const results = await ItemModel.find({ account_id: user.email })
      .skip(boughtItemsCount)
      .limit(2);
    for (const result of results) {
      await ItemService.setWatch({
        accountId: user.email,
        id: result.id,
        watching: true
      });
    }
  }
  {
    // Close to make unsold. Sort desc to be not same as bought/sold/wachting
    const results = await ItemModel.find({ account_id: user.email })
      .sort({ expiration_date: -1 })
      .limit(5);
    for (const result of results)
      await ItemService.close({ accountId: user.email, id: result.id });
  }
}

async function main() {
  loadEnv();
  mongoose = (await loadMongoose()).mongoose;
  await mongoose.connection.db.dropDatabase();

  await createAccounts();
  await createItems({
    itemsCount: 98,
    priceMin: 1,
    priceMax: 200000,
    stockMin: 10,
    stockMax: 200,
    expirationInDaysMin: 30
  });
  await generateUserActions(USER_1);

  await mongoose.connection.close();

  console.log("Demo has been generated.");
}

main();
