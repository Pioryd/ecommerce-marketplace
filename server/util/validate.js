const validator = require("validator");

function signIn(data) {
  const { email, password } = data;

  if ("email" in data)
    if (email == null || !validator.isEmail(email))
      throw new Error("Wrong email.");

  const passwordOptions = {
    minLength: 6,
    minLowercase: 0,
    minUppercase: 0,
    minNumbers: 0,
    minSymbols: 0
  };
  if ("password" in data) {
    if (
      password == null ||
      !validator.isStrongPassword(password, passwordOptions)
    )
      throw new Error(
        "Wrong password. Password must have at least " +
          passwordOptions.minLength +
          " characters."
      );
  }
}

function shipping(shipping) {
  const {
    name,
    street1,
    street2,
    city,
    state,
    postalCode,
    phone,
    payWith
  } = shipping;

  if (name.length === 0) {
    throw new Error("Name is empty.");
  }
  if (street1.length === 0 && street2.length === 0) {
    throw new Error("Street is empty.");
  }
  if (city.length === 0) {
    throw new Error("City is empty.");
  }
  if (state.length === 0) {
    throw new Error("State is empty.");
  }
  if (!validator.isPostalCode(postalCode, "any")) {
    throw new Error("Postal code is wrong.");
  }
  if (!validator.isMobilePhone(phone, "any")) {
    throw new Error("Phone number is wrong.");
  }
  if (!["cashOnDelivery"].includes(payWith)) {
    throw new Error("You must select pay method.");
  }
}

function item({ title, price, stock, description }) {
  if (title.length < 3) throw new Error("Title is too short.");
  if (title.length > 70) throw new Error("Title is too long.");
  if (price < 1) throw new Error("Price is too low. Minimal is 1.");
  if (stock < 1) throw new Error("Stock is too low. Minimal is 1.");
  if (description.length < 3) throw new Error("Description is too short.");
}

module.exports = { signIn, shipping, item };
