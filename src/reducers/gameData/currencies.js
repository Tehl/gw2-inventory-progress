const CURRENCY_DATA_UPDATED = "CURRENCY_DATA_UPDATED";

const defaultState = {};

const currencies = (state = defaultState, action) => {
  switch (action.type) {
    case CURRENCY_DATA_UPDATED:
      return action.payload.currencies.reduce(
        (result, currency) => {
          result[currency.id] = {
            ...(result[currency.id] || {}),
            ...currency
          };
          return result;
        },
        {
          ...state
        }
      );
    default:
      return state;
  }
};

export default currencies;

export { CURRENCY_DATA_UPDATED };
