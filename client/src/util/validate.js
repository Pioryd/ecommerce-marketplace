import validator from "validator";

function signInData(dataToValid) {
  const { email, password } = dataToValid;

  if ("email" in dataToValid)
    if (email == null || !validator.isEmail(email))
      throw new Error("Wrong email.");

  const passwordOptions = {
    minLength: 6,
    minLowercase: 0,
    minUppercase: 0,
    minNumbers: 0,
    minSymbols: 0
  };
  if ("password" in dataToValid) {
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

function transaction({
  name,
  street1,
  street2,
  city,
  state,
  postalCode,
  phone,
  payWith
}) {
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
  if (!["cashOnDelivery", "PayPal"].includes(payWith)) {
    throw new Error("You must select pay method.");
  }
}

export { signInData, transaction };
