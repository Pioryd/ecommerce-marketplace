export const create = ({ name, login, password }) => async (dispatch) => {
  try {
    //...server only
    // simulate server
  } catch (error) {
    console.log(error);
  }
};

export const update = ({ name, login, password }) => async (dispatch) => {
  try {
    //...server only

    // simulate server
    dispatch({
      type: "ITEMS_UPDATE_DETAILS",
      payload: { name, login, password }
    });
  } catch (error) {
    console.log(error);
  }
};

export const remove = ({ login }) => async (dispatch) => {
  try {
    //...server only

    // simulate server
    dispatch({ type: "ITEMS_UPDATE_DETAILS", payload: {} });
  } catch (error) {
    console.log(error);
  }
};
