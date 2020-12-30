import handleRespons from "../../util/handleRespons";

export const list = ({ title, price, description }) => async (
  dispatch,
  getState
) => {
  try {
    validItemData({ title, price, description });

    await handleRespons(
      dispatch,
      await fetch(process.env.REACT_APP_API_URL + "/items", {
        method: "POST",
        body: JSON.stringify({ title, price, description }),
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

export const getSearch = ({ page, sort, searchText }) => async (
  dispatch,
  getState
) => {
  try {
    const receivedData = await handleRespons(
      dispatch,
      await fetch(process.env.REACT_APP_API_URL + "/items/search", {
        method: "POST",
        body: JSON.stringify({ page, sort, searchText }),
        headers: {
          "Content-type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token")
        }
      })
    );

    await dispatch({ type: "ITEMS_UPDATE", payload: receivedData });
  } catch (err) {
    console.error(err);
    return err.toString();
  }
};

export const getSelling = ({ page, sort, searchText }) => async (
  dispatch,
  getState
) => {
  try {
    const receivedData = await handleRespons(
      dispatch,
      await fetch(process.env.REACT_APP_API_URL + "/items/selling", {
        method: "POST",
        body: JSON.stringify({ page, sort, searchText }),
        headers: {
          "Content-type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token")
        }
      })
    );

    await dispatch({ type: "ITEMS_UPDATE", payload: receivedData });
  } catch (err) {
    console.error(err);
    return err.toString();
  }
};

export const getSold = ({ page, sort, searchText }) => async (
  dispatch,
  getState
) => {
  try {
    const receivedData = await handleRespons(
      dispatch,
      await fetch(process.env.REACT_APP_API_URL + "/items/sold", {
        method: "POST",
        body: JSON.stringify({ page, sort, searchText }),
        headers: {
          "Content-type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token")
        }
      })
    );

    await dispatch({ type: "ITEMS_UPDATE", payload: receivedData });
  } catch (err) {
    console.error(err);
    return err.toString();
  }
};

export const getUnsold = ({ page, sort, searchText }) => async (
  dispatch,
  getState
) => {
  try {
    const receivedData = await handleRespons(
      dispatch,
      await fetch(process.env.REACT_APP_API_URL + "/items/unsold", {
        method: "POST",
        body: JSON.stringify({ page, sort, searchText }),
        headers: {
          "Content-type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token")
        }
      })
    );

    await dispatch({ type: "ITEMS_UPDATE", payload: receivedData });
  } catch (err) {
    console.error(err);
    return err.toString();
  }
};

export const getWatching = ({ page, sort, searchText }) => async (
  dispatch,
  getState
) => {
  try {
    const receivedData = await handleRespons(
      dispatch,
      await fetch(process.env.REACT_APP_API_URL + "/items/watching", {
        method: "POST",
        body: JSON.stringify({ page, sort, searchText }),
        headers: {
          "Content-type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token")
        }
      })
    );

    await dispatch({ type: "ITEMS_UPDATE", payload: receivedData });
  } catch (err) {
    console.error(err);
    return err.toString();
  }
};

export const clear = () => async (dispatch, getState) => {
  try {
    await dispatch({ type: "ITEMS_RESET" });
  } catch (err) {
    console.error(err);
    return err.toString();
  }
};

function validItemData({ title, price, description }) {
  if (title.length < 3) throw new Error("Title is too short.");
  if (price <= 0) throw new Error("Price is too low.");
  if (description.length < 3) throw new Error("Description is too short.");
}
