const ItemService = require("../services/item");
const AccountService = require("../services/account");

exports.list = async (req, res) => {
  await ItemService.list(req.body);
  res.json({});
};

exports.getSelected = async (req, res) => {
  const { selected } = req.body;
  const { items } = await ItemService.get({ ids: selected });
  res.json({ items });
};

exports.getSelling = async (req, res) => {
  const { itemsSelling } = await AccountService.get(req.body);
  const { items } = await ItemService.get({ ids: itemsSelling });
  res.json({ items });
};

exports.getWatching = async (req, res) => {
  const { itemsWatching } = await AccountService.get(req.body);
  const { items } = await ItemService.get({ ids: itemsWatching });
  res.json({ items });
};
