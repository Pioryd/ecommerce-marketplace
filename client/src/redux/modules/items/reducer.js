import produce from "immer";

import { temp_init } from "./temp_init";

const reducer = (state = { list: temp_init }, { type, payload }) =>
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
