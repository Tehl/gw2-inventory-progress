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

store.subscribe(() => {
  let state = store.getState();
  let resources = {
    inventory: mapCollectionToProgress(state.accountData.inventory),
    wallet: mapCollectionToProgress(state.accountData.wallet)
  };

  let progress = calculateProgress(state.wishlist, resources);
  console.log(progress);
});

store.dispatch(setApiKey(apiKey));
store.dispatch(setWishlist(wishlist));
