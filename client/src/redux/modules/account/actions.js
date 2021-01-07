import validate from "../../../util/validate";
import handleRespons from "../../handleRespons";

import * as ACCOUNT from "./const";

export const signIn = ({ email, password }) => async (dispatch, getState) => {
  try {
    validate.signIn({ email, password });

    const { token } = await handleRespons(
      dispatch,
      await fetch(process.env.REACT_APP_API_URL + "/accounts/sign-in", {
        method: "POST",
        body: JSON.stringify({ email, password }),
        headers: { "Content-type": "application/json" }
      })
    );

    localStorage.setItem("token", token);
    await dispatch({ type: ACCOUNT.UPDATE_TOKEN, payload: token });
  } catch (err) {
    console.error(err);
    return err.toString();
  }
};

export const create = ({ email, password }) => async (dispatch, getState) => {
  try {
    validate.signIn({ email, password });

    const { token } = await handleRespons(
      dispatch,
      await fetch(process.env.REACT_APP_API_URL + "/accounts", {
        method: "POST",
        body: JSON.stringify({ email, password }),
        headers: { "Content-type": "application/json" }
      })
    );

    localStorage.setItem("token", token);
    await dispatch({ type: ACCOUNT.UPDATE_TOKEN, payload: token });
  } catch (err) {
    console.error(err);
    return err.toString();
  }
};

export const recover = ({ email }) => async (dispatch, getState) => {
  try {
    validate.signIn({ email });

    await handleRespons(
      dispatch,
      await fetch(process.env.REACT_APP_API_URL + "/accounts/recover", {
        method: "POST",
        body: JSON.stringify({ email }),
        headers: { "Content-type": "application/json" }
      })
    );
  } catch (err) {
    console.error(err);
    return err.toString();
  }
};

export const remove = ({ password }) => async (dispatch, getState) => {
  try {
    await checkSignedIn(getState, dispatch);

    validate.signIn({ password });

    await handleRespons(
      dispatch,
      await fetch(process.env.REACT_APP_API_URL + "/accounts", {
        method: "DELETE",
        body: JSON.stringify({ password }),
        headers: {
          "Content-type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token")
        }
      })
    );

    localStorage.removeItem("token");
    await dispatch({ type: ACCOUNT.RESET });
  } catch (err) {
    console.error(err);
    return err.toString();
  }
};

export const update = (data) => async (dispatch, getState) => {
  try {
    await checkSignedIn(getState, dispatch);

    if ("password" in data) validate.signIn({ password: data.password });
    if ("oldPassword" in data) validate.signIn({ password: data.oldPassword });
    if ("newPassword" in data) validate.signIn({ password: data.newPassword });

    await handleRespons(
      dispatch,
      await fetch(process.env.REACT_APP_API_URL + "/accounts", {
        method: "PUT",
        body: JSON.stringify(data),
        headers: {
          "Content-type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token")
        }
      })
    );
  } catch (err) {
    console.error(err);
    return err.toString();
  }
};

export const get = () => async (dispatch, getState) => {
  try {
    await checkSignedIn(getState, dispatch);

    const receivedData = await handleRespons(
      dispatch,
      await fetch(process.env.REACT_APP_API_URL + "/accounts", {
        method: "GET",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token")
        }
      })
    );

    await dispatch({ type: ACCOUNT.UPDATE_DETAILS, payload: receivedData });
  } catch (err) {
    console.error(err);
    return err.toString();
  }
};

export const signOut = () => async (dispatch) => {
  try {
    localStorage.removeItem("token");

    dispatch({ type: ACCOUNT.RESET });
  } catch (err) {
    console.log(err);
  }
};

export const refreshToken = () => async (dispatch, getState) => {
  try {
    await checkSignedIn(getState, dispatch);

    const { token } = await handleRespons(
      dispatch,
      await fetch(process.env.REACT_APP_API_URL + "/accounts/refresh-token", {
        method: "POST",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token")
        }
      })
    );

    localStorage.setItem("token", token);

    await dispatch({ type: ACCOUNT.UPDATE_TOKEN, payload: token });
  } catch (err) {
    console.error(err);
    return err.toString();
  }
};

async function checkSignedIn(getState, dispatch) {
  if (getState().account.token == null)
    throw new Error("Account is not signed in.");
}
