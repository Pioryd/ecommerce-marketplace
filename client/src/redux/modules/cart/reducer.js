import produce from "immer";
import * as CART from "./const";

const reducer = (state = getInitialState(), { type, payload }) =>
  produce(state, (draft) => {
    switch (type) {
      case CART.UPDATE_ITEMS:
        draft.items = payload;
        break;
      case CART.UPDATE_CHECKOUT_FAILURE:
        draft.checkoutFailure = payload;
        break;
      case CART.RESET:
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
