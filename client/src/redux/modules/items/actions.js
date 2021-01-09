import Validate from "../../../util/validate";
import handleRespons from "../../handleRespons";
import * as ITEMS from "./const";

export const list = ({ title, price, stock, description }) => async (
  dispatch,
  getState
) => {
  try {
    Validate.item({ title, price, stock, description });

    await handleRespons(
      dispatch,
      await fetch(process.env.REACT_APP_API_URL + "/items", {
        method: "POST",
        body: JSON.stringify({ title, price, stock, description }),
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

export const toggleWatch = ({ id }) => async (dispatch, getState) => {
  try {
    if (getState().account.itemsWatching == null) return;

    const watching = !getState().account.itemsWatching.includes(id);

    await handleRespons(
      dispatch,
      await fetch(process.env.REACT_APP_API_URL + "/items/watch", {
        method: "POST",
        body: JSON.stringify({ id, watching }),
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

export const close = ({ id }) => async (dispatch, getState) => {
  try {
    await handleRespons(
      dispatch,
      await fetch(process.env.REACT_APP_API_URL + "/items", {
        method: "DELETE",
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

export const getSearch = ({ page, sort, searchText }) => async (dispatch) => {
  try {
    await get("search", { page, sort, searchText }, dispatch);
  } catch (err) {
    console.error(err);
    return err.toString();
  }
};

export const getSelling = ({ page, sort, searchText }) => async (dispatch) => {
  try {
    try {
      await get("selling", { page, sort, searchText }, dispatch);
    } catch (err) {
      console.error(err);
      return err.toString();
    }
  } catch (err) {
    console.error(err);
    return err.toString();
  }
};

export const getSold = ({ page, sort, searchText }) => async (dispatch) => {
  try {
    await get("sold", { page, sort, searchText }, dispatch);
  } catch (err) {
    console.error(err);
    return err.toString();
  }
};

export const getUnsold = ({ page, sort, searchText }) => async (dispatch) => {
  try {
    await get("unsold", { page, sort, searchText }, dispatch);
  } catch (err) {
    console.error(err);
    return err.toString();
  }
};

export const getBought = ({ page, sort, searchText }) => async (dispatch) => {
  try {
    await get("bought", { page, sort, searchText }, dispatch);
  } catch (err) {
    console.error(err);
    return err.toString();
  }
};

export const getWatching = ({ page, sort, searchText }) => async (dispatch) => {
  try {
    await get("watching", { page, sort, searchText }, dispatch);
  } catch (err) {
    console.error(err);
    return err.toString();
  }
};

export const clear = () => async (dispatch, getState) => {
  try {
    await dispatch({ type: ITEMS.RESET });
  } catch (err) {
    console.error(err);
    return err.toString();
  }
};

async function get(type, { page, sort, searchText }, dispatch) {
  const { items, totalItems, currentPage, totalPages } = await handleRespons(
    dispatch,
    await fetch(process.env.REACT_APP_API_URL + "/items/" + type, {
      method: "POST",
      body: JSON.stringify({ page, sort, searchText }),
      headers: {
        "Content-type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token")
      }
    })
  );

  await dispatch({ type: ITEMS.UPDATE_ITEMS, payload: items });
  await dispatch({
    type: ITEMS.UPDATE_PAGINATION,
    payload: { totalItems, currentPage, totalPages }
  });
}
