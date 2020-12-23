const mongoose = require("mongoose");

const ItemModel = require("../models/item");
const AccountModel = require("../models/account");

exports.list = async ({ email, title, price, description }) => {
  try {
    validItemData({ title, price, description });

    for (let i = 0; i < 10; i++) {
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
    }
  } catch (err) {
    console.log(err);
    throw new Error("Unable to list item.");
  }
};

exports.get = async ({ ids }) => {
  try {
    const results = await ItemModel.find({ id: { $in: ids } }, { _id: 0 });

    const items = {};
    for (const result of results) {
      items[result.id] = {
        title: result.title,
        price: result.price,
        description: result.description,
        expirationDate: result.expiration_date
      };
    }

    return {
      items
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
