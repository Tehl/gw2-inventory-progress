import Gw2Api from "../services/Gw2Api";
import { API_KEY_CHANGED } from "../reducers/apiKey";
import { loadAccountData } from "./accountData";

function setApiKey(apiKey) {
  return dispatch => {
    dispatch({
      type: API_KEY_CHANGED,
      payload: {
        apiKey
      }
    });

    let api = new Gw2Api(apiKey);
    dispatch(loadAccountData(api));
  };
}

export { setApiKey };
