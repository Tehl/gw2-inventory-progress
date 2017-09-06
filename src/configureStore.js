import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { createLogger } from "redux-logger";
import appReducer from "./reducers/app";

const defaultState = {};

const configureStore = () => {
  const middleware = [thunk];

  if (DEBUG) {
    middleware.push(createLogger());
  }

  return createStore(appReducer, defaultState, applyMiddleware(...middleware));
};

export default configureStore;
