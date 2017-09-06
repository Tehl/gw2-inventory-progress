const ITEM_DATA_UPDATED = "ITEM_DATA_UPDATED";

const defaultState = {};

const items = (state = defaultState, action) => {
  switch (action.type) {
    case ITEM_DATA_UPDATED:
      return action.payload.items.reduce(
        (result, item) => {
          result[item.id] = {
            ...(result[item.id] || {}),
            ...item
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

export default items;

export { ITEM_DATA_UPDATED };
