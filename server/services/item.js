const mongoose = require("mongoose");

const ItemModel = require("../models/item");
const AccountModel = require("../models/account");

exports.list = async ({ email, title, price, description }) => {
  try {
    validItemData({ title, price, description });

    const account = await AccountModel.findOne({ email });
    if (account == null) throw new Error("Account does not exist.");

    const days = 30;
    const expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + days);

    const item = await ItemModel.create({
      id: mongoose.Types.ObjectId().toString(),
      title,
      price,
      description,
      expiration_date: expirationDate
    });

    account.items_selling.push(item.id);

    const { n } = await AccountModel.updateOne(
      { email },
      { items_selling: account.items_selling }
    );
    if (n === 0) throw new Error("Account does not exist.");
  } catch (err) {
    console.log(err);
    throw new Error("Unable to list item.");
  }
};

exports.setWatch = async ({ email, id, watching }) => {
  try {
    const account = await AccountModel.findOne({ email });
    if (account == null) throw new Error("Account does not exist.");
    let { items_watching } = account;

    const item = await ItemModel.findOne({ id });
    if (item == null) throw new Error("Item does not exist.");

    if (watching === false) {
      items_watching = items_watching.filter((value) => value != id);
    } else {
      if (!items_watching.includes(id)) items_watching.push(id);
    }

    const { n } = await AccountModel.updateOne({ email }, { items_watching });
    if (n === 0) throw new Error("Account does not exist.");
  } catch (err) {
    console.log(err);
    throw new Error("Unable to set watch on item.");
  }
};

exports.get = async ({ ids, page = 1 }) => {
  try {
    let totalItems = 0;

    if (ids == null) {
      totalItems = await ItemModel.countDocuments().exec();
    } else {
      totalItems = ids.length;
    }

    const totalPages = Math.ceil(totalItems / process.env.ITEMS_PER_PAGE);

    const currentPage = Math.max(1, Math.min(totalPages, Number(page)));

    // const results = await ItemModel.find({ id: { $in: ids } }, { _id: 0 });
    const results = await ItemModel.find()
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
      currentPage
    };
  } catch (err) {
    console.log(err);
    throw new Error("Unable to get items list.");
  }
};

function validItemData({ title, price, description }) {
  if (title.length < 3) throw new Error("Title is too short.");
  if (price <= 0) throw new Error("Price is too low.");
  if (description.length < 3) throw new Error("Description is too short.");
}
