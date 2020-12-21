const mongoose = require("mongoose");
const nodemailer = require("nodemailer");
const isEmail = require("validator/lib/isEmail");
const isStrongPassword = require("validator/lib/isStrongPassword");
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
    console.log(err);
    throw new Error("Unable to create account.");
  }
};

exports.remove = async ({ email, password }) => {
  try {
    validLoginData({ email, password });

    const account = await AccountModel.findOne({ email });
    if (account == null) throw new Error("Account does not exist.");

    await Password.verify(password, account.salt, account.hash);

    if ((await AccountModel.deleteOne({ email })).deletedCount == null)
      throw new Error("No account is deleted.");
  } catch (err) {
    console.error(err);
    throw new Error("Unable to remove account.");
  }
};

exports.get = async ({ email }) => {
  try {
    const account = await AccountModel.findOne({ email });
    if (account == null) throw new Error("Account does not exist.");
    console.log({ account });
    return {
      email: account.email,
      itemsWatching: account.items_watching || [],
      itemsSelling: account.items_selling || []
    };
  } catch (err) {
    console.log(err);
    throw new Error("Unable to get data.");
  }
};

exports.changePassword = async ({ email, oldPassword, newPassword }) => {
  try {
    validLoginData({ password: oldPassword });
    validLoginData({ password: newPassword });

    const { salt, hash } = await Password.encrypt(newPassword);

    const { n } = await AccountModel.updateOne({ email }, { salt, hash });
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
      { email },
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

    let account = await AccountModel.findOne({ email });
    if (account == null) throw new Error("Account does not exist.");

    if (password === account.recover_password) {
      const { salt, hash } = await Password.encrypt(account.recover_password);

      const { n } = await AccountModel.updateOne(
        { email },
        { salt, hash, recover_password: "" }
      );
      if (n === 0) throw new Error("Account does not exist.");
    } else {
      if (account.recover_password != "") {
        const { n } = await AccountModel.updateOne(
          { email },
          { recover_password: "" }
        );
        if (n === 0) throw new Error("Account does not exist.");
      }

      await Password.verify(password, account.salt, account.hash);
    }

    return {
      email,
      token: Token.generate({ email }, process.env.TOKEN_EXPIRES_IN)
    };
  } catch (err) {
    console.error(err);
    throw new Error("Unable to sign in.");
  }
};
  } catch (err) {
    throw new Error("Unable to sign in.");
  }
};

function validLoginData(dataToValid) {
  const { email, password } = dataToValid;

  if ("email" in dataToValid)
    if (email == null || !isEmail(email)) throw new Error("Wrong email.");

  const passwordOptions = {
    minLength: 6,
    minLowercase: 0,
    minUppercase: 0,
    minNumbers: 0,
    minSymbols: 0
  };
  if ("password" in dataToValid) {
    if (password == null || !isStrongPassword(password, passwordOptions))
      throw new Error(
        "Wrong password. Password must have at least " +
          passwordOptions.minLength +
          " characters."
      );
  }
}
