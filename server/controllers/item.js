const ItemService = require("../services/item");

exports.create = async (req, res) => {
  const data = await ItemService.create(req.body);
  res.json({ text: "created" });
};

exports.update = async (req, res) => {
  const data = await ItemService.update(req.body);
  res.json({ text: "updated" });
};

exports.remove = async (req, res) => {
  const data = await ItemService.remove(req.body);
  res.json({ text: "removed" });
};
