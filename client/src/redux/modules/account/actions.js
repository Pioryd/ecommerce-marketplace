import isEmail from "validator/lib/isEmail";
import isStrongPassword from "validator/lib/isStrongPassword";

export const create = ({ email, password }) => async (dispatch) => {
  try {
    validLoginData({ email, password });

    const accountDetails = (
      await fetch(process.env.REACT_APP_API_URL + "/accounts", {
        method: "POST",
        body: JSON.stringify({ email, password }),
        headers: { "Content-type": "application/json" }
      })
    ).json();

    localStorage.setItem("token", accountDetails.token);

    dispatch({
      type: "ACCOUNT_UPDATE",
      payload: accountDetails
    });
  } catch (err) {
    console.error(err);
    return;
  }
};

export const update = ({ password }) => async (dispatch) => {};

export const remove = ({ password }) => async (dispatch) => {
  try {
    await fetch(process.env.REACT_APP_API_URL + "/accounts", {
      method: "DELETE",
      body: JSON.stringify({ password }),
      headers: {
        "Content-type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token")
      }
    });

    localStorage.removeItem("token");

    dispatch({
      type: "ACCOUNT_UPDATE",
      payload: {}
    });
  } catch (err) {
    console.error(err);
  }
};

export const signIn = ({ email, password }) => async (dispatch) => {
  try {
    validLoginData({ email, password });

    const accountDetails = (
      await fetch(process.env.REACT_APP_API_URL + "/accounts/sign-in", {
        method: "POST",
        body: JSON.stringify({ email, password }),
        headers: { "Content-type": "application/json" }
      })
    ).json();

    localStorage.setItem("token", accountDetails.token);

    dispatch({
      type: "ACCOUNT_UPDATE",
      payload: accountDetails
    });
  } catch (err) {
    console.error(err);
    return;
  }
};

export const signOut = () => async (dispatch) => {
  try {
    localStorage.removeItem("token");

    dispatch({ type: "ACCOUNT_UPDATE", payload: {} });
  } catch (error) {
    console.log(error);
  }
};

export const recover = ({ email }) => async (dispatch) => {
  try {
    validLoginData({ email });

    await fetch(process.env.REACT_APP_API_URL + "/accounts/recover", {
      method: "POST",
      body: JSON.stringify({ email }),
      headers: { "Content-type": "application/json" }
    });

    // TODO
    // recover stuff
    // wiadomość zwrotna ze został wysłany
  } catch (err) {
    console.error(err);
    return;
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
