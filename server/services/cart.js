const mongoose = require("mongoose");

const validate = require("../util/validate");

const CartModel = require("../models/cart");
const ItemModel = require("../models/item");
const TransactionModel = require("../models/transaction");

exports.add = async ({ accountId, id, quantity }) => {
  try {
    const cart = await CartModel.findOne(
      { account_id: accountId },
      { _id: 0, items: 1 }
    );
    if (cart == null) throw new Error("Cart does not exist.");

    if (cart.items.has(id)) quantity += cart.items.get(id);

    await update({ accountId, id, quantity });
  } catch (err) {
    console.log(err);
    throw new Error("Unable to update cart.");
  }
};

exports.update = async ({ accountId, id, quantity }) => {
  try {
    await update({ accountId, id, quantity });
  } catch (err) {
    console.log(err);
    throw new Error("Unable to update cart.");
  }
};

exports.remove = async ({ accountId, id }) => {
  try {
    const cart = await CartModel.findOne(
      { account_id: accountId },
      { _id: 0, items: 1 }
    );
    if (cart.items == null) throw new Error("Cart does not exist.");

    cart.items.delete(id);

    {
      const { n } = await CartModel.updateOne(
        { account_id: accountId },
        { items: cart.items }
      );
      if (n === 0) throw new Error("Cart does not exist.");
    }
  } catch (err) {
    console.log(err);
    throw new Error("Unable to remove cart's item.");
  }
};

exports.get = async ({ accountId }) => {
  try {
    const cart = await CartModel.findOne(
      { account_id: accountId },
      { _id: 0, items: 1 }
    );
    if (cart == null) throw new Error("Cart does not exist.");

    const results = await ItemModel.find(
      {
        id: { $in: Array.from(cart.items, ([id, quantity]) => id) },
        $or: [{ expiration_date: { $lte: new Date() } }, { stock: { $lte: 0 } }]
      },
      { id: 1, _id: 0 }
    );

    if (results.length > 0) {
      for (const result of results) cart.items.delete(result.id);

      const { n } = await CartModel.updateOne(
        { account_id: accountId },
        { items: cart.items }
      );
      if (n === 0) throw new Error("Cart does not exist.");
    }

    const items = {};
    for (const [id, quantity] of cart.items.entries()) {
      const result = await ItemModel.findOne({ id }, { _id: 0 });
      if (result == null) throw new Error("Item does not exist.");

      items[id] = {
        id: result.id,
        title: result.title,
        price: result.price,
        stock: result.stock,
        quantity
      };
    }
    return { items };
  } catch (err) {
    console.log(err);
    throw new Error("Unable to get cart items.");
  }
};

async function update({ accountId, id, quantity }) {
  const cart = await CartModel.findOne(
    { account_id: accountId },
    { _id: 0, items: 1 }
  );
  if (cart == null) throw new Error("Cart does not exist.");

  const item = await ItemModel.findOne({ id }, { _id: 0, stock: 1 });
  if (item == null) throw new Error("Item does not exist.");

  if (quantity <= 0) throw new Error(`Quantity must be greater then 0.`);
  if (item.stock < quantity) {
    throw new Error(
      `Quantity[${quantity}] is bigger then item[${id}] stock[${item.stock}]`
    );
  }

  if (cart.items.size > process.env.CART_MAX_ITEMS)
    throw new Error("Cart is full.");

  if (cart.items.size > process.env.CART_MAX_UNIQUE_ITEMS)
    throw new Error(
      `Cart can't take more unique items then ${process.env.CART_MAX_ITEMS}`
    );

  cart.items.set(id, quantity);

  {
    const { n } = await CartModel.updateOne(
      { account_id: accountId },
      { items: cart.items }
    );
    if (n === 0) throw new Error("Cart does not exist.");
  }
}
exports.transaction = async ({ accountId, shipping, id, quantity }) => {
  try {
    validate.shipping(shipping);

    if (id != null && quantity != null) {
      await transactionNotFromCart({ accountId, shipping, id, quantity });
    } else {
      await transactionFromCart({ accountId, shipping });
    }
  } catch (err) {
    console.log(err);
    throw new Error("Unable to make transaction.");
  }
};

async function transactionNotFromCart({ accountId, shipping, id, quantity }) {
  const item = await ItemModel.findOne({ id }, { _id: 0, stock: 1 });
  if (item == null) throw new Error("Item does not exist.");

  if (quantity > item.stock)
    throw new Error("Item does not have enough stock.");

  await updateItem(id, item.stock, quantity);

  const items = new Map();
  items.set(id, quantity);

  await TransactionModel.create({
    id: mongoose.Types.ObjectId().toString(),
    date: new Date(),
    buyer_account_id: accountId,
    items,
    shipping: {
      name: shipping.name,
      street_1: shipping.street1,
      street_2: shipping.street2,
      city: shipping.city,
      state: shipping.state,
      postal_code: shipping.postalCode,
      phone: shipping.phone,
      pay_with: shipping.payWith
    }
  });
}

async function transactionFromCart({ accountId, shipping }) {
  const cart = await CartModel.findOne(
    { account_id: accountId },
    { _id: 0, items: 1 }
  );
  if (cart.items == null) throw new Error("Cart does not exist.");

  if (cart.items.size === 0) throw new Error("Cart does not have items.");

  const results = await ItemModel.find({
    id: { $in: Array.from(cart.items, ([id, quantity]) => id) }
  });

  if (cart.items.size !== results.length)
    throw new Error("Not found all items from cart.");

  for (const result of results) {
    if (cart.items.get(result.id) > result.stock)
      throw new Error("Item does not have enough stock.");
  }

  for (const result of results)
    await updateItem(result.id, result.stock, cart.items.get(result.id));

  await TransactionModel.create({
    id: mongoose.Types.ObjectId().toString(),
    date: new Date(),
    buyer_account_id: accountId,
    items: cart.items,
    shipping: {
      name: shipping.name,
      street_1: shipping.street1,
      street_2: shipping.street2,
      city: shipping.city,
      state: shipping.state,
      postal_code: shipping.postalCode,
      phone: shipping.phone,
      pay_with: shipping.payWith
    }
  });

  const { n } = await CartModel.updateOne(
    { account_id: accountId },
    { items: {} }
  );
  if (n === 0) throw new Error("Cart does not exist.");
}

async function updateItem(id, stock, quantity) {
  stock = stock - quantity;
  const updateQuery = { stock };
  if (stock === 0) updateQuery.expiration_date = new Date();

  const { n } = await ItemModel.updateOne({ id }, updateQuery);
  if (n === 0) throw new Error(`Item[${id}] does not exist.`);
}
