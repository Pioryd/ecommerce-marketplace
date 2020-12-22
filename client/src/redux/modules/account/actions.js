import isEmail from "validator/lib/isEmail";
import isStrongPassword from "validator/lib/isStrongPassword";

export const signIn = ({ email, password }) => async (dispatch, getState) => {
  try {
    validLoginData({ email, password });

    const respons = await fetch(
      process.env.REACT_APP_API_URL + "/accounts/sign-in",
      {
        method: "POST",
        body: JSON.stringify({ email, password }),
        headers: { "Content-type": "application/json" }
      }
    );
    if (!respons.ok) throw new Error(await respons.text());
    const receivedData = await respons.json();

    localStorage.setItem("token", receivedData.token);

    await dispatch({
      type: "ACCOUNT_OVERRIDE",
      payload: receivedData
    });
  } catch (err) {
    console.error(err);
    return err.toString();
  }
};

export const create = ({ email, password }) => async (dispatch, getState) => {
  try {
    validLoginData({ email, password });

    const respons = await fetch(process.env.REACT_APP_API_URL + "/accounts", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: { "Content-type": "application/json" }
    });
    if (!respons.ok) throw new Error(await respons.text());
    const receivedData = await respons.json();

    localStorage.setItem("token", receivedData.token);

    await dispatch({
      type: "ACCOUNT_OVERRIDE",
      payload: receivedData
    });
  } catch (err) {
    console.error(err);
    return err.toString();
  }
};

export const recover = ({ email }) => async (dispatch, getState) => {
  try {
    validLoginData({ email });

    const respons = await fetch(
      process.env.REACT_APP_API_URL + "/accounts/recover",
      {
        method: "POST",
        body: JSON.stringify({ email }),
        headers: { "Content-type": "application/json" }
      }
    );
    if (!respons.ok) throw new Error(await respons.text());
  } catch (err) {
    console.error(err);
    return err.toString();
  }
};

export const remove = ({ password }) => async (dispatch, getState) => {
  try {
    await checkSignedIn(getState, dispatch);

    validLoginData({ password });

    const respons = await fetch(process.env.REACT_APP_API_URL + "/accounts", {
      method: "DELETE",
      body: JSON.stringify({ password }),
      headers: {
        "Content-type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token")
      }
    });
    if (!respons.ok) throw new Error(await respons.text());

    localStorage.removeItem("token");

    await dispatch({ type: "ACCOUNT_RESET" });
  } catch (err) {
    console.error(err);
    return err.toString();
  }
};

export const update = (data) => async (dispatch, getState) => {
  try {
    await checkSignedIn(getState, dispatch);

    if ("password" in data) validLoginData({ password: data.password });
    if ("oldPassword" in data) validLoginData({ password: data.oldPassword });
    if ("newPassword" in data) validLoginData({ password: data.newPassword });

    const respons = await fetch(process.env.REACT_APP_API_URL + "/accounts", {
      method: "PUT",
      body: JSON.stringify(data),
      headers: {
        "Content-type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token")
      }
    });
    if (!respons.ok) throw new Error(await respons.text());
    const receivedData = await respons.json();

    await dispatch({
      type: "ACCOUNT_UPDATE",
      payload: receivedData
    });
  } catch (err) {
    console.error(err);
    return err.toString();
  }
};

export const get = () => async (dispatch, getState) => {
  try {
    await checkSignedIn(getState, dispatch);

    const respons = await fetch(process.env.REACT_APP_API_URL + "/accounts", {
      method: "GET",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token")
      }
    });
    if (!respons.ok) throw new Error(await respons.text());
    const receivedData = await respons.json();

    await dispatch({
      type: "ACCOUNT_UPDATE",
      payload: receivedData
    });
  } catch (err) {
    console.error(err);
    return err.toString();
  }
};

export const signOut = () => async (dispatch) => {
  try {
    localStorage.removeItem("token");

    dispatch({ type: "ACCOUNT_RESET" });
  } catch (error) {
    console.log(error);
  }
};

export const refreshToken = () => async (dispatch, getState) => {
  try {
    await checkSignedIn(getState, dispatch);

    const respons = await fetch(
      process.env.REACT_APP_API_URL + "/accounts/refresh-token",
      {
        method: "POST",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token")
        }
      }
    );
    if (!respons.ok) throw new Error(await respons.text());
    const receivedData = await respons.json();

    localStorage.setItem("token", receivedData.token);

    await dispatch({
      type: "ACCOUNT_UPDATE",
      payload: receivedData
    });
  } catch (err) {
    console.error(err);
    return err.toString();
  }
};

async function checkSignedIn(getState, dispatch) {
  if (getState().account.token == null)
    throw new Error("Account is not signed in.");
}

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
