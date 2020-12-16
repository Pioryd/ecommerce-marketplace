export const create = ({ name, login, password }) => async (dispatch) => {
  try {
    const selling = [2, 3, 4];
    const watchlist = [6, 7, 8];

    dispatch({
      type: "ACCOUNT_UPDATE",
      payload: { name, login, password, selling, watchlist }
    });
  } catch (error) {
    console.log(error);
  }
};

export const update = ({ name, login, password }) => async (dispatch) => {
  try {
    dispatch({ type: "ACCOUNT_UPDATE", payload: { name, login, password } });
  } catch (error) {
    console.log(error);
  }
};

export const remove = ({ login }) => async (dispatch) => {
  try {
    dispatch({ type: "ACCOUNT_UPDATE", payload: {} });
  } catch (error) {
    console.log(error);
  }
};

export const signIn = ({ login, password }) => async (dispatch) => {
  try {
    const selling = [2, 3, 4];
    const watchlist = [6, 7, 8];

    const name = "test";
    dispatch({
      type: "ACCOUNT_UPDATE",
      payload: { name, login, password, selling, watchlist }
    });
  } catch (error) {
    console.log(error);
  }
};

export const signOut = () => async (dispatch) => {
  try {
    dispatch({ type: "ACCOUNT_UPDATE", payload: {} });
  } catch (error) {
    console.log(error);
  }
};

export const recover = () => async (dispatch) => {
  try {
    dispatch({ type: "ACCOUNT_UPDATE", payload: {} });
  } catch (error) {
    console.log(error);
  }
};
