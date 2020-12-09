export const create = ({ name, login, password }) => async (dispatch) => {
  try {
    dispatch({ type: "ACCOUNT_UPDATE", payload: { name, login, password } });
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

export const sign_in = ({ login, password }) => async (dispatch) => {
  try {
    const name = "test";
    dispatch({ type: "ACCOUNT_UPDATE", payload: { name, login, password } });
  } catch (error) {
    console.log(error);
  }
};

export const sign_out = () => async (dispatch) => {
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
