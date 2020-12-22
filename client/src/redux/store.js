import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import authMiddleware from "./authMiddleware";

import account from "./modules/account/reducer";
import items from "./modules/items/reducer";

const reducer = combineReducers({ account, items });

const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(thunk, authMiddleware))
);

export default store;
