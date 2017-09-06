import { getAccountData } from "../logic/account";
import { ACCOUNT_DATA_UPDATED } from "../reducers/accountData";

function loadAccountData(dataService) {
  return dispatch => {
    return getAccountData(dataService).then(res => {
      dispatch({
        type: ACCOUNT_DATA_UPDATED,
        payload: {
          account: res.account
        }
      });
    });
  };
}

export { loadAccountData };
