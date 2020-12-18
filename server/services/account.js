const isEmail = require("validator/lib/isEmail");
const isStrongPassword = require("validator/lib/isEmail");
const Token = require("../util/token");
const Password = require("../util/password");

const AccountModel = require("../models/account");

exports.create = async ({ email, password }) => {
  try {
    validLoginData({ email, password });

    if ((await AccountModel.findOne({ email })) != null)
      throw new Error("Account already created.");

    const { salt, hash } = await Password.encrypt(password);

    await AccountModel.create({ email, salt, hash });
  } catch (err) {
    throw new Error("Unable to create account.");
  }
};

exports.remove = async (data) => {
  try {
    validLoginData({ email, password });

    const account = await AccountModel.findOne({ email });
    if (account == null) throw new Error("Account does not exist.");

    await Password.verify(password, account.salt, account.hash);

    if ((await AccountModel.deleteOne({ email })).deletedCount == null)
      throw new Error("No account is deleted.");
  } catch (err) {
    throw new Error("Unable to remove account.");
  }
};

exports.signIn = async ({ email, password }) => {
  try {
    validLoginData({ email, password });

    const account = await AccountModel.findOne({ email });
    if (account == null) throw new Error("Account does not exist.");

    await Password.verify(password, account.salt, account.hash);

    return { token: Token.generate({ email }, "1800s") };
  } catch (err) {
    throw new Error("Unable to sign in.");
  }
};

function validLoginData({ email, password }) {
  if (email == null || !isEmail(email)) {
    throw new Error("Wrong email.");
  }
  if (password == null || isStrongPassword(password, { minLength: 8 })) {
    throw new Error("Wrong password.");
  }
}
