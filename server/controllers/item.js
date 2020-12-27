const ItemService = require("../services/item");
const AccountService = require("../services/account");

exports.list = async (req, res) => {
  await ItemService.list(req.body);
  res.json({});
};

exports.setWatch = async (req, res) => {
  await ItemService.setWatch(req.body);
  res.json({});
};

exports.getSearch = async (req, res) => {
  const { items, totalItems, currentPage, totalPages } = await ItemService.get(
    req.body
  );
  res.json({ items, totalItems, currentPage, totalPages });
};

exports.getSelling = async (req, res) => {
  const { itemsSelling } = await AccountService.get(req.body);
  const { items, totalItems, currentPage, totalPages } = await ItemService.get({
    ids: itemsSelling,
    ...req.body
  });
  res.json({ items, totalItems, currentPage, totalPages });
};

exports.getWatching = async (req, res) => {
  const { itemsWatching } = await AccountService.get(req.body);
  const { items, totalItems, currentPage, totalPages } = await ItemService.get({
    ids: itemsWatching,
    ...req.body
  });
  res.json({ items, totalItems, currentPage, totalPages });
};
