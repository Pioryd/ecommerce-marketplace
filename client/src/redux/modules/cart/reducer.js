import produce from "immer";

const reducer = (state = getInitialState(), { type, payload }) =>
  produce(state, (draft) => {
    switch (type) {
      case "CART_OVERRIDE":
        draft = payload;
        break;
      case "CART_UPDATE":
        draft = Object.assign({}, draft, payload);
        break;
      case "CART_RESET":
        draft = getInitialState();
        break;
      default:
    }
    return draft;
  });

function getInitialState() {
  return {};
}

export default reducer;
