const AccountModel = require("../models/account");

exports.create = async (data) => {
  await AccountModel.find()
    .then((result) => {
      AccountModel.create(data)
        .then(() => {})
        .catch((error) => console.log("found error"));

      for (const doc of result) {
        const { name, password } = doc;
        console.log({ name, password });
      }
    })
    .catch((error) => console.log("found error"));
};

exports.update = async (data) => {};

exports.remove = async (data) => {};

exports.sign_in = async (data) => {};

exports.sign_out = async (data) => {};
