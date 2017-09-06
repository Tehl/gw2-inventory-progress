const WISHLIST_UPDATED = "WISHLIST_UPDATED";

const defaultState = [];

const wishlist = (state = defaultState, action) => {
  switch (action.type) {
    case WISHLIST_UPDATED:
      return [...action.payload.wishlist];

    default:
      return state;
  }
};

export default wishlist;

export { WISHLIST_UPDATED };
