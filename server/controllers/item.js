const ItemService = require("../services/item");

exports.create = async (req, res) => {
  ItemService.create(req.body).then((data) => res.json({ text: "created" }));
};

exports.update = async (req, res) => {
  ItemService.update(req.body).then((data) => res.json({ text: "updated" }));
};

exports.remove = async (req, res) => {
  ItemService.remove(req.body).then((data) => res.json({ text: "removed" }));
};
