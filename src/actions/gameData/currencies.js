import { CURRENCY_DATA_UPDATED } from "../../reducers/gameData";

function loadCurrencyData(dataService, currencyIds) {
  return dispatch => {
    return dataService.getCurrencies(currencyIds).then(res => {
      dispatch({
        type: CURRENCY_DATA_UPDATED,
        payload: {
          currencies: res.map(currency => ({
            id: currency.id,
            name: currency.name
          }))
        }
      });
    });
  };
}

export { loadCurrencyData };
