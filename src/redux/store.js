import { applyMiddleware, createStore, combineReducers } from "redux"
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

export const store = createStore(
    combineReducers({}),
    {},
    composeWithDevTools(applyMiddleware(thunk))
);