import Validate from "../../../util/validate";

import handleRespons from "../../util/handleRespons";
import checkSignedIn from "../../util/checkSignedIn";

import * as CART from "./const";

export const add = ({ id, quantity }) => async (dispatch, getState) => {
  try {
    await checkSignedIn(getState, dispatch);

    await handleRespons(
      dispatch,
      await fetch(process.env.REACT_APP_API_URL + "/cart", {
        method: "POST",
        body: JSON.stringify({ id, quantity }),
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

export const update = ({ id, quantity }) => async (dispatch, getState) => {
  try {
    await checkSignedIn(getState, dispatch);

    await handleRespons(
      dispatch,
      await fetch(process.env.REACT_APP_API_URL + "/cart", {
        method: "PUT",
        body: JSON.stringify({ id, quantity }),
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

export const remove = ({ id }) => async (dispatch, getState) => {
  try {
    await checkSignedIn(getState, dispatch);

    await handleRespons(
      dispatch,
      await fetch(process.env.REACT_APP_API_URL + "/cart/remove", {
        method: "POST",
        body: JSON.stringify({ id }),
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

    const { items } = await handleRespons(
      dispatch,
      await fetch(process.env.REACT_APP_API_URL + "/cart", {
        method: "GET",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token")
        }
      })
    );

    await dispatch({ type: CART.UPDATE_ITEMS, payload: items });
  } catch (err) {
    console.error(err);
    return err.toString();
  }
};

export const transaction = ({ shipping, id, quantity }) => async (
  dispatch,
  getState
) => {
  try {
    await checkSignedIn(getState, dispatch);

    Validate.shipping(shipping);

    await handleRespons(
      dispatch,
      await fetch(process.env.REACT_APP_API_URL + "/cart/transaction", {
        method: "POST",
        body: JSON.stringify({ shipping, id, quantity }),
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

export const clear = () => async (dispatch, getState) => {
  try {
    await dispatch({ type: CART.RESET });
  } catch (err) {
    console.error(err);
    return err.toString();
  }
};

export const setCheckoutFailure = (checkoutFailure) => async (
  dispatch,
  getState
) => {
  try {
    await checkSignedIn(getState, dispatch);

    await dispatch({
      type: CART.UPDATE_CHECKOUT_FAILURE,
      payload: checkoutFailure
    });
  } catch (err) {
    console.error(err);
    return err.toString();
  }
};
