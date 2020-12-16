const ItemModel = require("../models/item");

exports.create = async (data) => {
  await ItemModel.create({ data });
};

exports.update = async (data) => {};

exports.remove = async (data) => {};
