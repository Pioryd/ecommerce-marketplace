import produce from "immer";

import { tempInit } from "./tempInit";

const reducer = (state = { list: tempInit }, { type, payload }) =>
  produce(state, (draft) => {
    switch (type) {
      case "ITEMS_UPDATE_DETAILS":
        draft.details = payload;
        break;
      case "ITEMS_UPDATE_LIST":
        draft.list = payload;
        break;
      default:
    }
    return draft;
  });

export default reducer;
