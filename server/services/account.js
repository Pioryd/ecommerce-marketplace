const Token = require("../util/token");
const Password = require("../util/password");

const AccountModel = require("../models/account");

exports.create = async ({ name, password }) => {
  const result = await AccountModel.find({ name });
  if (result.length > 0) throw new Error("Account already created.");
  console.log({ name, password });

  const { salt, hash } = await Password.encrypt(password);

  console.log({ name, salt, hash });
  await AccountModel.create({ name, salt, hash });
};

exports.update = async (data) => {};

exports.remove = async (data) => {};

exports.signIn = async ({ name, password }) => {
  const result = await AccountModel.find({ name });
  const account = result[0];
  if (account == null) throw new Error("Account does not exist.");

  await Password.verify(password, account.salt, account.hash);

  return { token: Token.generate({ name }, { expiresIn: "1800s" }) };
};

exports.signOut = async (data) => {};
