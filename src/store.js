import {
  loadFromLocalStorage,
  //  saveToLocalStorage
} from "./localStorage";
import { createStore, applyMiddleware, compose } from "redux";
import reduxThunk from "redux-thunk";
import reducer from "./reduceres/reducer";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const persistedState = loadFromLocalStorage();

export const store = createStore(
  reducer,
  persistedState,
  composeEnhancers(applyMiddleware(reduxThunk))
);
