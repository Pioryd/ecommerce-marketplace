import isEmail from "validator/lib/isEmail";
import isStrongPassword from "validator/lib/isStrongPassword";

export const create = ({ email, password }) => async (dispatch, getState) => {
  try {
    if (getState().account.fetching === true)
      throw new Error("The server is busy, please try again.");
    await dispatch({ type: "ACCOUNT_UPDATE", payload: { fetching: true } });

    validLoginData({ email, password });

    const respons = await fetch(process.env.REACT_APP_API_URL + "/accounts", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: { "Content-type": "application/json" }
    });
    if (!respons.ok) throw new Error(await respons.text());
    const receivedData = await respons.json();

    if (getState().account.fetching !== true) return;
    if (getState().account.email != null) return;

    localStorage.setItem("token", receivedData.token);

    await dispatch({
      type: "ACCOUNT_OVERRIDE",
      payload: { email: receivedData.email }
    });
  } catch (err) {
    console.error(err);
    return err.toString();
  } finally {
    await dispatch({
      type: "ACCOUNT_UPDATE",
      payload: { fetching: false }
    });
  }
};

export const update = ({ password }) => async (dispatch) => {};

export const remove = ({ password }) => async (dispatch, getState) => {
  try {
    if (getState().account.fetching === true)
      throw new Error("The server is busy, please try again.");
    await dispatch({ type: "ACCOUNT_UPDATE", payload: { fetching: true } });

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

    if (getState().account.fetching !== true) return;

    localStorage.removeItem("token");

    await dispatch({ type: "ACCOUNT_RESET" });
  } catch (err) {
    console.error(err);
    return err.toString();
  } finally {
    await dispatch({
      type: "ACCOUNT_UPDATE",
      payload: { fetching: false }
    });
  }
};

export const signIn = ({ email, password }) => async (dispatch, getState) => {
  try {
    if (getState().account.fetching === true)
      throw new Error("The server is busy, please try again.");
    await dispatch({ type: "ACCOUNT_UPDATE", payload: { fetching: true } });

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

    if (getState().account.fetching !== true) return;
    if (getState().account.email != null) return;

    localStorage.setItem("token", receivedData.token);

    await dispatch({
      type: "ACCOUNT_OVERRIDE",
      payload: { email: receivedData.email }
    });
  } catch (err) {
    console.error(err);
    return err.toString();
  } finally {
    await dispatch({
      type: "ACCOUNT_UPDATE",
      payload: { fetching: false }
    });
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

export const recover = ({ email }) => async (dispatch, getState) => {
  try {
    if (getState().account.fetching === true)
      throw new Error("The server is busy, please try again.");
    await dispatch({ type: "ACCOUNT_UPDATE", payload: { fetching: true } });

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
  } finally {
    await dispatch({
      type: "ACCOUNT_UPDATE",
      payload: { fetching: false }
    });
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
