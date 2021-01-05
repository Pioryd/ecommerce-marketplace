const mongoose = require("mongoose");
const nodemailer = require("nodemailer");
const { validLoginData } = require("../util/validate");
const Token = require("../util/token");
const Password = require("../util/password");

const AccountModel = require("../models/account");
const CartModel = require("../models/cart");

exports.create = async ({ email, password }) => {
  try {
    validLoginData({ email, password });

    const id = email;

    if ((await AccountModel.findOne({ id })) != null)
      throw new Error("Account already created.");

    const { salt, hash } = await Password.encrypt(password);

    await AccountModel.create({ id, salt, hash });

    await CartModel.create({
      id: mongoose.Types.ObjectId().toString(),
      account_id: id,
      items: {}
    });
  } catch (err) {
    console.log(err);
    throw new Error("Unable to create account.");
  }
};

exports.remove = async ({ accountId, password }) => {
  try {
    validLoginData({ email: accountId, password });

    const account = await AccountModel.findOne({ id: accountId });
    if (account == null) throw new Error("Account does not exist.");

    await Password.verify(password, account.salt, account.hash);

    if (
      (await CartModel.deleteOne({ account_id: accountId })).deletedCount ==
      null
    )
      throw new Error("No cart is deleted.");

    await ItemModel.updateMany(
      { account_id: accountId },
      { expiration_date: new Date() }
    );

    if ((await AccountModel.deleteOne({ id: accountId })).deletedCount == null)
      throw new Error("No account is deleted.");
  } catch (err) {
    console.error(err);
    throw new Error("Unable to remove account.");
  }
};

exports.get = async ({ accountId }) => {
  try {
    const account = await AccountModel.findOne({ id: accountId });
    if (account == null) throw new Error("Account does not exist.");

    return {
      id: accountId,
      itemsWatching: account.items_watching
    };
  } catch (err) {
    console.log(err);
    throw new Error("Unable to get data.");
  }
};

exports.changePassword = async ({ accountId, oldPassword, newPassword }) => {
  try {
    validLoginData({ password: oldPassword });
    validLoginData({ password: newPassword });

    const { salt, hash } = await Password.encrypt(newPassword);

    const { n } = await AccountModel.updateOne(
      { id: accountId },
      { salt, hash }
    );
    if (n === 0) throw new Error("Account does not exist.");
  } catch (err) {
    console.log(err);
    throw new Error("Unable to change password.");
  }
};

exports.recover = async ({ email }) => {
  try {
    validLoginData({ email });

    const recoverPassword = mongoose.mongo.ObjectId().toHexString();
    const { n } = await AccountModel.updateOne(
      { id },
      { recover_password: recoverPassword }
    );
    if (n === 0) throw new Error("Account does not exist.");

    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_SERVICE_HOST,
      port: process.env.EMAIL_SERVICE_PORT,
      secure: process.env.EMAIL_SERVICE_SECURE,
      auth: {
        user: process.env.EMAIL_USER_NAME,
        pass: process.env.EMAIL_USER_PASSWORD
      }
    });

    await transporter.sendMail({
      from: `"${process.env.APP_NAME}" <${process.env.EMAIL_USER_NAME}>`,
      to: `${email}`,
      subject: `${process.env.APP_NAME} - Recover password`,
      text: `Recover password: ${recoverPassword}`,
      html: `<b>Recover password: ${recoverPassword}</b>`
    });
  } catch (err) {
    console.error(err);
    throw new Error("Unable to recover.");
  }
};

exports.signIn = async ({ email, password }) => {
  try {
    validLoginData({ email, password });

    const id = email;

    let account = await AccountModel.findOne({ id });
    if (account == null) throw new Error("Account does not exist.");

    if (password === account.recover_password) {
      const { salt, hash } = await Password.encrypt(account.recover_password);

      const { n } = await AccountModel.updateOne(
        { id },
        { salt, hash, recover_password: "" }
      );
      if (n === 0) throw new Error("Account does not exist.");
    } else {
      if (account.recover_password != "") {
        const { n } = await AccountModel.updateOne(
          { id },
          { recover_password: "" }
        );
        if (n === 0) throw new Error("Account does not exist.");
      }

      await Password.verify(password, account.salt, account.hash);
    }

    return {
      id,
      token: Token.generate({ id }, process.env.TOKEN_EXPIRES_IN)
    };
  } catch (err) {
    console.error(err);
    throw new Error("Unable to sign in.");
  }
};

exports.refreshToken = async ({ accountId }) => {
  try {
    return {
      token: Token.generate({ id: accountId }, process.env.TOKEN_EXPIRES_IN)
    };
  } catch (err) {
    console.error(err);
    throw new Error("Unable to sign in.");
  }
};
