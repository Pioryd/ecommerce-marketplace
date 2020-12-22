import produce from "immer";

const reducer = (state = getInitialState(), { type, payload }) =>
  produce(state, (draft) => {
    switch (type) {
      case "ACCOUNT_OVERRIDE":
        draft = payload;
        break;
      case "ACCOUNT_UPDATE":
        draft = Object.assign({}, draft, payload);
        break;
      case "ACCOUNT_RESET":
        draft = getInitialState();
        break;
      default:
    }
    return draft;
  });

function getInitialState() {
  return { token: localStorage.getItem("token") };
}

export default reducer;
