import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import configureStore from "./configureStore";
import App from "./components/App";
import { setApiKey } from "./actions/apiKey";
import { setWishlist } from "./actions/wishlist";
import apiKey from "./apiKey";
import wishlist from "./data/wishlist";
import { mapCollectionToProgress, calculateProgress } from "./logic/wishlist";

import "./style.less";

const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);

store.dispatch(setApiKey(apiKey));
store.dispatch(setWishlist(wishlist));
