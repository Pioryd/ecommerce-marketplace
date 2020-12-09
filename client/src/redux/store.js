import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import account from "./modules/account/reducer";

const reducer = combineReducers({ account });

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));

export default store;
