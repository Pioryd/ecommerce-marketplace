import handleRespons from "../../handleRespons";

export const add = ({ id, quantity }) => async (dispatch, getState) => {
  try {
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
    const receivedData = await handleRespons(
      dispatch,
      await fetch(process.env.REACT_APP_API_URL + "/cart", {
        method: "GET",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token")
        }
      })
    );

    await dispatch({ type: "CART_OVERRIDE", payload: receivedData });
  } catch (err) {
    console.error(err);
    return err.toString();
  }
};

export const transaction = ({
  name,
  street1,
  street2,
  city,
  state,
  postalCode,
  phone,
  payWith
}) => async (dispatch, getState) => {
  try {
    await handleRespons(
      dispatch,
      await fetch(process.env.REACT_APP_API_URL + "/cart/transaction", {
        method: "POST",
        body: JSON.stringify({
          name,
          street1,
          street2,
          city,
          state,
          postalCode,
          phone,
          payWith
        }),
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
    await dispatch({ type: "CART_RESET" });
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
    await dispatch({ type: "CART_UPDATE", payload: { checkoutFailure } });
  } catch (err) {
    console.error(err);
    return err.toString();
  }
};
