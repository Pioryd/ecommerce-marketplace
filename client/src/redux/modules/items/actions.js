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

export const getSelected = ({ selected }) => async (dispatch, getState) => {
  try {
    const receivedData = await handleRespons(
      dispatch,
      await fetch(process.env.REACT_APP_API_URL + "/items/selected", {
        method: "POST",
        body: JSON.stringify({ selected }),
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

export const getSelling = () => async (dispatch, getState) => {
  try {
    const receivedData = await handleRespons(
      dispatch,
      await fetch(process.env.REACT_APP_API_URL + "/items/selling", {
        method: "GET",
        headers: {
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

export const getWatching = () => async (dispatch, getState) => {
  try {
    const receivedData = await handleRespons(
      dispatch,
      await fetch(process.env.REACT_APP_API_URL + "/items/watching", {
        method: "GET",
        headers: {
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
