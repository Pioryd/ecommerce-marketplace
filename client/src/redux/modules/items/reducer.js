import produce from "immer";
import * as ITEMS from "./const";

const reducer = (state = getInitialState(), { type, payload }) =>
  produce(state, (draft) => {
    switch (type) {
      case ITEMS.UPDATE_ITEMS:
        draft.items = payload;
        break;
      case ITEMS.UPDATE_PAGINATION:
        const { totalItems, currentPage, totalPages } = payload;
        draft = { ...draft, totalItems, currentPage, totalPages };
        break;
      case ITEMS.RESET:
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
