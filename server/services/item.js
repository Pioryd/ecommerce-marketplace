const mongoose = require("mongoose");

const Validate = require("../util/validate");

const AccountModel = require("../models/account");
const ItemModel = require("../models/item");
const TransactionModel = require("../models/transaction");

exports.list = async ({ accountId, title, price, stock, description }) => {
  try {
    Validate.item({ title, price, stock, description });

    const account = await AccountModel.findOne({ id: accountId });
    if (account == null) throw new Error("Account does not exist.");

    const expirationDate = new Date();
    expirationDate.setDate(
      expirationDate.getDate() + process.env.DAYS_TO_EXPIRE
    );

    await ItemModel.create({
      id: mongoose.Types.ObjectId().toString(),
      account_id: accountId,
      title,
      price,
      stock,
      description,
      expiration_date: expirationDate
    });
  } catch (err) {
    console.log(err);
    throw new Error("Unable to list item.");
  }
};

exports.close = async ({ accountId, id }) => {
  try {
    const { n } = await ItemModel.updateOne(
      { id, account_id: accountId },
      { expiration_date: new Date() }
    );
    if (n === 0) throw new Error("Item does not exist.");
  } catch (err) {
    console.log(err);
    throw new Error("Unable to close item.");
  }
};

exports.setWatch = async ({ accountId, id, watching }) => {
  try {
    let { items_watching } = await AccountModel.findOne(
      { id: accountId },
      { _id: 0, items_watching: 1 }
    );
    if (items_watching == null) throw new Error("Account does not exist.");

    const item = await ItemModel.findOne({ id }, { _id: 1 });
    if (item == null) throw new Error("Item does not exist.");

    if (watching === false) {
      items_watching = items_watching.filter((value) => value != id);
    } else {
      if (!items_watching.includes(id)) items_watching.push(id);
    }

    const { n } = await AccountModel.updateOne(
      { id: accountId },
      { items_watching }
    );
    if (n === 0) throw new Error("Account does not exist.");
  } catch (err) {
    console.log(err);
    throw new Error("Unable to set watch on item.");
  }
};

exports.getSearch = async ({ ids, page, sort, searchText }) => {
  try {
    const query = {
      expiration_date: { $gt: new Date() },
      stock: { $gt: 0 }
    };
    if (ids != null) query.id = { $in: ids };

    return await get({ query, page, sort, searchText });
  } catch (err) {
    console.log(err);
    throw new Error("Unable to set watch on item.");
  }
};

exports.getWatching = async ({ accountId, page, sort, searchText }) => {
  try {
    const account = await AccountModel.findOne({ id: accountId });
    if (account == null) throw new Error("Account does not exist.");

    const query = { id: { $in: account.items_watching } };
    return await get({ query, page, sort, searchText });
  } catch (err) {
    console.log(err);
    throw new Error("Unable to set watch on item.");
  }
};

exports.getSelling = async ({ accountId, page, sort, searchText }) => {
  try {
    const query = {
      expiration_date: { $gt: new Date() },
      stock: { $gt: 0 },
      account_id: accountId
    };

    return await get({ query, page, sort, searchText });
  } catch (err) {
    console.log(err);
    throw new Error("Unable to set watch on item.");
  }
};

exports.getSold = async ({ accountId, page, sort, searchText }) => {
  try {
    const accountItemsIdsList = [];
    {
      const results = await ItemModel.find(
        { account_id: accountId },
        { _id: -1, id: 1 }
      );
      for (const result of results) accountItemsIdsList.push(result.id);
    }

    const soldItemsQuantities = {};
    {
      const query = { $or: [] };
      const projection = { _id: 0 };

      if (accountItemsIdsList.length > 0) {
        query["$or"].length = accountItemsIdsList.length;

        for (let i = 0; i < query["$or"].length; i++) {
          query["$or"][i] = {};
          query["$or"][i][`items.${accountItemsIdsList[i]}`] = {
            $exists: true
          };

          projection[`items.${accountItemsIdsList[i]}`] = 1;
        }

        const results = await TransactionModel.find(query, projection);
        for (const result of results)
          for (const [id, quantity] of result.items.entries())
            if (accountItemsIdsList.includes(id))
              soldItemsQuantities[id] = quantity;
      }
    }

    const query = { id: { $in: Object.keys(soldItemsQuantities) } };
    const soldData = await get({ query, page, sort, searchText });

    for (const item of Object.values(soldData.items))
      item.sold = soldItemsQuantities[item.id];

    return soldData;
  } catch (err) {
    console.log(err);
    throw new Error("Unable to set watch on item.");
  }
};

exports.getUnsold = async ({ accountId, page, sort, searchText }) => {
  try {
    const query = {
      expiration_date: { $lte: new Date() },
      account_id: accountId
    };

    return await get({ query, page, sort, searchText });
  } catch (err) {
    console.log(err);
    throw new Error("Unable to set watch on item.");
  }
};

exports.getBought = async ({ accountId, page, sort, searchText }) => {
  try {
    const results = await TransactionModel.find(
      { buyer_account_id: accountId },
      { _id: -1, items: 1 }
    );

    const boughtItemsQuantities = {};
    for (const result of results) {
      for (const [id, quantities] of result.items.entries()) {
        if (boughtItemsQuantities[id] == null) {
          boughtItemsQuantities[id] = quantities;
        } else {
          boughtItemsQuantities[id] += quantities;
        }
      }
    }

    const query = { id: { $in: Object.keys(boughtItemsQuantities) } };
    const boughtData = await get({ query, page, sort, searchText });

    for (const item of Object.values(boughtData.items))
      item.quantity = boughtItemsQuantities[item.id];

    return boughtData;
  } catch (err) {
    console.log(err);
    throw new Error("Unable to set watch on item.");
  }
};

async function get({ query, page, sort, searchText }) {
  page = Number(page) || 1;

  if (searchText != null && searchText != "")
    query["$text"] = { $search: searchText };

  const totalItems = await ItemModel.countDocuments(query).exec();

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
  if (sortTypes[sort] == null) sort = "dateDesc";

  const results = await ItemModel.find(query)
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
      expirationDate: result.expiration_date,
      stock: result.stock
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
