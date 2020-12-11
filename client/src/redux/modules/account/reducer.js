import produce from "immer";

const reducer = (state = {}, { type, payload }) =>
  produce(state, (draft) => {
    switch (type) {
      case "ACCOUNT_UPDATE":
        draft = payload;
        break;
      default:
    }
    return draft;
  });

export default reducer;
