import produce from "immer";

const reducer = (state = getInitialState(), { type, payload }) =>
  produce(state, (draft) => {
    switch (type) {
      case "ITEMS_OVERRIDE":
        draft = payload;
        break;
      case "ITEMS_UPDATE":
        draft = Object.assign({}, draft, payload);
        break;
      case "ITEMS_RESET":
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
