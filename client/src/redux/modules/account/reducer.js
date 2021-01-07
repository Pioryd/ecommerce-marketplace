import produce from "immer";
import * as ACCOUNT from "./const";

const reducer = (state = getInitialState(), { type, payload }) =>
  produce(state, (draft) => {
    switch (type) {
      case ACCOUNT.UPDATE_TOKEN:
        draft.token = payload;
        break;
      case ACCOUNT.UPDATE_DETAILS:
        draft.id = payload.id;
        draft.itemsWatching = payload.itemsWatching;
        break;
      case ACCOUNT.RESET:
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
