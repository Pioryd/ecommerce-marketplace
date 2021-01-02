const CartService = require("../services/cart");

exports.add = async (req, res) => {
  await CartService.add(req.body);
  res.json({});
};

exports.update = async (req, res) => {
  await CartService.update(req.body);
  res.json({});
};

exports.get = async (req, res) => {
  const { items } = await CartService.get(req.body);
  res.json({ items });
};

exports.remove = async (req, res) => {
  await CartService.remove(req.body);
  res.json({});
};
