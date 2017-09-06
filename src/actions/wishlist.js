import Gw2Api from "../services/Gw2Api";
import { getRequiredData } from "../logic/wishlist";
import { WISHLIST_UPDATED } from "../reducers/wishlist";
import { loadItemData, loadCurrencyData } from "./gameData";

function setWishlist(wishlist) {
  return dispatch => {
    dispatch({
      type: WISHLIST_UPDATED,
      payload: {
        wishlist
      }
    });

    let requiredData = getRequiredData(wishlist);
    let api = new Gw2Api();

    dispatch(loadItemData(api, requiredData.itemIds));
    dispatch(loadCurrencyData(api, requiredData.currencyIds));
  };
}

export { setWishlist };
