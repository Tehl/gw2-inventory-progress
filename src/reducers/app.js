import { combineReducers } from "redux";
import apiKey from "./apiKey";
import accountData from "./accountData";
import gameData from "./gameData";
import wishlist from "./wishlist";

const app = combineReducers({ apiKey, accountData, gameData, wishlist });

export default app;
