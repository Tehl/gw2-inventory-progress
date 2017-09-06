const ACCOUNT_DATA_UPDATED = "ACCOUNT_DATA_UPDATED";

const defaultState = {
  inventory: {},
  wallet: {}
};

const loadAccountData = (state = defaultState, action) => {
  switch (action.type) {
    case ACCOUNT_DATA_UPDATED:
      return {
        ...action.payload.account
      };

    default:
      return state;
  }
};

export default loadAccountData;

export { ACCOUNT_DATA_UPDATED };
