const mongoose = require("mongoose");

const CartModel = require("../models/cart");
const ItemModel = require("../models/item");

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

  if (cart.items.size + quantity > process.env.CART_MAX_ITEMS)
    throw new Error(
      `Cart can't take more items then ${process.env.CART_MAX_ITEMS}`
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
