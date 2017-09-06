import { combineReducers } from "redux";
import items, { ITEM_DATA_UPDATED } from "./gameData/items";
import currencies, { CURRENCY_DATA_UPDATED } from "./gameData/currencies";

const gameData = combineReducers({ items, currencies });

export default gameData;

export { ITEM_DATA_UPDATED, CURRENCY_DATA_UPDATED };
