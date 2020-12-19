import produce from "immer";

const initialState = {};

const reducer = (state = initialState, { type, payload }) =>
  produce(state, (draft) => {
    switch (type) {
      case "ACCOUNT_OVERRIDE":
        draft = payload;
        break;
      case "ACCOUNT_UPDATE":
        draft = Object.assign({}, draft, payload);
        break;
      case "ACCOUNT_RESET":
        draft = initialState;
        break;
      default:
    }
    return draft;
  });

export default reducer;
