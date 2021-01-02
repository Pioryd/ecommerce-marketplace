import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import authMiddleware from "./authMiddleware";

import account from "./modules/account/reducer";
import items from "./modules/items/reducer";
import cart from "./modules/cart/reducer";

const reducer = combineReducers({ account, items, cart });

const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(thunk, authMiddleware))
);

export default store;
