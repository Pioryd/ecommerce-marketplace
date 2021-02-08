const ItemService = require("../services/item");

exports.list = async (req, res) => {
  await ItemService.list(req.body);
  res.json({});
};

exports.close = async (req, res) => {
  await ItemService.close(req.body);
  res.json({});
};

exports.setWatch = async (req, res) => {
  await ItemService.setWatch(req.body);
  res.json({});
};

exports.getSearch = async (req, res) => {
  const {
    items,
    totalItems,
    currentPage,
    totalPages
  } = await ItemService.getSearch(req.body);
  res.json({ items, totalItems, currentPage, totalPages });
};

exports.getWatching = async (req, res) => {
  const {
    items,
    totalItems,
    currentPage,
    totalPages
  } = await ItemService.getWatching(req.body);
  res.json({ items, totalItems, currentPage, totalPages });
};

exports.getSelling = async (req, res) => {
  const {
    items,
    totalItems,
    currentPage,
    totalPages
  } = await ItemService.getSelling(req.body);
  res.json({ items, totalItems, currentPage, totalPages });
};

exports.getSold = async (req, res) => {
  const {
    items,
    totalItems,
    currentPage,
    totalPages
  } = await ItemService.getSold(req.body);
  res.json({ items, totalItems, currentPage, totalPages });
};

exports.getUnsold = async (req, res) => {
  const {
    items,
    totalItems,
    currentPage,
    totalPages
  } = await ItemService.getUnsold(req.body);
  res.json({ items, totalItems, currentPage, totalPages });
};

exports.getBought = async (req, res) => {
  const {
    items,
    totalItems,
    currentPage,
    totalPages
  } = await ItemService.getBought(req.body);
  res.json({ items, totalItems, currentPage, totalPages });
};
