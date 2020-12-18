export const create = ({ email, password }) => async (dispatch) => {
  try {
    //...server only
    // simulate server
  } catch (error) {
    console.log(error);
  }
};

export const update = ({ email, password }) => async (dispatch) => {
  try {
    //...server only

    // simulate server
    dispatch({
      type: "ITEMS_UPDATE_DETAILS",
      payload: { email, password }
    });
  } catch (error) {
    console.log(error);
  }
};

export const remove = ({ email }) => async (dispatch) => {
  try {
    //...server only

    // simulate server
    dispatch({ type: "ITEMS_UPDATE_DETAILS", payload: {} });
  } catch (error) {
    console.log(error);
  }
};
