const mongoose = require("mongoose");

const ItemModel = require("../models/item");
const AccountModel = require("../models/account");

exports.list = async ({ email, title, price, description }) => {
  try {
    validItemData({ title, price, description });

    const account = await AccountModel.findOne({ id: email });
    if (account == null) throw new Error("Account does not exist.");

    const expirationDate = new Date();
    expirationDate.setDate(
      expirationDate.getDate() + process.env.DAYS_TO_EXPIRE
    );

    const item = await ItemModel.create({
      id: mongoose.Types.ObjectId().toString(),
      title,
      price,
      description,
      expiration_date: expirationDate
    });

    account.items_selling.push(item.id);

    const { n } = await AccountModel.updateOne(
      { id: email },
      { items_selling: account.items_selling }
    );
    if (n === 0) throw new Error("Account does not exist.");
  } catch (err) {
    console.log(err);
    throw new Error("Unable to list item.");
  }
};

exports.close = async ({ email, id }) => {
  try {
    const { n } = await ItemModel.updateOne(
      { id, account_id: email },
      { expiration_date: new Date() }
    );
    if (n === 0) throw new Error("Item does not exist.");
  } catch (err) {
    console.log(err);
    throw new Error("Unable to close item.");
  }
};

exports.setWatch = async ({ email, id, watching }) => {
  try {
    const account = await AccountModel.findOne({ id: email });
    if (account == null) throw new Error("Account does not exist.");
    let { items_watching } = account;

    const item = await ItemModel.findOne({ id });
    if (item == null) throw new Error("Item does not exist.");

    if (watching === false) {
      items_watching = items_watching.filter((value) => value != id);
    } else {
      if (!items_watching.includes(id)) items_watching.push(id);
    }

    const { n } = await AccountModel.updateOne(
      { id: email },
      { items_watching }
    );
    if (n === 0) throw new Error("Account does not exist.");
  } catch (err) {
    console.log(err);
    throw new Error("Unable to set watch on item.");
  }
};

exports.getSearch = async ({ page, sort, searchText }) => {
  try {
    const findConditions = {
      expiration_date: { $gt: new Date() },
      stock: { $gt: 0 }
    };

    return await get({ findConditions, page, sort, searchText });
  } catch (err) {
    console.log(err);
    throw new Error("Unable to set watch on item.");
  }
};

exports.getWatching = async ({ email, page, sort, searchText }) => {
  try {
    const account = await AccountModel.findOne({ id: email });
    if (account == null) throw new Error("Account does not exist.");

    const findConditions = {
      id: { $in: account.items_watching }
    };

    return await get({ findConditions, page, sort, searchText });
  } catch (err) {
    console.log(err);
    throw new Error("Unable to set watch on item.");
  }
};

exports.getSelling = async ({ email, page, sort, searchText }) => {
  try {
    const findConditions = {
      expiration_date: { $gt: new Date() },
      stock: { $gt: 0 },
      account_id: email
    };

    return await get({ findConditions, page, sort, searchText });
  } catch (err) {
    console.log(err);
    throw new Error("Unable to set watch on item.");
  }
};

exports.getSold = async ({ email, page, sort, searchText }) => {
  try {
    const findConditions = {
      $or: [{ expiration_date: { $lte: new Date() } }, { stock: { $lte: 0 } }],
      account_id: email
    };

    return await get({ findConditions, page, sort, searchText });
  } catch (err) {
    console.log(err);
    throw new Error("Unable to set watch on item.");
  }
};

exports.getUnsold = async ({ email, page, sort, searchText }) => {
  try {
    const findConditions = {
      $or: [{ expiration_date: { $lte: new Date() } }, { stock: { $lte: 0 } }],
      account_id: email
    };

    return await get({ findConditions, page, sort, searchText });
  } catch (err) {
    console.log(err);
    throw new Error("Unable to set watch on item.");
  }
};

async function get({ findConditions, page, sort, searchText }) {
  page = Number(page) || 1;

  if (searchText != null && searchText != "")
    findConditions["$search"] = { $search: searchText };

  const totalItems = await ItemModel.countDocuments(findConditions).exec();

  const totalPages = Math.max(
    1,
    Math.ceil(totalItems / process.env.ITEMS_PER_PAGE)
  );

  const currentPage = Math.max(1, Math.min(totalPages, Number(page)));

  const sortTypes = {
    priceAsc: { price: 1 },
    priceDesc: { price: -1 },
    dateAsc: { expiration_date: 1 },
    dateDesc: { expiration_date: -1 }
  };
  if (sortTypes[sort] == null) sort = "dateAsc";

  const results = await ItemModel.find(findConditions)
    .sort(sortTypes[sort])
    .limit(Number(process.env.ITEMS_PER_PAGE))
    .skip(Number(process.env.ITEMS_PER_PAGE * (currentPage - 1)))
    .exec();

  const items = {};
  for (const result of results) {
    items[result.id] = {
      id: result.id,
      title: result.title,
      price: result.price,
      description: result.description,
      expirationDate: result.expiration_date
    };
  }

  return {
    items,
    totalItems,
    totalPages,
    currentPage,
    sort
  };
}

function validItemData({ title, price, description }) {
  if (title.length < 3) throw new Error("Title is too short.");
  if (price <= 0) throw new Error("Price is too low.");
  if (description.length < 3) throw new Error("Description is too short.");
}
