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

  const fieldMaxLength = 1000;

  if (name.length === 0) {
    throw new Error("Name is empty.");
  }
  if (name.length > fieldMaxLength) {
    throw new Error("Name is long.");
  }

  if (street1.length === 0 && street2.length === 0) {
    throw new Error("Street is empty.");
  }
  if (street1.length > fieldMaxLength && street2.length > fieldMaxLength) {
    throw new Error("Street is long.");
  }

  if (city.length === 0) {
    throw new Error("City is empty.");
  }
  if (city.length > fieldMaxLength) {
    throw new Error("City is long.");
  }

  if (state.length === 0) {
    throw new Error("State is empty.");
  }
  if (state.length > fieldMaxLength) {
    throw new Error("State is long.");
  }

  if (postalCode.length > fieldMaxLength) {
    throw new Error("Postal code is long.");
  }
  if (!validator.isPostalCode(postalCode, "any")) {
    throw new Error("Postal code is wrong.");
  }

  if (phone.length > fieldMaxLength) {
    throw new Error("Phone number code is long.");
  }
  if (!validator.isMobilePhone(phone, "any")) {
    throw new Error("Phone number is wrong.");
  }

  if (
    !["cashOnDelivery"].includes(payWith) ||
    payWith.length > fieldMaxLength
  ) {
    throw new Error("You must select pay method.");
  }
}

function item({ title, price, stock, description }) {
  if (title.length < 3) {
    throw new Error("Title is too short.");
  }
  if (title.length > 70) {
    throw new Error("Title is too long.");
  }
  if (price < 1) {
    throw new Error("Price is too low. Minimal is 1.");
  }
  if (price > 1000000000) {
    throw new Error("Stock is too hight. Maximum is 1000000000.");
  }
  if (stock < 1) {
    throw new Error("Stock is too low. Minimal is 1.");
  }
  if (stock > 999) {
    throw new Error("Stock is too hight. Maximum is 999.");
  }
  if (description.length < 3) {
    throw new Error("Description is too short. Minimum characters is 64000.");
  }
  if (description.length > 64000) {
    throw new Error("Description is too long. Maximus characters is 64000.");
  }
}
module.exports = { signIn, shipping, item };
