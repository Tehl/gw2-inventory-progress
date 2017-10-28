import { combineReducers } from "redux";
import apiKey from "./apiKey";
import accountData from "./accountData";
import gameData from "./gameData";
import wishlist from "./wishlist";
import options from "./options";

const app = combineReducers({
  apiKey,
  accountData,
  gameData,
  wishlist,
  options
});

export default app;
